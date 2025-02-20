import React, {useEffect} from 'react';
import MasterLayout from "../components/layout/MasterLayout.jsx";
import Brands from "../components/Product/Brands.jsx";
import ProductDetails from "../components/Product/ProductDetails.jsx";
import {productStore} from "../store/productStore.js";
import {useParams} from "react-router";
import {Helmet} from "react-helmet";
import BreadCrumbs from "../components/BreadCrumbs.jsx";

const ProductDetailsPage = () => {
    const {getProductDetails, getReviewList} = productStore();
    const productID = useParams();

    useEffect(()=>{
        (async()=>{
            await getProductDetails(productID.productID)
            await getReviewList(productID.productID)
        })()
    },[productID])
    return (
        <MasterLayout>
            <BreadCrumbs title="Product Details" />
            <Helmet>
                <title>Product Details || eShop</title>
                <meta name="description" content="This is the Product Details page of my website, where you can see Product Details" />
                <meta name="keywords" content="Product Details, website, resources" />
                <meta name="robots" content="index, follow" />
                {/* Other SEO-related meta tags */}
            </Helmet>
            <ProductDetails/>
            <Brands/>
        </MasterLayout>
    );
};

export default ProductDetailsPage;