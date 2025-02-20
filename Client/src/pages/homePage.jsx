import React from 'react';
import MasterLayout from "../components/layout/MasterLayout.jsx";

import Features from "../components/Product/Features.jsx";
import Brands from "../components/Product/Brands.jsx";
import Category from "../components/Product/Category.jsx";
import Slider from "../components/Product/Slider.jsx";
import Products from "../components/Product/Products.jsx";
import { Helmet } from 'react-helmet';
import BreadCrumbs from "../components/BreadCrumbs.jsx";

const HomePage = () => {
    return (
        <MasterLayout>
            <Helmet>
                <title>Home || eShop</title>
                <meta name="description" content="This is the home page of my website, where you can find various resources." />
                <meta name="keywords" content="home, website, resources" />
                <meta name="robots" content="index, follow" />
                {/* Other SEO-related meta tags */}
            </Helmet>
            <Slider/>
            <Features/>
            <Brands/>
            <Category/>
            <Products/>
        </MasterLayout>
    );
};

export default HomePage;