import React from 'react';
import MasterLayout from "../components/layout/MasterLayout.jsx";
import Login from "../components/User/Login.jsx";
import {Helmet} from "react-helmet";
import BreadCrumbs from "../components/BreadCrumbs.jsx";

const LoginPage = () => {
    return (
        <MasterLayout>
            <BreadCrumbs title="Login" />
            <Helmet>
                <title>Login || eShop</title>
                <meta name="description" content="This is the Login page of my website, where you can Login your account" />
                <meta name="keywords" content="Login, website, resources" />
                <meta name="robots" content="index, follow" />
                {/* Other SEO-related meta tags */}
            </Helmet>
            <Login/>
        </MasterLayout>
    );
};

export default LoginPage;