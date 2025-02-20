import React, { useEffect } from "react";
import { productStore } from "../../store/productStore.js";
import { Link } from "react-router";
import StarRatings from "react-star-ratings/build/star-ratings.js";
import ProductsSkeleton from "../../Skeleton/ProductsSkeleton.jsx";

const Products = () => {
  let { productList, getProductListByRemark } = productStore();

  useEffect(()=>{
    (async()=>{
        await getProductListByRemark("new")
    })()
  },[])

  return (
    <div className="section product_section">
      <div className="container-fluid py-5">
        <div className="row">
          <h1 className="headline-4 text-center my-2 p-0">Our Products</h1>
          <span className="bodySmall mb-3 text-center">
            Explore a World of Choices Across Our Most Popular
          </span>
          <div className="col-12">
            <div>
              <ul
                className="nav nav-pills p-3 justify-content-center mb-3"
                id="pills-tab"
                role="tablist"
              >
                <li className="nav-item" role="presentation">
                  <button
                    onClick={() =>
                      getProductListByRemark("new")
                    }
                    className="nav-link active"
                    id="pills-home-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#"
                    type="button"
                    role="tab"
                    aria-controls="pills-home"
                    aria-
                    selected="true"
                    href="#"
                    aria-current="/"
                  >
                    New
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    onClick={() =>
                      getProductListByRemark("trending")
                    }
                    className="nav-link"
                    id="pills-profile-tab"
                    data-bs-toggle="pill"
                    data-
                    bs-target="#pills-trending"
                    type="button"
                    role="tab"
                    aria-controls="pills-trending"
                    aria-
                    selected="false"
                  >
                    Trending
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    onClick={() =>
                      getProductListByRemark("popular")
                    }
                    className="nav-link"
                    id="pills-contact-tab"
                    data-bs-toggle="pill"
                    data-
                    bs-target="#pills-popular"
                    type="button"
                    role="tab"
                    aria-controls="pills-contact"
                    aria-
                    selected="false"
                  >
                    Popular
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    onClick={() =>
                      getProductListByRemark("top")
                    }
                    className="nav-link"
                    id="pills-disabled-tab"
                    data-bs-toggle="pill"
                    data-
                    bs-target="#pills-top"
                    type="button"
                    role="tab"
                    aria-controls="pills-disabled"
                    aria-
                    selected="false"
                  >
                    Top
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    onClick={() =>
                      getProductListByRemark("special")
                    }
                    className="nav-link"
                    id="pills-disabled-tab"
                    data-bs-toggle="pill"
                    data-
                    bs-target="#pills-special"
                    type="button"
                    role="tab"
                    aria-controls="pills-disabled"
                    aria-
                    selected="false"
                  >
                    Special
                  </button>
                </li>
              </ul>
              <div className="tab-content" id="pills-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="pills-new"
                  role="tabpanel"
                  aria-labelledby="pills-home-tab"
                  tabIndex="0"
                >
                  {productList === null ? (
                      <ProductsSkeleton />
                  ) : (
                      <div className="container">
                        <div className="row">
                          {productList?.map((item, i) => {
                            let {
                              _id,
                              title,
                              price,
                              discount,
                              discountPrice,
                              productImg,
                              star,
                              stock
                            } = item;
                            price =
                                <p className="fw-medium text-dark my-1 fw-medium">
                                  $ {price}
                                </p>
                            if (discount === true) {
                              price = (
                                  <p className="fw-medium text-dark my-1 d-flex gap-1 align-items-center">
                                    <strike>{price}</strike>
                                    {discountPrice}
                                  </p>
                              );
                            }
                            return (
                                <div
                                    key={i}
                                    className="col-md-3 p-2 col-lg-3 col-sm-6 col-12"
                                >
                                  <Link
                                      to={`/product-details/${_id}`}
                                      className="card h-100 rounded-3 bg-white position-relative"
                                  >
                                    {stock ?
                                        <span className="bg-success badge position-absolute top-0 end-0">In Stock</span> :
                                        <span className="bg-danger badge position-absolute top-0 end-0">Sold Out</span>
                                    }
                                    <img
                                        className="rounded-top-2 img-fluid"
                                        src={productImg[0]}
                                    />
                                    <div className="card-body">
                                      <h5 className="fs-5 fw-bolder text-secondary">{title}</h5>
                                      {price}
                                      <StarRatings
                                          rating={star}
                                          starRatedColor="red"
                                          starDimension="15px"
                                          starSpacing="2px"
                                      />
                                    </div>
                                  </Link>
                                </div>
                            );
                          })}
                        </div>
                      </div>
                  )}
                </div>
                <div
                  className="tab-pane fade"
                  id="pills-trending"
                  role="tabpanel"
                  aria-labelledby="pills-profile-tab"
                  tabIndex="0"
                >
                  {productList === null ? (
                      <ProductsSkeleton />
                  ) : (
                      <div className="container">
                        <div className="row">
                          {productList?.map((item, i) => {
                            let {
                              _id,
                              title,
                              price,
                              discount,
                              discountPrice,
                              productImg,
                              star,
                              stock
                            } = item;
                            price =
                                <p className="fw-medium text-dark my-1 fw-medium">
                                  $ {price}
                                </p>
                            if (discount === true) {
                              price = (
                                  <p className="fw-medium text-dark my-1 d-flex gap-1 align-items-center">
                                    <strike>{price}</strike>
                                    {discountPrice}
                                  </p>
                              );
                            }
                            return (
                                <div
                                    key={i}
                                    className="col-md-3 p-2 col-lg-3 col-sm-6 col-12"
                                >
                                  <Link
                                      to={`/product-details/${_id}`}
                                      className="card h-100 rounded-3 bg-white position-relative"
                                  >
                                    <h6 className=" badge small position-absolute bg-success rounded py-2 px-3 text-white top-0 start-0">{stock === true ? "Stock" : "Sold out"}</h6>
                                    <img
                                        className="rounded-top-2 img-fluid"
                                        src={productImg[0]}
                                    />
                                    <div className="card-body">
                                      <p className="small text-secondary my-1">
                                        {title}
                                      </p>
                                      {price}
                                      <StarRatings
                                          rating={star}
                                          starRatedColor="red"
                                          starDimension="15px"
                                          starSpacing="2px"
                                      />
                                    </div>
                                  </Link>
                                </div>
                            );
                          })}
                        </div>
                      </div>
                  )}
                </div>
                <div
                  className="tab-pane fade"
                  id="pills-popular"
                  role="tabpanel"
                  aria-labelledby="pills-contact-tab"
                  tabIndex="0"
                >
                  {productList === null ? (
                      <ProductsSkeleton />
                  ) : (
                      <div className="container">
                        <div className="row">
                          {productList?.map((item, i) => {
                            let {
                              _id,
                              title,
                              price,
                              discount,
                              discountPrice,
                              productImg,
                              star,
                              stock
                            } = item;
                            price =
                                <p className="fw-medium text-dark my-1 fw-medium">
                                  $ {price}
                                </p>
                            if (discount === true) {
                              price = (
                                  <p className="fw-medium text-dark my-1 d-flex gap-1 align-items-center">
                                    <strike>{price}</strike>
                                    {discountPrice}
                                  </p>
                              );
                            }
                            return (
                                <div
                                    key={i}
                                    className="col-md-3 p-2 col-lg-3 col-sm-6 col-12"
                                >
                                  <Link
                                      to={`/product-details/${_id}`}
                                      className="card h-100 rounded-3 bg-white position-relative"
                                  >
                                    <h6 className=" badge small position-absolute bg-success rounded py-2 px-3 text-white top-0 start-0">{stock === true ? "Stock" : "Sold out"}</h6>
                                    <img
                                        className="rounded-top-2 img-fluid"
                                        src={productImg[0]}
                                    />
                                    <div className="card-body">
                                      <p className="small text-secondary my-1">
                                        {title}
                                      </p>
                                      {price}
                                      <StarRatings
                                          rating={star}
                                          starRatedColor="red"
                                          starDimension="15px"
                                          starSpacing="2px"
                                      />
                                    </div>
                                  </Link>
                                </div>
                            );
                          })}
                        </div>
                      </div>
                  )}
                </div>
                <div
                  className="tab-pane fade"
                  id="pills-top"
                  role="tabpanel"
                  aria-labelledby="pills-disabled-tab"
                  tabIndex="0"
                >
                  {productList === null ? (
                      <ProductsSkeleton />
                  ) : (
                      <div className="container">
                        <div className="row">
                          {productList?.map((item, i) => {
                            let {
                              _id,
                              title,
                              price,
                              discount,
                              discountPrice,
                              productImg,
                              star,
                              stock
                            } = item;
                            price =
                                <p className="fw-medium text-dark my-1 fw-medium">
                                  $ {price}
                                </p>
                            if (discount === true) {
                              price = (
                                  <p className="fw-medium text-dark my-1 d-flex gap-1 align-items-center">
                                    <strike>{price}</strike>
                                    {discountPrice}
                                  </p>
                              );
                            }
                            return (
                                <div
                                    key={i}
                                    className="col-md-3 p-2 col-lg-3 col-sm-6 col-12"
                                >
                                  <Link
                                      to={`/product-details/${_id}`}
                                      className="card h-100 rounded-3 bg-white position-relative"
                                  >
                                    <h6 className=" badge small position-absolute bg-success rounded py-2 px-3 text-white top-0 start-0">{stock === true ? "Stock" : "Sold out"}</h6>
                                    <img
                                        className="rounded-top-2 img-fluid"
                                        src={productImg[0]}
                                    />
                                    <div className="card-body">
                                      <p className="small text-secondary my-1">
                                        {title}
                                      </p>
                                      {price}
                                      <StarRatings
                                          rating={star}
                                          starRatedColor="red"
                                          starDimension="15px"
                                          starSpacing="2px"
                                      />
                                    </div>
                                  </Link>
                                </div>
                            );
                          })}
                        </div>
                      </div>
                  )}
                </div>
                <div
                  className="tab-pane fade"
                  id="pills-special"
                  role="tabpanel"
                  aria-labelledby="pills-disabled-tab"
                  tabIndex="0"
                >
                  {productList === null ? (
                    <ProductsSkeleton />
                  ) : (
                    <div className="container">
                      <div className="row">
                        {productList?.map((item, i) => {
                          let {
                            _id,
                            title,
                            price,
                            discount,
                            discountPrice,
                            productImg,
                            star,
                            stock
                          } = item;
                          price =
                            <p className="fw-medium text-dark my-1 fw-medium">
                              $ {price}
                            </p>
                          if (discount === true) {
                            price = (
                              <p className="fw-medium text-dark my-1 d-flex gap-1 align-items-center">
                                <strike>{price}</strike>
                                {discountPrice}
                              </p>
                            );
                          }
                          return (
                            <div
                              key={i}
                              className="col-md-3 p-2 col-lg-3 col-sm-6 col-12"
                            >
                              <Link
                                to={`/product-details/${_id}`}
                                className="card h-100 rounded-3 bg-white position-relative"
                              >
                                <h6 className=" badge small position-absolute bg-success rounded py-2 px-3 text-white top-0 start-0">{stock === true ? "In Stock" : "Sold out"}</h6>
                                <img
                                  className="rounded-top-2 img-fluid"
                                  src={productImg[0]}
                                />
                                <div className="card-body">
                                  <p className="small text-secondary my-1">
                                    {title}
                                  </p>
                                  {price}
                                  <StarRatings
                                    rating={star}
                                    starRatedColor="red"
                                    starDimension="15px"
                                    starSpacing="2px"
                                  />
                                </div>
                              </Link>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
