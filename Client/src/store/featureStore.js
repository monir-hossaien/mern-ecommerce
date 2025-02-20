
import {create}  from 'zustand'
import axios from "axios";


export const featureStore = create((set)=>({
    featureList: null,
    getFeatureList: async ()=>{
        let res = await axios.get(`/api/get-features`)
        let data = res.data.data
        if(res.data.status === "success"){
            set({featureList: data})
        }
    }
}))