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
    formData: {
        email: "", otp: "",
        name: "", phone: "", country: "", city: "", address: "", shippingName: "",
        shippingPhone: "", shippingCountry: "", shippingCity: "", shippingAddress: ""
    },
    inputOnchange: (name, value)=>{
        set((state)=>({
            formData:{
                ...state.formData,
                [name]: value
            }
        }))
    },
    // registration
    signUpRequest: async (formData)=>{
        let res = await axios.post(`/api/register`, formData)
        const data = res.data
        return data
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

    //create or update profile
    saveProfile: async (formData)=>{
        try {
            const res = await axios.post(`/api/create-profile`, formData, {withCredentials: true})
            const data = res.data
            return data
        }catch(err){
            unauthorized(err?.response?.status)
        }
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

    // get profile details
    user: null,
    getUserDetails: async ()=>{
        try {
            const res = await axios.get(`/api/read-user`, {withCredentials: true})
            const data = res.data.data
            if(res.data.status === "success"){
                set({user: data})
            }
        }catch(err){
            unauthorized(err?.response?.status)
        }
    }
}))