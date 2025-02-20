import React, { useEffect } from 'react';
import { productStore } from "../../store/productStore.js";
import SliderSkeleton from "../../Skeleton/sliderSkeleton.jsx";
import { Link } from "react-router";

const Slider = () => {
    let { sliderList, getSliderList } = productStore();

    useEffect(() => {
        (async () => {
            await getSliderList();
        })();
    }, []);

    return (
        <div id="carouselExampleDark" className="carousel carousel-dark slide">
            {/* Indicators */}
            <div className="carousel-indicators">
                {sliderList?.map((item, i) => (
                    <button key={i} type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to={i}
                            className={i === 0 ? "active" : ""}
                            aria-current={i === 0 ? "true" : "false"} aria-label={`Slide ${i + 1}`}></button>
                ))}
            </div>

            {/* Slider Items */}
            <div className="carousel-inner">
                {sliderList === null ? <SliderSkeleton /> : (
                    sliderList.map((item, i) => {
                        let active = i === 0 ? "carousel-item active" : "carousel-item";
                        let { title, description, price, image, productID } = item;

                        return (
                            <div key={i} className={active} data-bs-interval="10000">
                                <div className="container">
                                    <div className="row align-items-center">

                                        {/* Left Content (Hidden on Small Devices) */}
                                        <div className="col-lg-6 col-md-6 d-none d-md-block">
                                            <div className="slider_wrapper">
                                                <h1 className="headline-1">{title}</h1>
                                                <p className="py-2 lh-base">{description}</p>
                                                <h6 className="fw-medium text-danger py-2">$ {price}</h6>
                                                <Link to={`/product-details/${productID}`} className="btn text-white btn-success mt-3">
                                                    Buy Now
                                                </Link>
                                            </div>
                                        </div>

                                        {/* Right Image (Always Visible) */}
                                        <div className="col-lg-6 col-md-6 col-12">
                                            <div className="d-flex justify-content-center align-items-center">
                                                <img className="img-fluid w-100" src={image} alt="slider_image" />
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Navigation Controls */}
            <div className="d-none d-md-block">
                <button className="carousel-control-prev " type="button" data-bs-target="#carouselExampleDark"
                        data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark"
                        data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );
};

export default Slider;
