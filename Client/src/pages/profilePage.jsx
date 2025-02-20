import React from 'react';
import MasterLayout from "../components/layout/MasterLayout.jsx";
import Profile from "../components/User/Profile.jsx";
import {Helmet} from "react-helmet";
import BreadCrumbs from "../components/BreadCrumbs.jsx";

const ProfilePage = () => {
    return (
        <MasterLayout>
            <BreadCrumbs title="Profile" />
            <Helmet>
                <title>Profile || eShop</title>
                <meta name="description" content="This is the Profile page of my website, where you can see Profile Details" />
                <meta name="keywords" content="Profile, website, resources" />
                <meta name="robots" content="index, follow" />
                {/* Other SEO-related meta tags */}
            </Helmet>
            <Profile/>
        </MasterLayout>
    );
};

export default ProfilePage;