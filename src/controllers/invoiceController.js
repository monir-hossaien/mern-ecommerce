import dotenv from 'dotenv';
dotenv.config();

import {
    createInvoiceService,
    paymentCancelService,
    paymentFailService,
    paymentIPNService,
    paymentSettingService,
    paymentSuccessService,
    invoiceListService,
    invoiceProductsListService
} from "../../src/services/invoiceService.js";


// create payment setting
export const createPaymentSettings = async (req, res)=>{
    const result = await paymentSettingService(req);
    res.json(result);
}


// create invoice
export const createInvoice = async(req, res)=>{
    const result = await createInvoiceService(req);
    return res.json(result);
}

// payment related
export const paymentSuccess = async(req, res)=>{
    await paymentSuccessService(req);
    // Redirect to local or production URL based on your environment
    const redirectUrl = process.env.NODE_ENV === 'production'
        ? 'https://mern-ecommerce-12-8lpi.onrender.com/my-orders'
        : 'http://localhost:5173/my-orders';
        
    res.redirect(redirectUrl);
}

export const paymentCancel = async(req, res)=>{
    await paymentCancelService(req);

    // Redirect to local or production URL based on your environment
    const redirectUrl = process.env.NODE_ENV === 'production'
        ? 'https://mern-ecommerce-12-8lpi.onrender.com/my-orders'
        : 'http://localhost:5173/my-orders';
        
    res.redirect(redirectUrl);
}

export const paymentFail = async(req, res)=>{
    await paymentFailService(req);
    // Redirect to local or production URL based on your environment
    const redirectUrl = process.env.NODE_ENV === 'production'
        ? 'https://mern-ecommerce-12-8lpi.onrender.com/my-orders'
        : 'http://localhost:5173/my-orders';
        
    res.redirect(redirectUrl);
}

export const paymentIPN = async(req, res)=>{
    const result = await paymentIPNService(req);
    return res.json(result);
}

export const invoiceList = async(req, res)=>{
    const result = await invoiceListService(req);
    return res.status(result.statusCode).json(result);
}

export const invoiceProductsList = async(req, res)=>{
    const result = await invoiceProductsListService(req);
    return res.status(result.statusCode).json(result);
}