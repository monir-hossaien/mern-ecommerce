import React from 'react';
import ProductList from "./ProductList.jsx";
import Brands from "./Brands.jsx";

const NoData = () => {
    return (
        <div className="section">
            <div className="container">
                <div className="d-flex justify-content-center align-items-center">
                    <img className="w-25" src="images/no-results.png" alt="nodata.image"/>
                </div>
                <Brands/>
            </div>
        </div>
    );
};

export default NoData;