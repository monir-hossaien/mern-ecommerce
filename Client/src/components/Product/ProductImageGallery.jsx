import React from 'react';
import {productStore} from "../../store/productStore.js";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css"

const ProductImageGallery = () => {
    const {productDetails} = productStore();

    let images = [
        {
            original: productDetails?.productImg[0],
            thumbnail: productDetails?.productImg[0],
        },
        {
            original: productDetails?.productImg[0],
            thumbnail: productDetails?.productImg[0],
        },
        {
            original: productDetails?.productImg[0],
            thumbnail: productDetails?.productImg[0],
        },
        {
            original: productDetails?.productImg[0],
            thumbnail: productDetails?.productImg[0],
        },
        {
            original: productDetails?.productImg[0],
            thumbnail: productDetails?.productImg[0],
        },
        {
            original: productDetails?.productImg[1],
            thumbnail: productDetails?.productImg[1],
        }

    ];
    return (
        <div>
            <ImageGallery  autoPlay={true}  items={images} />
        </div>
    );
};

export default ProductImageGallery;