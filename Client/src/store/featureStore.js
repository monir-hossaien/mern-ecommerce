
import {create}  from 'zustand'
import axios from "axios";
const base_url = "https://mern-ecommerce2025.vercel.app/api"


export const featureStore = create((set)=>({
    featureList: null,
    getFeatureList: async ()=>{
        let res = await axios.get(`${base_url}/get-features`)
        let data = res.data.data
        if(res.data.status === "success"){
            set({featureList: data})
        }
    }
}))