import React from 'react';
import Navbar from "../CustomNavbar.jsx";
import Footer from "../Footer.jsx";

const MasterLayout = ({children}) => {
    return (
        <div>
            <Navbar/>
            <div>
                {children}
            </div>
            <Footer/>
        </div>
    );
};

export default MasterLayout;