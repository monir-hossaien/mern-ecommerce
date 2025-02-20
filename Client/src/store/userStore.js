import {create} from "zustand";
import axios from "axios";
import cookies from "js-cookie";
import {getEmail, setEmail, unauthorized} from "../Utility/helper.js";


export const userStore = create((set)=>({

    isLogin:()=>{
        return !!cookies.get('token');
    },

    isSubmit: false,
    setSubmit: (boolean)=>{
        set({isSubmit: boolean})
    },
    //form onchange
    formData: {},
    inputOnchange: (name, value)=>{
        set((state)=>({
            formData:{
                ...state.formData,
                [name]: value
            }
        }))
    }
    ,
    // send otp request
    sentOTPRequest: async (email) =>{
        const res = await axios.post(`/api/send-otp`, {email});
        const data = res?.data
        return data
    },
    //
    OTPVerifyRequest: async (otp) =>{
        const email = getEmail()
        const res = await axios.post(`/api/login`, {email: email, otp: otp}, {withCredentials: true})
        const data = res?.data
        return data
    },
    //logout request
    logout: async ()=>{
        const res = await axios.get(`/api/logout`, {withCredentials: true})
        const data = res?.data
        return data
    },

    // get profile details
    profile: null,
    getProfileDetails: async ()=>{
        try {
            const res = await axios.get(`/api/read-profile`, {withCredentials: true})
            const data = res.data.data
            if(res.data.status === "success"){
                set({profile: data})
                set({formData: data})
            }
        }catch(err){
            unauthorized(err?.response?.status)
            set({formData: null})
        }
    },

    saveProfile: async (formData)=>{
        try {
            set({formData: null})
            const res = await axios.post(`/api/create-profile`, formData, {withCredentials: true})
            const data = res.data
            return data
        }catch(err){
            unauthorized(err?.response?.status)
        }
    }
}))