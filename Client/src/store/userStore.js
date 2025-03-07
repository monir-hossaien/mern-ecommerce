import {create} from "zustand";
import axios from "axios";
import cookies from "js-cookie";
import {getEmail, unauthorized} from "../Utility/helper.js";
const base_url = "https://mern-ecommerce-sable-kappa.vercel.app/api"


export const userStore = create((set)=>({

    //form onchange
    formData: {
        name: "", division: "", district: "", post: "", area: "", phone: "", postalCode: "", shippingName: "",
        shippingDivision: "", shippingDistrict: "", shippingPost: "",  shippingArea: "", shippingPhone: "", shippingPostalCode: "",
        email: "", otp: ""
    },
    inputOnchange: (name, value)=>{
        set((state)=>({
            formData:{
                ...state.formData,
                [name]: value
            }
        }))
    },
    isLogin:()=>{
        return !!cookies.get('token');
    },

    isSubmit: false,
    setSubmit: (boolean)=>{
        set({isSubmit: boolean})
    },
    // registration
    signUpRequest: async (formData)=>{
        let res = await axios.post(`${base_url}/register`, formData)
        set({formData: {email: ""}})
        const data = res.data
        return data
    }
    ,
    // send otp request
    sentOTPRequest: async (email) =>{
        const res = await axios.post(`${base_url}/send-otp`, {email});
        set({formData: {otp: ""}})
        const data = res?.data
        return data
    },
    //
    OTPVerifyRequest: async (otp) =>{
        const email = getEmail()
        const res = await axios.post(`${base_url}/login`, {email: email, otp: otp}, {withCredentials: true})
        set({formData: {email: ""}})
        const data = res?.data
        return data
    },
    //logout request
    logout: async ()=>{
        const res = await axios.get(`${base_url}/logout`, {withCredentials: true})
        const data = res?.data
        return data
    },

    //create or update profile
    saveProfile: async (formData)=>{
        try {
            const res = await axios.post(`${base_url}/create-profile`, formData, {withCredentials: true})
            if (res.data.status === "success") {
                set({
                    formData: {
                        name: "", division: "", district: "", post: "", area: "", phone: "", shippingName: "",
                        shippingDivision: "", shippingDistrict: "", shippingPost: "",  shippingArea: "", shippingPhone: "",
                        email: "", otp: "", shippingPostalCode: "", postalCode: ""
                    }
                });
            }
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
            const res = await axios.get(`${base_url}/read-profile`, {withCredentials: true})
            const data = res.data.data
            if(res.data.status === "success"){
                set({profile: data})
                set({formData: data})
            }
        }catch(err){
            unauthorized(err?.response?.status)
        }
    },

    // get profile details
    user: null,
    getUserDetails: async ()=>{
        try {
            const res = await axios.get(`${base_url}/read-user`, {withCredentials: true})
            const data = res.data.data
            if(res.data.status === "success"){
                set({user: data})
            }
        }catch(err){
            unauthorized(err?.response?.status)
        }
    },

    //get division list
    divisionList: [],
    getDivisionList: async ()=>{
        try {
            const res = await axios.get(`${base_url}/division-list`)
            set({divisionList: res.data.data})
        }catch(err){
            unauthorized(err?.response?.status)
        }
    },

    //get division list
    districtList: [],
    getDistrictList: async (divisionID)=>{
        try {
            const res = await axios.get(`${base_url}/district-list/${divisionID}`)
            set({districtList: res.data.data || []})
        }catch(err){
            unauthorized(err?.response?.status)
        }
    },

    //get post list
    postList: [],
    getPostList: async (districtID)=>{
        try {
            const res = await axios.get(`${base_url}/post-list/${districtID}`)
            set({postList: res.data.data || []})
        }catch(err){
            unauthorized(err?.response?.status)
        }
    }

}))