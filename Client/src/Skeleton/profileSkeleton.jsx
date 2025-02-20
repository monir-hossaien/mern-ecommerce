import React from 'react';
import Skeleton from "react-loading-skeleton";
import ImagePlaceholder from "../assets/image.json";
import Lottie from "lottie-react";

const ProfileSkeleton = () => {
    return (
        <section className="section">
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <div className="rounded  bg-white card p-4">
                            <div className="d-flex justify-content-center align-items-center">
                                <Lottie className="w-75" animationData={ImagePlaceholder} loop={true}/>
                            </div>
                            <div className="card-body">
                                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                            </div>
                            <Skeleton variant="rectangular" width={210} height={60} />
                            <Skeleton variant="rounded" width={210} height={60} />
                        </div>
                    </div>
                    <div className="col-md-9">
                        <div className="card p-4 rounded-3">
                            <h6>Customer Details</h6>
                            <hr/>
                            <div className="row mb-4">
                                <div className="col-md-3 p-2">
                                    <Skeleton count={2}/>
                                </div>
                                <div className="col-md-3 p-2">
                                    <Skeleton count={2}/>
                                </div>
                                <div className="col-md-3 p-2">
                                    <Skeleton count={2}/>
                                </div>
                                <div className="col-md-3 p-2">
                                    <Skeleton count={2}/>
                                </div>
                                <div className="col-md-3 p-2">
                                    <Skeleton count={2}/>
                                </div>
                                <div className="col-md-3 p-2">
                                    <Skeleton count={2}/>
                                </div>
                                <div className="col-md-3 p-2">
                                    <Skeleton count={2}/>
                                </div>
                                <div className="col-md-3 p-2">
                                    <Skeleton count={2}/>
                                </div>
                            </div>
                            <h6>Shipping Details</h6>
                            <hr/>
                            <div className="row">
                                <div className="col-md-3 p-2">
                                    <Skeleton count={2}/>
                                </div>
                                <div className="col-md-3 p-2">
                                    <Skeleton count={2}/>
                                </div>
                                <div className="col-md-3 p-2">
                                    <Skeleton count={2}/>
                                </div>
                                <div className="col-md-3 p-2">
                                    <Skeleton count={2}/>
                                </div>
                                <div className="col-md-3 p-2">
                                    <Skeleton count={2}/>
                                </div>
                                <div className="col-md-3 p-2">
                                    <Skeleton count={2}/>
                                </div>
                                <div className="col-md-3 p-2">
                                    <Skeleton count={2}/>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col-md-3 p-2">
                                    <Skeleton count={2}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProfileSkeleton;