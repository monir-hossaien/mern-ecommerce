import {create} from "zustand";
import axios from "axios";
import {unauthorized} from "../Utility/helper.js";

export const productStore = create((set)=>({
    //brand
    brandList: null,
    getBrandList: async ()=>{
        let res = await axios.get(`/api/getAllBrands`)
        let data = res.data.data
        if(res.data.status === "success"){
            set({brandList: data})
        }
    },

    //category
    categoryList: null,
    getCategoryList: async ()=>{
        let res = await axios.get(`/api/getAllCategories`)
        let data = res.data.data
        if(res.data.status === "success"){
            set({categoryList: data})
        }
    },
    //remark list
    remarkList: null,
    getRemarkList: async ()=>{
        let res = await axios.get(`/api/remark-list`)
        let data = res.data.data
        if(res.data.status === "success"){
            set({remarkList: data})
        }
    },
    //slider
    sliderList: null,
    getSliderList: async ()=>{
        let res = await axios.get(`/api/getSliderList`)
        let data = res.data.data
        if(res.data.status === "success"){
            set({sliderList: data})
        }
    },
    // product list by remark
    productList: null,
    getProductListByRemark: async (remark)=>{
        set({productList: null})
        let res = await axios.get(`/api/productListByRemark/${remark}`)
        let data = res.data.data
        if(res.data.status === "success"){
            set({productList: data})
        }
    },

    //product list by brand
    getProductListByBrand: async (brandID)=>{
        set({productList: null})
        let res = await axios.get(`/api/productListByBrand/${brandID}`)
        let data = res.data.data
        if(res.data.status === "success"){
            set({productList: data})
        }
    },
    //product list by category
    getProductListByCategory: async (categoryID)=>{
        set({productList: null})
        let res = await axios.get(`/api/productListByCategory/${categoryID}`)
        let data = res.data.data
        if(res.data.status === "success"){
            set({productList: data})
        }
    },
    //product list by keyword
    getProductListByKeyword: async (keyword)=>{
        set({productList: null})
        let res = await axios.get(`/api/productListByKeyword/${keyword}`)
        let data = res.data.data
        if(res.data.status === "success"){
            set({productList: data})
        }
    },

    // get all product list
    getAllProductList: async ()=>{
        set({productList: null})
        let res = await axios.get(`/api/getAllProducts`)
        let data = res.data.data
        if(res.data.status === "success"){
            set({productList: data})
        }
    },

    //search keyword setup
    search: "",
    setSearch: (keyword)=>{
        set({search: keyword})
    },

    //product details
    productDetails: null,
    getProductDetails: async (productID)=>{
        set({productDetails: null})
        let res = await axios.get(`/api/product-details/${productID}`)
        let data = res.data.data[0]
        if(res.data.status === "success"){
            set({productDetails: data})
        }
    },

    //create review
    isSubmit: false,
    setSubmit: (boolean)=>{
        set({isSubmit: boolean})
    },
    reviewForm: {rating: "", description: ""},
    inputOnChange: (name, value)=>{
        set((state)=>({
            reviewForm:{
                ...state.reviewForm,
                [name]: value
            }
        }))
    },
    createReview: async (productID, reviewForm)=>{
        try {
            let res = await axios.post(`/api/create-review/${productID}`, reviewForm, {withCredentials: true})
            return res.data
        }catch(err){
            unauthorized(err?.response?.status);
        }

    },
    //product review list
    reviewList: null,
    getReviewList: async (productID)=>{
        let res = await axios.get(`/api/productReviewList/${productID}`)
        let data = res.data.data
        if(res.data.status === "success"){
            set({reviewList: data})
        }
    },

}))