import React from 'react';
import MasterLayout from "../components/layout/MasterLayout.jsx";
import SignUp from "../components/User/SignUp.jsx";
import {Helmet} from "react-helmet";
import BreadCrumbs from "../components/BreadCrumbs.jsx";

const SignUpPage = () => {
    return (
        <MasterLayout>
            <BreadCrumbs title="Sign-Up" />
            <Helmet>
                <title>SignUp || eShop</title>
                <meta name="description" content="This is the SignUp page of my website, where you can SignUp" />
                <meta name="keywords" content="SignUp, website, resources" />
                <meta name="robots" content="index, follow" />
                {/* Other SEO-related meta tags */}
            </Helmet>
            <SignUp/>
        </MasterLayout>
    );
};

export default SignUpPage;