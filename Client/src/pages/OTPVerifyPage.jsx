import React from 'react';
import MasterLayout from "../components/layout/MasterLayout.jsx";
import OtpVerify from "../components/User/OTPVerify.jsx";
import {Helmet} from "react-helmet";
import BreadCrumbs from "../components/BreadCrumbs.jsx";

const OTPVerifyPage = () => {
    return (
        <MasterLayout>
            <BreadCrumbs title="Verify OTP" />
            <Helmet>
                <title>OTP || eShop</title>
                <meta name="description" content="This is the OTP page of my website, where you can verify your OTP" />
                <meta name="keywords" content="OTP, website, resources" />
                <meta name="robots" content="index, follow" />
                {/* Other SEO-related meta tags */}
            </Helmet>
            <OtpVerify/>
        </MasterLayout>
    );
};

export default OTPVerifyPage;