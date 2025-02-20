import React from 'react';
import MasterLayout from "../components/layout/MasterLayout.jsx";
import CartList from "../components/Product/CartList.jsx";
import {Helmet} from "react-helmet";
import BreadCrumbs from "../components/BreadCrumbs.jsx";

const CartPage = () => {
    return (
        <MasterLayout>
            <BreadCrumbs title="Cart Products" />
            <Helmet>
                <title>Cart List || eShop</title>
                <meta name="description" content="This is the Cart List page of my website, where you can find Cart List" />
                <meta name="keywords" content="Cart List, website, resources" />
                <meta name="robots" content="index, follow" />
                {/* Other SEO-related meta tags */}
            </Helmet>
            <CartList/>
        </MasterLayout>
    );
};

export default CartPage;