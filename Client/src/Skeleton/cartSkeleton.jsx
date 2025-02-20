import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Lottie from "lottie-react";
import ImagePlaceholder from '../assets/image.json'
const CartSkeleton = () => {
    return (
        <div className="section">
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-8">
                        {
                            Array.from({length: 1}).map(()=>{
                                return (
                                    <div className="cart-item card p-2 mb-3 rounded">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <Lottie style={{width: "120px"}} animationData={ImagePlaceholder} loop={true}/>
                                            <div>
                                                <h5><Skeleton width={120}/></h5>
                                                <p className="text-muted small"><Skeleton width={180}/></p>
                                                <div className="d-flex gap-3 fw-bolder">
                                                    <p className="text-muted"><Skeleton width={60}/></p>
                                                    <p className="text-muted"><Skeleton width={60}/></p>
                                                </div>
                                            </div>

                                            <div className="d-flex align-items-center ms-2">
                                                <Skeleton width={30} height={30}/>
                                                <span className="mx-2"><Skeleton width={20}/></span>
                                                <Skeleton width={30} height={30}/>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-center w-25">
                                                <Skeleton width={50}/>
                                            </div>
                                            <button
                                                className="position-absolute top-0 end-0 border-0 rounded">
                                                <Skeleton width={50} height={20}/>
                                            </button>
                                            <div className="d-flex gap-2">
                                                <Skeleton width={30} height={30}/>
                                                <Skeleton width={30} height={30}/>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>

                    {/* Right Section - Cart Summary */}
                    <div className="col-md-4">
                        <div className="card shadow-sm p-4 border-0 rounded">
                            <h4 className="text-center mb-3 text-primary">
                                <Skeleton width={150}/>
                            </h4>
                            <div className="d-flex justify-content-between mb-2">
                                <span>
                                    <Skeleton width={80}/>
                                </span>
                                <span className="font-weight-bold">
                                    <Skeleton width={50}/>
                                </span>
                            </div>
                            <div className="d-flex justify-content-between mb-2">
                                <span>
                                    <Skeleton width={80}/>
                                </span>
                                <span className="font-weight-bold">
                                    <Skeleton width={50}/>
                                </span>
                            </div>
                            <hr/>
                            <div className="d-flex justify-content-between mb-3">
                                <span>
                                    <Skeleton width={80}/>
                                </span>
                                <span className="font-weight-bold">
                                    <Skeleton width={50}/>
                                </span>
                            </div>
                            <Skeleton width="100%" height={40}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartSkeleton;
