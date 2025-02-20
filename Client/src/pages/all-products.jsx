import React, {useEffect} from 'react';
import ProductList from "../components/Product/ProductList.jsx";
import {productStore} from "../store/productStore.js";
import MasterLayout from "../components/layout/MasterLayout.jsx";
import {Helmet} from "react-helmet";
import BreadCrumbs from "../components/BreadCrumbs.jsx";

const AllProducts = () => {
    const {getAllProductList} = productStore();

    useEffect(() => {
        (async()=>{
            await getAllProductList();
        })()
    },[])

    return (
        <MasterLayout>
            <BreadCrumbs title="All products" />
            <Helmet>
                <title>Shop || eShop</title>
                <meta name="description" content="This is the Shop page of my website, where you can find all products" />
                <meta name="keywords" content="Shop, website, resources" />
                <meta name="robots" content="index, follow" />
                {/* Other SEO-related meta tags */}
            </Helmet>
            <ProductList/>
        </MasterLayout>
    );
};

export default AllProducts;