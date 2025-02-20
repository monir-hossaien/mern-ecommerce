import React from 'react';
import MasterLayout from "../components/layout/MasterLayout.jsx";
import InvoiceList from "../components/Payment/InvoiceList.jsx";
import {Helmet} from "react-helmet";
import BreadCrumbs from "../components/BreadCrumbs.jsx";

const InvoicePage = () => {
    return (
        <MasterLayout>
            <BreadCrumbs title="Invoice" />
            <Helmet>
                <title>Invoice || eShop</title>
                <meta name="description" content="This is the Invoice page of my website, where you can find your Invoice List" />
                <meta name="keywords" content="Invoice, website, resources" />
                <meta name="robots" content="index, follow" />
                {/* Other SEO-related meta tags */}
            </Helmet>
            <InvoiceList/>
        </MasterLayout>
    );
};

export default InvoicePage;