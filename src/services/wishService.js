import WishModel from "../../src/models/product/wishModel.js";
import mongoose from "mongoose";
const objId = mongoose.Types.ObjectId;

export const createWishesService = async (req)=>{
    try {
        const id= req.headers.id;
        const userId = new objId(id);
        const productId = new objId(req.params.productId);
        const wishProduct = {userId: userId, productId:productId};
        const existingProduct = await WishModel.findOne({userId, productId})

        if(existingProduct){
            return {
                status: "failed",
                statusCode: 400,
                message: "Product already exists"
            }
        }
        let result = await WishModel.create(wishProduct)
        return {
            statusCode: 201,
            status: "success",
            message:"Request success",
            data: result
        }

    }
    catch (e) {
        return {
            statusCode: 500,
            status:"fail",
            message: 'Internal Server Error',
            error: e.message
        };
    }
}

export const wishListService = async (req) => {
    try {
        const id = req.headers.id;
        const userId = new objId(id);
        const data = await WishModel.aggregate([
            {
                $match: {userId: userId},
            },
            //join with products collection
            {
                $lookup: {from: "products", localField: "productId", foreignField: "_id", as: "product",}
            },
            {$unwind: "$product"},
            //join with categories collection
            {
                $lookup: {from: "categories", localField: "product.categoryId", foreignField: "_id", as: "category"}
            },
            {$unwind: "$category"},
            //join with brands collection
            {
                $lookup: {from: "brands", localField: "product.brandId", foreignField: "_id", as: "brand"}
            },
            {$unwind: "$brand"},
            {$project:{_id: 0, userId: 0, productId: 0, createdAt: 0, updatedAt: 0, "product.categoryId": 0, "product.brandId": 0, "category._id":0, "brand._id": 0}},
        ])
         return {
             statusCode: 200,
             status: "success",
             message:"Request success",
             data: data
         }
    }
    catch (e) {
        return {
            statusCode: 500,
            status:"fail",
            message: 'Internal Server Error',
            error: e.message
        }
    }
}

export const deleteWishService = async (req)=>{
    try {
        const id = req.params.productId;
        const productId = new objId(id);
        const wishProduct = await WishModel.findOne({productId});
        if (!wishProduct) {
            return {
                statusCode: 404,
                status: "fail",
                message: 'Product not found',
            }
        }
        // delete wishes product from wish list
        await WishModel.deleteOne({productId});
        return {
            statusCode: 200,
            status: "success",
            message:"Request success",
        }

    }catch (e) {
        return {
            statusCode: 500,
            status:"fail",
            message: 'Internal Server Error',
            error: e.message
        }
    }
}