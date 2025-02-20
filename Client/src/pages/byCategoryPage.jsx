import React, {useEffect} from 'react';
import MasterLayout from "../components/layout/MasterLayout.jsx";
import ProductList from "../components/Product/ProductList.jsx";
import {productStore} from "../store/productStore.js";
import {useParams} from "react-router";
import {Helmet} from "react-helmet";
import BreadCrumbs from "../components/BreadCrumbs.jsx";

const ByCategoryPage = () => {
    const {getProductListByCategory} = productStore();
    const {categoryID} = useParams();

    useEffect(() => {
        (async()=>{
            await getProductListByCategory(categoryID);
        })()
    },[categoryID])
    return (
        <MasterLayout>
            <BreadCrumbs title="All products" />
            <Helmet>
                <title>By-Category || eShop</title>
                <meta name="description" content="This is the By-Category page of my website, where you can find Product list By-Category" />
                <meta name="keywords" content="By-Category, website, resources" />
                <meta name="robots" content="index, follow" />
                {/* Other SEO-related meta tags */}
            </Helmet>
            <ProductList/>
        </MasterLayout>
    );
};

export default ByCategoryPage;