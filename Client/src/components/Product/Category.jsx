import React, {useEffect} from 'react';
import {productStore} from "../../store/productStore.js";
import CategorySkeleton from "../../Skeleton/categorySkeleton.jsx";
import {Link} from "react-router";

const Category = () => {
    let {categoryList, getCategoryList} = productStore();

    useEffect(()=>{
        (async()=>{
            await getCategoryList()
        })()
    }, [])

    return (
        <div className="section">
            <div className="container">
                <div className="row">
                    <h1 className="headline-4 text-center my-2 p-0">Top Categories</h1>
                    <span className="bodySmal mb-5 text-center">Explore a World of Choices Across Our Most Popular <br
                    />Shopping Categories </span>
                    {
                        categoryList === null? <CategorySkeleton/>:
                            categoryList.map((item, i)=>{
                                let {categoryName, categoryImg, _id} = item;
                                return (
                                    <div key={i} className="col-6 col-lg-8r text-center col-md-8r p-2">
                                        <Link to={`/products-by-category/${_id}`} className="card h-100 rounded-3">
                                            <div className="">
                                                <img alt="" className="img-fluid rounded rounded-bottom-0" src={categoryImg}/>
                                                <p className="bodySmal my-3">{categoryName}</p>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })
                    }
                </div>
            </div>
        </div>
    );
};

export default Category;