import CartModel from "../models/product/cartModel.js";
import Product from "../models/product/productModel.js";
import InvoiceModel from "../models/payment/invoiceModel.js";
import InvoiceProductModel from "../models/payment/invoiceProductsModel.js";
import PaymentSetting from "../models/payment/paymentSettingsModel.js";
import UserProfile from "../models/user/profileModel.js";
import FormData from "form-data";
import axios from "axios";
import crypto from "crypto";

import mongoose from "mongoose";
const objID = mongoose.Types.ObjectId;

export const paymentSettingService = async(req)=>{
    try {
        const reqBody = req.body;
        const data = await PaymentSetting.create(reqBody);
        if(!data){
            return {
                statusCode: 400,
                status: "fail",
                message: "Request failed",
            }
        }
        return {
            statusCode: 200,
            status: "success",
            message: 'Request Successfully',
            data: data
        }
    }catch (e) {
        return {
            statusCode: 500,
            status: "fail",
            message: 'Internal Server Error',
            error: e.message
        }
    }
}



// invoice create
export const createInvoiceService = async (req) => {
    try {
        const userId = new objID(req.headers.id);
        const user_email = req.headers.email;
        // ...................total & payable & Vat..........
        const matchStage = {$match: { userId: userId }};
        const joinWithProducts = {
            $lookup: {
                from: "products",
                localField: "productId",
                foreignField: "_id",
                as: "product",
            },
        }
        const unwindStage = { $unwind: "$product" }
        const pipeline = [matchStage, joinWithProducts, unwindStage]

        let cartProducts = await CartModel.aggregate(pipeline);

        let total = 0;
        for (let element of cartProducts) {
            let price = element.product.discount
                ? element.product.discountPrice
                : element.product.price;
            total += element.quantity * price;
        }
        let vat = total * 0.05 // 5% vat included
        let payable = total + vat

        // ...................Customer  & shipping details..........
        let profile = await UserProfile.aggregate([matchStage]);
        let customerDetails = `Customer name: ${profile[0].name}, Email: ${user_email}, Address: ${profile[0].address}, Country: ${profile[0].country}, Phone: ${profile[0].phone}`
        let shippingDetails = `shippingType: ${profile[0].shippingName}, shippingAddress: ${profile[0].shippingAddress}, shippingCity: ${profile[0].shippingCity}, shippingCountry: ${profile[0].shippingCountry}, shippingPhone: ${profile[0].shippingPhone}`

        // ...................Transaction ID & Others ID..........
        let randomString = crypto.randomBytes(5).toString('hex');
        let transactionId = `TXN${randomString}`;
        let validationId = 0;

        // ...................invoice create..........
        let invoiceBody = {userId: userId, customerDetails: customerDetails, shippingDetails: shippingDetails, transactionId: transactionId, validationId: validationId, total: total, vat: vat, payable: payable};
        let createInvoice = await InvoiceModel.create(invoiceBody);

        // ...................invoice product create..........

        let invoice_id = createInvoice._id;
        const invoiceProduct = cartProducts.map((element) => ({
            userId: userId,
            invoiceId: invoice_id,
            productId: element.productId,
            quantity: element.quantity,
            price: element.product.discount ? element.product.discountPrice : element.product.price,
            color: element.color,
            size: element.size,
        }))
        await InvoiceProductModel.create(invoiceProduct);

        // ...................remove product from cart list..........
        await CartModel.deleteMany({userId: userId});

        // ...................SSL Payment..........
        const settings = await PaymentSetting.find();

        const form = new FormData();
        // SSL credential
        form.append('store_id', settings[0].store_id);
        form.append('store_passwd', settings[0].store_password);
        form.append('total_amount', payable.toString());
        form.append('currency', settings[0].currency);
        form.append('tran_id', transactionId);
        form.append('success_url', `${settings[0].success_url}/${transactionId}`);
        form.append('fail_url', `${settings[0].fail_url}/${transactionId}`);
        form.append('cancel_url', `${settings[0].cancel_url}/${transactionId}`);
        form.append('ipn_url', `${settings[0].ipn_url}/${transactionId}`);
        // Customer Information
        form.append('cus_name', profile[0].name);
        form.append('cus_email', user_email);
        form.append('cus_add1', profile[0].address);
        form.append('cus_add2', profile[0].address);
        form.append('cus_city', profile[0].city);
        form.append('cus_state', profile[0].state);
        form.append('cus_postcode', profile[0].postalCode);
        form.append('cus_country', profile[0].country);
        form.append('cus_phone', profile[0].phone);
        form.append('cus_fax', profile[0].fax);
        //Shipment Information
        form.append('shipping_method', 'YES');
        form.append('ship_name', profile[0].shippingName);
        form.append('ship_add1', profile[0].shippingAddress);
        form.append('ship_city', profile[0].shippingCity);
        form.append('ship_state', profile[0].shippingState);
        form.append('ship_postcode', profile[0].shippingPostalCode);
        form.append('ship_country', profile[0].shippingCountry);
        //Product Information
        let product = await Product.aggregate([
            {$lookup:{from: "categories", localField: "categoryId", foreignField: "_id", as: "Category"}},
            {$unwind: "$Category"}
        ])
        form.append('product_name', product[0].title);
        form.append('product_category', product[0]['Category']['categoryName']);
        form.append('product_profile', product[0].title);
        form.append('product_amount', payable);

        let SSLResponse = await axios.post(settings[0].init_url, form);
        return{
            statusCode: 200,
            status: "success",
            data: SSLResponse.data,
        }
    }
    catch (error) {
        return{
            status: "fail",
            message: "Internal server error",
            error: error.message
        }
    }


};

export const paymentSuccessService = async (req) => {
    try {
        const transactionId = req.params.transactionId;
        await InvoiceModel.updateOne({transactionId: transactionId}, {$set:{paymentStatus: 'SUCCESS'}})
        return {
            status: "success",
        }
    }catch (e) {
        return {
            status: "fail",
            message: "Internal server error",
            error: e.message
        }
    }
}

export const paymentCancelService = async (req) => {
    try {
        const transactionId = req.params.transactionId;
        await InvoiceModel.updateOne({transactionId: transactionId}, {$set:{paymentStatus: 'CANCELED'}})
        return {
            status: "cancel",
        }
    }catch (e) {
        return {
            status: "fail",
            message: "Internal server error",
            error: e.message
        }
    }
}

export const paymentFailService = async (req) => {
    try {
        const transactionId = req.params.transactionId;
        await InvoiceModel.updateOne({transactionId: transactionId}, {$set:{paymentStatus: 'FAILED'}})
        return {
            status: "fail",
        }
    }catch (e) {
        return {
            status: "fail",
            message: "Internal server error",
            error: e.message
        }
    }
}

export const paymentIPNService = async (req) => {
    try {
        const transactionId = req.params.transactionId;
        const status = req.body.status;
        await InvoiceModel.updateOne({transactionId: transactionId}, {$set:{paymentStatus: status}})
        return {
            status: status,
        }
    }catch (e) {
        return {
            status: "fail",
            message: "Internal server error",
            error: e.message
        }
    }
}

export const invoiceListService = async (req) => {
    try {
        const userId = new objID(req.headers.id);
        let data = await InvoiceModel.find({userId: userId});
        if(!data){
            return {
                statusCode: 404,
                status: "fail",
                message: "Invoice Not Found"
            }
        }
        return {
            statusCode: 200,
            status: "success",
            message: "Invoice list retrieved successfully",
            data: data
        }
    }catch (e) {
        return {
            statusCode: 500,
            status: "fail",
            message: "Internal server error",
            error: e.message
        }
    }
}

export const invoiceProductsListService = async (req) => {
    try {
        const userId = new objID(req.headers.id);
        const invoiceId = new objID(req.params.invoiceId);

        const matchStage = {$match: { userId: userId, invoiceId: invoiceId }};
        const joinWithProducts = {
            $lookup: {
                from: "products",
                localField: "productId",
                foreignField: "_id",
                as: "Product",
            },
        }
        const unwindStage = {$unwind: "$Product"}

        const pipeline = [
            matchStage,
            joinWithProducts,
            unwindStage
        ]
        let data = await InvoiceProductModel.aggregate(pipeline);
        if(!data){
            return {
                statusCode: 404,
                status: "fail",
                message: "Invoice Products Not Found"
            }
        }
        return {
            statusCode: 200,
            status: "success",
            message: "Invoice Products list retrieved successfully",
            data: data
        }
    }catch (e) {
        return {
            statusCode: 500,
            status: "fail",
            message: "Internal server error",
            error: e.message
        }
    }
}