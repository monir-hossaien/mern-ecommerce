import mongoose from "mongoose";
import CartModel from "../models/product/cartModel.js";

export const addToCartService = async (req) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.headers.id);
    const productId = new mongoose.Types.ObjectId(req.params.productId);
    const reqBody = req.body;
    reqBody.userId = userId;
    reqBody.productId = productId;
    const existingItem = await CartModel.findOne({userId, productId})
    if (existingItem) {
      existingItem.quantity += 1;
      await existingItem.save();
      return {
        statusCode: 200,
        status: "success",
        message: "Product quantity updated",
        data: existingItem,
      };
    }

    const data = await CartModel.create(reqBody);

    if (!data) {
      return {
        statusCode: 404,
        status: "fail",
        message: "Request failed",
      };
    }
    return {
      statusCode: 200,
      status: "success",
      message: "Request success",
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
    const userId = new mongoose.Types.ObjectId(req.headers.id);
    const cartId = new mongoose.Types.ObjectId(req.params.cartId);
    const reqBody = req.body;
    const data = await CartModel.updateOne({_id: cartId, userId: userId}, {$set: reqBody});
    if (!data) {
      return {
        statusCode: 400,
        status: "fail",
        message: "Request failed",
      };
    }
    return {
      statusCode: 200,
      status: "success",
      message: "Request success",
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
    const cartId = new mongoose.Types.ObjectId(req.params?.cartId); // Ensure cartId exists
    if (!cartId) {
      return {
        statusCode: 400,
        status: "fail",
        message: "Cart ID is required",
      };
    }

    // Check if the cart item exists
    const cartItem = await CartModel.findById(cartId);
    if (!cartItem) {
      return {
        statusCode: 404,
        status: "fail",
        message: "Cart item not found",
      };
    }

    // Delete the cart item
    await CartModel.deleteOne({ _id: cartId });

    return {
      statusCode: 200,
      status: "success",
      message: "Request success",
    };
  } catch (e) {
    return {
      statusCode: 500,
      status: "fail",
      message: "Internal Server Error",
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
          userId: 0,
          productId: 0,
          createdAt: 0,
          updatedAt: 0,
          "product.categoryId": 0,
          "product.brandId": 0,
          "category._id": 0,
          "category.categoryImg": 0,
          "category.createdAt": 0,
          "category.updatedAt": 0,
          "brand._id": 0,
          "brand.brandImg": 0,
          "brand.createdAt": 0,
          "brand.updatedAt": 0,
        },
      },
    ]);

    return {
      statusCode: 200,
      status: "success",
      message: "Request success",
      data: data,
    };
  } catch (e) {
    return {
      statusCode: 500,
      status: "success",
      message: "Something went wrong!",
      error: e.message,
    };
  }
};
