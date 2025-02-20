import React, { useState } from 'react';
import { productStore } from "../../store/productStore.js";
import ProductDetailsSkeleton from "../../Skeleton/ProductDetailsSkeleton.jsx";
import ProductImageGallery from "./ProductImageGallery.jsx";
import CartBtn from "../Button/CartBtn.jsx";
import parse from "html-react-parser";
import Review from "../../../src/components/Product/Review.jsx";
import { cartStore } from "../../store/cartStore.js";
import { wishStore } from "../../store/wishStore.js";
import { errorToast, successToast } from "../../Utility/helper.js";
import validation from "../../Utility/validation.js";
import WishBtn from "../Button/WishBtn.jsx";

const ProductDetails = () => {
    const [quantity, setQuantity] = useState(1);
    const { productDetails } = productStore();
    const { formData, inputOnchange, createCartRequest, setCartSubmit, getCartList } = cartStore();
    const { setWistSubmit, createWishRequest, getWishList } = wishStore();

    const handleIncrement = () => {
        setQuantity(parseInt(quantity) + 1);
    };

    const handleDecrement = () => {
        parseInt(quantity) > 1 && setQuantity(parseInt(quantity) - 1);
    };

    // product add to cart list
    const addToCart = async (productID) => {
        try {
            if (validation.IsEmpty(formData.size)) {
                errorToast("Please select size");
            } else if (validation.IsEmpty(formData.color)) {
                errorToast("Please select color");
            } else {
                setCartSubmit(true);
                formData.quantity = parseInt(quantity);
                let res = await createCartRequest(productID, formData);
                if (res?.status === "success") {
                    await getCartList();
                    setCartSubmit(false);
                    successToast(res?.message);
                } else {
                    setCartSubmit(false);
                    errorToast(res?.message);
                }
            }

        } catch (err) {
            setCartSubmit(false);
            errorToast(err?.response?.data?.message);
        }
    };

    // product add to wish list
    const addToWish = async (productID) => {
        try {
            setWistSubmit(true);
            let res = await createWishRequest(productID);
            if (res.status === "success") {
                successToast(res?.message);
                await getWishList();
                setWistSubmit(false);
            } else {
                setWistSubmit(false);
                errorToast(res?.message);
            }
        } catch (err) {
            setWistSubmit(false);
            errorToast(err?.response?.data?.message);
        }
    };

    if (productDetails === null) {
        return (
            <ProductDetailsSkeleton />
        )
    }

    return (
        <div id="productDetails">
            <div>
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-md-7 col-12 p-3">
                            <ProductImageGallery />
                        </div>
                        <div className="col-md-5 col-12 py-3">
                            <div className="d-flex flex-column gap-2">
                                <h6 className="mb-2 badge w-25 small bg-success rounded p-2 text-white top-0 start-0">{productDetails?.['stock'] === true ? "In Stock" : "Sold out"}</h6>
                                <h4>{productDetails.title}</h4>
                                <p className="small"><span
                                    className="fw-bolder fs-6 text-secondary">Category:</span> {productDetails?.['category']?.['categoryName']}
                                </p>
                                <p className="small"><span
                                    className="fw-bolder fs-6 text-secondary">Brand:</span> {productDetails?.['brand']?.['brandName']}
                                </p>
                                {
                                    productDetails?.['discount'] === true ? (
                                        <span
                                            className="fw-medium fs-6 d-flex gap-2"><strike>$ {productDetails?.['price']}</strike>{productDetails?.['discountPrice']}</span>
                                    ) : (
                                        <span className="fw-medium fs-6">$ {productDetails?.['price']}</span>
                                    )
                                }
                            </div>
                            <div className="d-flex flex-column gap-4 mt-3">
                                <div className="w-50">
                                    <select value={formData.size} onChange={(e) => {
                                        inputOnchange("size", e.target.value)
                                    }} className="form-control form-select small">
                                        <option value="" className="small">Size</option>
                                        {
                                            productDetails?.['productDetails']?.['size'].map((size, i) => {
                                                return (
                                                    <option value={size} key={i}>{size}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="w-50">
                                    <select value={formData.color} onChange={(e) => {
                                        inputOnchange("color", e.target.value)
                                    }} className="form-control form-select">
                                        <option value="">Color</option>
                                        {
                                            productDetails?.['productDetails']?.['color'].map((color, i) => {
                                                return (
                                                    <option value={color} key={i}>{color}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="w-25">
                                    <div className="input-group">
                                        <button onClick={handleDecrement} className="btn btn-outline-secondary">-
                                        </button>
                                        <input value={quantity} type="text"
                                               className="form-control bg-light text-center" readOnly/>
                                        <button onClick={() => handleIncrement()}
                                                className="btn btn-outline-secondary">+
                                        </button>
                                    </div>
                                </div>
                                <div className="d-flex flex-column gap-3">
                                    <div className="col-12 col-sm-6">
                                        <CartBtn
                                            onClick={() => addToCart(productDetails?.['_id'])}
                                            type="button"
                                            text="Add to cart"
                                            className="btn btn-success px-4 fw-bold w-100"
                                        />
                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <WishBtn
                                            onClick={() => addToWish(productDetails?.['_id'])}
                                            type="button"
                                            text="Add to wish"
                                            className="btn btn-outline-dark px-4 fw-bold w-100"
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="Speci-tab" data-bs-toggle="tab"
                                        data-bs-target="#Speci-tab-pane" type="button" role="tab"
                                        aria-controls="Speci-tab-pane" aria-selected="true">Specifications
                                </button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="Review-tab" data-bs-toggle="tab"
                                        data-bs-target="#Review-tab-pane"
                                        type="button" role="tab" aria-controls="Review-tab-pane"
                                        aria-selected="false">Review
                                </button>
                            </li>
                        </ul>
                        <div className="tab-content mt-3" id="myTabContent">
                            <div className="tab-pane fade show active" id="Speci-tab-pane" role="tabpanel"
                                 aria-labelledby="Speci-tab" tabIndex="0">
                                {
                                    parse(productDetails?.['productDetails']?.description)
                                }
                            </div>
                            <div className="tab-pane fade" id="Review-tab-pane" role="tabpanel"
                                 aria-labelledby="Review-tab"
                                 tabIndex="0">
                                <Review />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ProductDetails;
