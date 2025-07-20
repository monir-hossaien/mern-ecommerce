import {
    createWishesService,
    deleteWishService,
    wishListService
} from "../services/wishService.js";

export const createWishesProduct = async (req, res) => {
    const result = await createWishesService(req);
    return res.status(result.statusCode).json(result);
}

export const readWishList = async (req, res) => {
    const result = await wishListService(req);
    return res.status(result.statusCode).json(result);
}

export const deleteWishProduct = async (req, res) => {
    const result = await deleteWishService(req);
    return res.status(result.statusCode).json(result);
}