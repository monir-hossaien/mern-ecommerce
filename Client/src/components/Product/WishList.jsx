import React, { useEffect } from 'react';
import { wishStore } from "../../store/wishStore.js";
import WishListSkeleton from "../../Skeleton/WishListSkeleton.jsx";
import StarRatings from "react-star-ratings/build/star-ratings.js";
import { NavLink } from "react-router";
import { cartStore } from "../../store/cartStore.js";
import { DeleteAlert, errorToast, successToast } from "../../Utility/helper.js";
import NoData from "./NoData.jsx";
import {userStore} from "../../store/userStore.js";

const WishList = () => {
    const { wishProductList, wishCount, getWishList, removeWishRequest } = wishStore();
    const { createCartRequest, getCartList } = cartStore();
    const {isLogin} = userStore()

    useEffect(() => {
        (async () => {
            isLogin() &&
            await getWishList();
        })();
    }, []);

    const addToCart = async (productID) => {
        try {
            let res = await createCartRequest(productID);
            if (res?.status === "success") {
                await getCartList();
                successToast(res?.message);
            } else {
                errorToast(res?.message);
            }
        } catch (err) {
            errorToast(err?.response?.data?.message);
        }
    };

    const deleteWish = async (productID) => {
        try {
            const isConfirm = await DeleteAlert();
            if (!isConfirm) {
                return null;
            }
            let res = await removeWishRequest(productID);
            if (res?.status === "success") {
                successToast(res?.message);
                await getWishList();
            } else {
                errorToast(res?.message);
            }
        } catch (err) {
            errorToast(err?.response?.data?.message);
        }
    };

    if (wishProductList === null) {
        return <WishListSkeleton />;
    } else if (wishProductList.length === 0) {
        return <NoData />;
    }



    return (
        <div className="section" id="wish-list">
            <div className="container">
                <div className="row">
                    <h4 className="pb-3">Favourites ({wishCount} items)</h4>
                    {wishProductList.map((item, i) => {
                        const { productImg, title, price, stock, discount, discountPrice, star, _id } = item?.product;
                        return (
                            <div key={i} className="col-12 col-sm-6 col-md-4 col-lg-3 py-2">
                                <div className="card wrapper position-relative h-100">
                                    {stock ? (
                                        <span className="bg-success badge position-absolute top-0 end-0">In Stock</span>
                                    ) : (
                                        <span className="bg-danger badge position-absolute top-0 end-0">Sold Out</span>
                                    )}
                                    <div className="d-flex flex-column">
                                        <div className="product-image">
                                            <img className="card-img-top" src={productImg[0]} alt="image" />
                                        </div>
                                        <div className="card-body">
                                            <h5 className="small fw-bolder text-secondary">{title}</h5>
                                            <p className="text-muted fw-bolder py-1">
                                                {discount ? (
                                                    <div className="d-flex align-items-center gap-1">
                                                        <span><strike>$ {price}</strike></span>
                                                        <span>${discountPrice}</span>
                                                    </div>
                                                ) : (<span>${price}</span>)}
                                            </p>
                                            <StarRatings
                                                rating={star}
                                                starRatedColor="red"
                                                starDimension="12px"
                                                starSpacing="1px"
                                            />
                                            <div className="d-flex gap-2 justify-content-end my-1">
                                                <button onClick={() => addToCart(_id)} className="wish-btn bg-success"
                                                        aria-label="Add to cart"><i className="bi bi-cart"></i></button>
                                                <NavLink to={`/product-details/${_id}`} className="wish-btn bg-secondary"
                                                         aria-label="View product">
                                                    <i className="bi bi-eye"></i></NavLink>
                                                <button onClick={() => deleteWish(_id)} className="wish-btn bg-danger" aria-label="Remove item">
                                                    <i className="bi bi-trash"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default WishList;
