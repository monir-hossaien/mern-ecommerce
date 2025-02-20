import React, {useEffect} from 'react';
import {productStore} from "../store/productStore.js";
import ProductList from "../components/Product/ProductList.jsx";
import {useParams} from "react-router";
import MasterLayout from "../components/layout/MasterLayout.jsx";
import {Helmet} from "react-helmet";
import BreadCrumbs from "../components/BreadCrumbs.jsx";

const ByRemarkPage = () => {
    let {getProductListByRemark} = productStore();
    let {remark} = useParams();

    useEffect(() => {
        (async()=>{
            await getProductListByRemark(remark)
        })()
    },[remark])
    return (
        <MasterLayout>
            <BreadCrumbs title="All products" />
            <Helmet>
                <title>By-Remark || eShop</title>
                <meta name="description" content="This is the By-Remark page of my website, where you can find Product list By-Remark wise" />
                <meta name="keywords" content="By-Remark, website, resources" />
                <meta name="robots" content="index, follow" />
                {/* Other SEO-related meta tags */}
            </Helmet>
            <ProductList/>
        </MasterLayout>
    );
};

export default ByRemarkPage;