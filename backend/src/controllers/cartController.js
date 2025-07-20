
import {addToCartService, deleteCartService, cartListService, updateCartService} from "../services/cartService.js"

// add product to cart list
export const addToCart = async (req, res)=>{
    const result = await addToCartService(req);
    return res.status(result.statusCode).json(result);
}

// add product to cart list
export const updateCart = async (req, res)=>{
    const result = await updateCartService(req);
    return res.status(result.statusCode).json(result);
}

// delete product from cart list
export const deleteCart = async (req, res)=>{
    const result = await deleteCartService(req);
    return res.status(result.statusCode).json(result);
}

// find cart list
export const cartList = async (req, res)=>{
    const result = await cartListService(req);
    return res.status(result.statusCode).json(result);
}