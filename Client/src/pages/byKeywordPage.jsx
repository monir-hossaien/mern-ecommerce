import React, {useEffect} from 'react';
import MasterLayout from "../components/layout/MasterLayout.jsx";
import ProductList from "../components/Product/ProductList.jsx";
import {productStore} from "../store/productStore.js";
import {useParams} from "react-router";
import {Helmet} from "react-helmet";
import BreadCrumbs from "../components/BreadCrumbs.jsx";

const ByKeywordPage = () => {
    const {getProductListByKeyword} = productStore();
    const {keyword} = useParams();
    useEffect(() => {
        (async()=>{
            await getProductListByKeyword(keyword);
        })()
    }, [keyword]);

    return (
        <MasterLayout>
            <BreadCrumbs title="All products" />
            <Helmet>
                <title>By-Keyword || eShop</title>
                <meta name="description" content="This is the By-Keyword page of my website, where you can find Product list By-Keyword" />
                <meta name="keywords" content="By-Keyword, website, resources" />
                <meta name="robots" content="index, follow" />
                {/* Other SEO-related meta tags */}
            </Helmet>
            <ProductList/>
        </MasterLayout>
    );
};

export default ByKeywordPage;