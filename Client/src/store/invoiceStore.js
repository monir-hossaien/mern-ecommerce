
import {create} from "zustand";
import axios from "axios";
import {unauthorized} from "../Utility/helper.js";

export const invoiceStore = create((set)=>({

    createInvoice: async ()=>{
    try {
        const res = await axios.post(`/api/create-invoice`,{withCredentials: true});
        return res?.data
    }catch (err) {
        unauthorized(err?.response?.status)
    }
    },

    invoiceList: null,
    getInvoiceList: async ()=>{
        try {
            set({invoiceList: null})
            const res = await axios.get(`/api/invoice-list`,{withCredentials: true});
            const data = res?.data?.data
            set({invoiceList: data})
        }catch (err) {
            unauthorized(err?.response?.status)
        }
    },

    invoiceDetailsData: null,
    getInvoiceDetails: async (invoiceID) => {
        try {
            set({ invoiceDetailsData: null });
            const res = await axios.get(`/api/invoice-details/${invoiceID}`, { withCredentials: true });
            const data = res?.data?.data; // API returns an array

            if (data && data.length > 0) {
                const invoice = data[0].invoice;  // Extract invoice details
                set({ invoiceDetailsData: {invoice, products: data } });
            }
        } catch (err) {
            unauthorized(err?.response?.status);
        }
    }

}))