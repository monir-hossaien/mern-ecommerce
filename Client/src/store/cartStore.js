
import {create} from "zustand";
import axios from "axios";
import {unauthorized} from "../Utility/helper.js";
const base_url = "https://mern-ecommerce2025.vercel.app/api"

export const cartStore = create((set)=>({

    cartSubmit: false,
    setCartSubmit: (boolean)=>{
        set({cartSubmit: boolean})
    },

    formData: {size: "", color: "", quantity: ""},
    inputOnchange: (name, value)=>{
        set((state)=>({
            formData:{
                ...state.formData,
                [name]: value
            }
        }))
    },
    // product add to cart list
    createCartRequest: async (productID, formData)=>{
        try {
            const res = await axios.post(`${base_url}/add-cart/${productID}`, formData, {withCredentials: true});
            set({formData: {size: "", color: "", quantity: ""},})
            const data = res?.data
            return data
        }catch (err) {
            unauthorized(err?.response?.status)
        }
    },
    // update cart
    updateCartRequest: async (cartId, formData)=>{
        try {
            let res = await axios.put(`${base_url}/update-cart/${cartId}`, formData, {withCredentials: true});
            const data = res?.data
            return data
        }catch (err) {
            unauthorized(err?.response?.status)
        }
    },
    // cart list
    cartItem: null,
    cartCount: 0,
    totalAmount: 0,
    discountAmount: 0,
    vatAmount: 0,
    payableAmount: 0,

    getCartList: async () => {
        try {
            let res = await axios.get(`${base_url}/cart-list`, { withCredentials: true });
            let data = res.data.data;

            if (res.data.status === "success") {
                set({
                    cartItem: data,
                    cartCount: data.length
                });
            }

            let total = 0;
            let discountAmount = 0;

            data.forEach((item) => {
                let { quantity, product } = item;
                let { price, discount, discountPrice } = product;

                let itemQuantity = parseInt(quantity) || 0;  // Prevent NaN
                total += itemQuantity * price;

                if (discount) {
                    discountAmount += itemQuantity * (price - discountPrice);  // Correct discount calculation
                }
            });

            let vat = total * 0.05;
            let payable = total - discountAmount + vat;

            set({
                totalAmount: total,
                vatAmount: vat,
                discountAmount: discountAmount,
                payableAmount: payable,
            });

        } catch (err) {
            unauthorized(err?.response?.status);
        }
    },

    //remove cart item
    removeCartRequest: async (cartID) =>{
        try {
            const res = await axios.delete(`${base_url}/delete-cart/${cartID}`,{withCredentials: true});
            const data = res?.data
            return data
        }catch (err) {
            unauthorized(err?.response?.status)
        }
    }
}))