import React, { useEffect, useState } from "react";
import { cartStore } from "../../store/cartStore.js";
import { wishStore } from "../../store/wishStore.js";
import { DeleteAlert, errorToast, successToast } from "../../Utility/helper.js";
import CartSkeleton from "../../Skeleton/cartSkeleton.jsx";
import NoData from "./NoData.jsx";
import { Link } from "react-router";
import CartBtn from "../Button/CartBtn.jsx";
import { invoiceStore } from "../../store/invoiceStore.js";
import {userStore} from "../../store/userStore.js";
import {useNavigate} from "react-router-dom";

const CartList = () => {
    const {
        setCartSubmit,
        updateCartRequest,
        removeCartRequest,
        getCartList,
        cartItem,
        totalAmount,
        vatAmount,
        payableAmount,
        discountAmount,
    } = cartStore();
    const {profile, getProfileDetails, isLogin} = userStore();
    const { createWishRequest, getWishList } = wishStore();
    const { createInvoice } = invoiceStore();
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            isLogin() &&
            await getCartList();
            await getProfileDetails()
        })();
    }, []);

    const increment = async (_id, quantity) => {
        try {
            let res = await updateCartRequest(_id, { quantity: parseInt(quantity) + 1 });
            res.status === "success" && (await getCartList());
        } catch (err) {
            errorToast(err?.response?.data?.message);
        }
    };

    const decrement = async (_id, quantity) => {
        try {
            if (quantity > 1) {
                let res = await updateCartRequest(_id, { quantity: parseInt(quantity) - 1 });
                res.status === "success" && (await getCartList());
            }
        } catch (err) {
            errorToast(err?.response?.data?.message);
        }
    };

    const addToWishList = async (productID) => {
        try {
            if(isLogin()){
                let res = await createWishRequest(productID);
                if (res?.status === "success") {
                    await getWishList();
                    successToast(res?.message);
                }
            }
        } catch (err) {
            errorToast(err?.response?.data?.message);
        }
    };

    const removeCart = async (cartID) => {
        try {
            const isConfirmed = await DeleteAlert();
            if (!isConfirmed) return;
            let res = await removeCartRequest(cartID);
            if (res?.status === "success") {
                successToast(res?.message);
                await getCartList();
            }
        } catch (err) {
            errorToast(err?.response?.data?.message);
        }
    };

    const InvoiceHandler = async () => {
        try {
            if(profile === null){
                errorToast("Please complete your details")
                navigate("/profile")
            }
            else{
                setCartSubmit(true);
                let res = await createInvoice();
                if (res?.status === "success") {
                    setCartSubmit(false);
                    window.location.href = res?.data?.["GatewayPageURL"];
                }
            }
        } catch (err) {
            errorToast(err?.response?.data?.message);
            setCartSubmit(false);
        }
    };

    if (cartItem === null) {
        return <CartSkeleton />;
    } else if (cartItem.length === 0) {
        return <NoData />;
    }

    return (
        <div className="section" id="shopping_cart">
            <div className="container">
                <div className="row">

                    {/* Cart Items */}
                    <div className="col-lg-8 col-md-7 col-sm-12">
                        {cartItem.map((item, i) => {
                            let { quantity, product, color, size, productId, _id} = item;
                            let { price, productImg, title, shortDescription} = product;
                            return (
                                <div key={i} className="cart-item card p-3 mb-3 rounded shadow-sm">
                                    <div className="row align-items-center">
                                        {/* Product Image */}
                                        <div className="col-md-2 col-4">
                                            <img src={productImg[0]} alt="Product" className="img-fluid rounded" />
                                        </div>

                                        {/* Product Info */}
                                        <div className="col-md-4 col-8">
                                            <h6 className="fw-bold">{title}</h6>
                                            <p className="text-muted small mb-1">{shortDescription}</p>
                                            <div className="d-flex flex-wrap gap-2">
                                                <p className="text-muted mb-0"><b>Size:</b> {size}</p>
                                                <p className="text-muted mb-0"><b>Color:</b> {color}</p>
                                            </div>
                                        </div>

                                        {/* Quantity Control */}
                                        <div className="col-md-3 col-6 d-flex align-items-center justify-content-center">
                                            <button onClick={() => decrement(_id, quantity)} disabled={quantity <= 1} className="btn btn-outline-secondary btn-sm">
                                                <i className="bi bi-dash"></i>
                                            </button>
                                            <span className="mx-2">{quantity}</span>
                                            <button onClick={() => increment(_id, quantity)} className="btn btn-outline-secondary btn-sm">
                                                <i className="bi bi-plus"></i>
                                            </button>
                                        </div>

                                        {/* Price */}
                                        <div className="col-md-2 col-6 text-center">
                                            <span className="fw-bold text-success">$ {price}</span>
                                        </div>

                                        {/* Remove & Wishlist Buttons */}
                                        <div className="col-md-1 col-12 text-center">
                                            <div className="d-flex flex-lg-column gap-2 justify-content-center">
                                                <button onClick={() => removeCart(_id)}
                                                        className="btn btn-danger btn-sm">
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                                <button onClick={() => addToWishList(productId)}
                                                        className="btn btn-light btn-sm">
                                                    <i className="bi bi-heart text-danger"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Cart Summary */}
                    <div className="col-lg-4 col-md-5 col-sm-12 mt-3 mt-md-0">
                        <div className="card shadow-sm p-4 border-0 rounded">
                            <h4 className="text-center mb-3">Cart Summary</h4>
                            <div className="d-flex justify-content-between mb-2">
                                <span>Subtotal:</span>
                                <span className="fw-bold">$ {totalAmount}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-2">
                                <span>Discount: (-)</span>
                                <span className="fw-bold">$ {discountAmount}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-2">
                                <span>Tax (5%):</span>
                                <span className="fw-bold">$ {vatAmount}</span>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between mb-3">
                                <span>Total:</span>
                                <span className="fw-bold">$ {payableAmount}</span>
                            </div>
                            <CartBtn onClick={() => InvoiceHandler()} type="button" text="Proceed to Checkout" className="btn btn-success w-100 py-2 fw-bold" />
                            <Link to="/all-products" className="d-flex justify-content-center align-items-center mt-2 text-decoration-none">
                                <p className="mb-0">Continue Shopping</p>
                                <i className="bi bi-arrow-right-short fs-5"></i>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CartList;
