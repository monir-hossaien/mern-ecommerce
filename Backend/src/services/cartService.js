import mongoose from "mongoose";
import CartModel from "../models/product/cartModel.js";

export const addToCartService = async (req) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.headers.id);
    const reqBody = req.body;
    reqBody.userId = userId;

    const data = await CartModel.create(reqBody);

    if (data == null || data === undefined) {
      return {
        statusCode: 404,
        status: "fail",
        message: "Product could not added in your cart list",
      };
    }
    return {
      statusCode: 200,
      status: "success",
      message: "Product added successfully",
      data: data,
    };
  } catch (e) {
    return {
      statusCode: 500,
      status: "fail",
      message: "Internal Server error",
      error: e.message,
    };
  }
};

export const updateCartService = async (req) => {
  try {
    const userId = req.headers.id
    const cartId = req.params.id;
    const reqBody = req.body;
    

    const data = await CartModel.updateOne({_id: cartId, userId: userId}, {$set: reqBody});

    if (data == null || data === undefined) {
      return {
        statusCode: 404,
        status: "fail",
        message: "Cart not updated",
      };
    }
    return {
      statusCode: 200,
      status: "success",
      message: "Cart updated successfully"
    };
  } catch (e) {
    return {
      statusCode: 500,
      status: "fail",
      message: "Internal Server error",
      error: e.message,
    };
  }
};

export const deleteCartService = async (req) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.headers.id);
    const reqBody = req.body;
    reqBody.userId = userId;

    const data = await CartModel.deleteOne(reqBody);

    if (data == null || data === undefined) {
      return {
        statusCode: 401,
        status: "fail",
        message: "Product could not delete from your cart list",
      };
    }
    return {
      statusCode: 200,
      status: "success",
      message: "Product delete successfully from your cart list",
      data: data,
    };
  } catch (e) {
    return {
      statusCode: 500,
      status: "fail",
      message: "Internal Server error",
      error: e.message,
    };
  }
};

export const cartListService = async (req) => {
  try {
    const id = req.headers.id;
    const userId = new mongoose.Types.ObjectId(id);
    const data = await CartModel.aggregate([
      {
        $match: { userId: userId },
      },
      //join with products collection
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "product",
        },
      },
      { $unwind: "$product" },
      //join with categories collection
      {
        $lookup: {
          from: "categories",
          localField: "product.categoryId",
          foreignField: "_id",
          as: "category",
        },
      },
      { $unwind: "$category" },
      //join with brands collection
      {
        $lookup: {
          from: "brands",
          localField: "product.brandId",
          foreignField: "_id",
          as: "brand",
        },
      },
      { $unwind: "$brand" },
      {
        $project: {
          _id: 0,
          userId: 0,
          productId: 0,
          createdAt: 0,
          updatedAt: 0,
          "product.categoryId": 0,
          "product.brandId": 0,
          "category._id": 0,
          "brand._id": 0,
        },
      },
    ]);

    return {
      statusCode: 200,
      status: "success",
      message: "Wish list get successfully",
      data: data,
    };
  } catch (e) {
    return {
      statusCode: 500,
      status: "success",
      message: "Internal server error",
      error: e.message,
    };
  }
};
