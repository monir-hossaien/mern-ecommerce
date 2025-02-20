import React, {useEffect} from 'react';
import MasterLayout from "../components/layout/MasterLayout.jsx";
import ProductList from "../components/Product/ProductList.jsx";
import {productStore} from "../store/productStore.js";
import {useParams} from "react-router";
import {Helmet} from "react-helmet";
import BreadCrumbs from "../components/BreadCrumbs.jsx";

const ByBrandPage = () => {
    const {getProductListByBrand} = productStore();
    const {brandID} = useParams();

    useEffect(() => {
        (async()=>{
           await getProductListByBrand(brandID);
        })()
    },[brandID])

    return (
        <MasterLayout>
            <BreadCrumbs title="All products" />
            <Helmet>
                <title>By-Brand || eShop</title>
                <meta name="description" content="This is the By-Brand page of my website, where you can find Product list by brand" />
                <meta name="keywords" content="By-Brand, website, resources" />
                <meta name="robots" content="index, follow" />
                {/* Other SEO-related meta tags */}
            </Helmet>
            <ProductList/>
        </MasterLayout>
    );
};

export default ByBrandPage;