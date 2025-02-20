import React from 'react';
import Skeleton from "react-loading-skeleton";
import ImagePlaceholder from "../assets/image.json";
import Lottie from "lottie-react";

const WishListSkeleton = () => {
    return (
        <div className="section">
            <div className="container">
                <div className="row">
                    <h4 className="pb-3">Favourites ()</h4>
                    {
                        Array.from({length: 4}).map((_, i) => {
                            return (
                                <div className="col-md-3 col-lg-3 col-sm-6 col-12 py-2">
                                    <div className="card wrapper h-100">
                                        <div className="d-flex flex-column">
                                            {/* Image Skeleton */}
                                            <Lottie className="w-75 mx-auto" animationData={ImagePlaceholder} loop={true}/>
                                            <div className="card-body">
                                                {/* Title Skeleton */}
                                                <div>
                                                    <Skeleton width={180} height={20}/>
                                                </div>
                                                {/* Price Skeleton */}
                                                <Skeleton width={80} height={10} className="my-2"/>
                                                {/* Rating Skeleton */}
                                                <Skeleton width={100} height={8}/>
                                                {/* Button Skeletons */}
                                                <div className="d-flex gap-2 justify-content-end mt-2">
                                                    <Skeleton rounded width={30} height={30}/>
                                                    <Skeleton rounded width={30} height={30}/>
                                                    <Skeleton rounded width={30} height={30}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default WishListSkeleton;