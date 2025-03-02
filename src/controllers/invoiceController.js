
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
    res.redirect("https://mern-ecommerce-12-8lpi.onrender.com/my-orders")
}

export const paymentCancel = async(req, res)=>{
    await paymentCancelService(req);
    res.redirect("https://mern-ecommerce-12-8lpi.onrender.com/my-orders")
}

export const paymentFail = async(req, res)=>{
    await paymentFailService(req);
    res.redirect("https://mern-ecommerce-12-8lpi.onrender.com/my-orders")
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