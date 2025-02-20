import React from 'react';
import InvoiceDetails from "../components/Payment/InvoiceDetails.jsx";
import MasterLayout from "../components/layout/MasterLayout.jsx";
import {Helmet} from "react-helmet";
import BreadCrumbs from "../components/BreadCrumbs.jsx";

const InvoiceDetailsPage = () => {
    return (
        <MasterLayout>
            <BreadCrumbs title="Invoice Details" />
            <Helmet>
                <title>Invoice Details || eShop</title>
                <meta name="description" content="This is the Invoice Details page of my website, where you can find your Invoice Details" />
                <meta name="keywords" content="Invoice Details, website, resources" />
                <meta name="robots" content="index, follow" />
                {/* Other SEO-related meta tags */}
            </Helmet>
            <InvoiceDetails/>
        </MasterLayout>
    );
};

export default InvoiceDetailsPage;