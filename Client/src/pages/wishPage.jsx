import React from 'react';
import WishList from "../components/Product/WishList.jsx";
import MasterLayout from "../components/layout/MasterLayout.jsx";
import {Helmet} from "react-helmet";
import BreadCrumbs from "../components/BreadCrumbs.jsx";

const WishPage = () => {
    return (
        <MasterLayout>
            <BreadCrumbs title="Wishes" />
            <Helmet>
                <title>Wishes || eShop</title>
                <meta name="description" content="This is the Wishes page of my website, where you can find your Wishes products" />
                <meta name="keywords" content="Wishes, website, resources" />
                <meta name="robots" content="index, follow" />
                {/* Other SEO-related meta tags */}
            </Helmet>
            <WishList />
        </MasterLayout>
    );
};

export default WishPage;