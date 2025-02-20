import React from 'react';
import {IoIosArrowForward} from "react-icons/io";

const BreadCrumbs = (props) => {
    return (
        <div className="mt-4 container fs-6">
            <ul className="d-flex align-items-center">
                <li>Home</li>
                <span className="mx-2 text-muted text-secondary fw-lighter">
                    <IoIosArrowForward />
                </span>
                <li>{props.title}</li>
            </ul>
        </div>
    );
};

export default BreadCrumbs;