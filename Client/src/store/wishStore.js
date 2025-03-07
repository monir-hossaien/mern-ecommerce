
import {create} from "zustand";
import axios from "axios";
import {unauthorized} from "../Utility/helper.js";
const base_url = "https://mern-ecommerce-sable-kappa.vercel.app/api"


export const  wishStore = create((set)=>({

    wishSubmit: false,
    setWistSubmit: (boolean)=>{
        set({wishSubmit: boolean})
    },
    // product add to wish list
    createWishRequest: async (productID)=>{
        try {
            const res = await axios.post(`${base_url}/create-wish/${productID}`, {withCredentials: true});
            const data = res?.data
            return data
        }catch (err) {
            unauthorized(err?.response?.status)
        }
    },

    // cart list
    wishProductList: null,
    wishCount: 0,
    getWishList: async () =>{
        try {
            set({wishProductList: null})
            const res = await axios.get(`${base_url}/wish-list`, {withCredentials: true});
            let data = res.data.data
            if(res.data.status === "success"){
                set({wishProductList: data})
                set({wishCount: data.length})
            }
        }catch(err){
            unauthorized(err?.response?.status)
        }
    },

    //remove wish item
    removeWishRequest: async (productID) =>{
        try {
            const res = await axios.delete(`${base_url}/delete-wish/${productID}`,{withCredentials: true});
            const data = res?.data
            return data
        }catch (err) {
            unauthorized(err?.response?.status)
        }
    }

}))