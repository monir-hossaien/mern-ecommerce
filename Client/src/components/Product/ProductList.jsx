import React, { useEffect } from "react";
import { productStore } from "../../store/productStore.js";
import StarRatings from "react-star-ratings/build/star-ratings.js";
import { Link } from "react-router";
import ProductsSkeleton from "../../Skeleton/ProductsSkeleton.jsx";
import SidebarSkeleton from "../../Skeleton/sidebarSkeleton.jsx";
import NoData from "./NoData.jsx";

const ProductList = () => {
    let { productList, categoryList, getCategoryList, brandList, getBrandList, remarkList, getRemarkList } = productStore();

    useEffect(() => {
        (async () => {
            await getCategoryList();
            await getBrandList();
            await getRemarkList();
        })();
    }, []);

    return (
        <section id="product_list" className="py-5">
            <div className="container">
                <div className="row">

                    {/* Sidebar (Collapsible on small screens) */}
                    <div className="col-lg-3 col-md-4">
                        <div className="accordion accordion-flush" id="sidebarAccordion">

                            {/* Categories */}
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#categoryCollapse">
                                        Categories
                                    </button>
                                </h2>
                                <div id="categoryCollapse" className="accordion-collapse collapse show">
                                    <div className="accordion-body">
                                        {categoryList === null ? <SidebarSkeleton /> : categoryList.map((item, i) => (
                                            <div key={i}>
                                                <Link to={`/products-by-category/${item._id}`} className="d-block py-1">
                                                    {item.categoryName}
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Brands */}
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#brandCollapse">
                                        Brands
                                    </button>
                                </h2>
                                <div id="brandCollapse" className="accordion-collapse collapse">
                                    <div className="accordion-body">
                                        {brandList === null ? <SidebarSkeleton /> : brandList.map((item, i) => (
                                            <div key={i}>
                                                <Link to={`/products-by-brand/${item._id}`} className="d-block py-1">
                                                    {item.brandName}
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Remark */}
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#remarkCollapse">
                                        Remark
                                    </button>
                                </h2>
                                <div id="remarkCollapse" className="accordion-collapse collapse">
                                    <div className="accordion-body">
                                        {remarkList === null ? <SidebarSkeleton /> : remarkList.map((item, i) => (
                                            <div key={i}>
                                                <Link to={`/product-by-remark/${item.name}`} className="d-block py-1">
                                                    {item.name}
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Product List */}
                    <div className="col-lg-9 col-md-8">
                        {
                            productList === null
                                ? <ProductsSkeleton/>
                                : productList.length === 0
                                    ? <NoData/>
                                    : (
                                        <div className="row">
                                            {productList.map((item, i) => (
                                                <div key={i} className="col-lg-3 col-md-4 col-sm-6 col-12 mb-3">
                                                    <Link to={`/product-details/${item._id}`}
                                                          className="card h-100 shadow-sm rounded">
                                                        <span className={`badge position-absolute top-0 end-0 ${item.stock ? "bg-success" : "bg-danger"}`}>
                                                            {item.stock ? "In Stock" : "Sold Out"}
                                                        </span>
                                                        <img src={item.productImg[0]} alt={item.title}
                                                             className="card-img-top p-2"/>
                                                        <div className="card-body">
                                                            <p className="small text-secondary">{item.title}</p>
                                                            <p className="fw-medium">
                                                                {item.discount ? (
                                                                    <>
                                                                        <strike
                                                                            className="text-muted">${item.price}</strike> ${item.discountPrice}
                                                                    </>
                                                                ) : (
                                                                    `$${item.price}`
                                                                )}
                                                            </p>
                                                            <StarRatings rating={item.star} starRatedColor="red"
                                                                         starDimension="15px" starSpacing="2px"/>
                                                        </div>
                                                    </Link>
                                                </div>
                                            ))}
                                        </div>
                                    )
                        }
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ProductList;
