import React from 'react';
import Skeleton from "react-loading-skeleton";
import Lottie from "lottie-react";
import ImagePlaceholder from '../assets/image.json'
const SliderSkeleton = () => {
    return (
        <>
            <div className="container section">
                <div className="row justify-content-center align-items-center">
                    <div className="col-12 col-lg-6 col-sm-12 col-md-6 slider_wrapper">
                        <Skeleton count={7}/>
                        <br/>
                        <Skeleton count={7}/>
                    </div>
                    <div className="col-12 col-lg-6 col-sm-12 col-md-6">
                        <div className="d-flex justify-content-center align-items-center">
                            <Lottie className="w-75 " animationData={ImagePlaceholder} loop={true}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SliderSkeleton;