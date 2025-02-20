import React, {useEffect} from 'react';
import {productStore} from "../../store/productStore.js";
import BrandSkeleton from "../../Skeleton/brandSkeleton.jsx";
import {Link} from "react-router";

const Brands = () => {
    const {brandList, getBrandList} = productStore();

    useEffect(() => {
        (async ()=>{
            await getBrandList();
        })()
    }, [])

    return (
        <div className="section">
            <div className="container">
                <div className="row">
                    <h1 className="headline-4 text-center my-2 p-0">Top Brands</h1>
                    <span className="bodySmall mb-5 text-center">Explore a World of Choices Across Our Most Popular <br
                    />Shopping Categories </span>
                    {
                        brandList === null ? <BrandSkeleton/> :(
                            brandList?.map((item, i)=>{
                                let {_id, brandName, brandImg} = item
                                return (
                                    <div key={i} className="col-6 col-lg-8r text-center col-md-8r p-2">
                                        <Link to={`/products-by-brand/${_id}`} className="card h-100 rounded-3">
                                            <div className="card-body">
                                                <img className="w-75" src={brandImg}/>
                                                <p className="bodySmall mt-3">{brandName}</p>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Brands;