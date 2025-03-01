import Product from "../models/product/productModel.js";
import Brand from "../models/product/brandModel.js";
import Category from "../models/product/categoryModel.js";
import productDetails from "../models/product/productDetailsModel.js";
import ProductSlider from "../models/product/sliderModel.js";
import ProductReview from "../models/product/reviewModel.js";
import mongoose from "mongoose";
import Remark from "../models/product/remarkModel.js";
const objId = mongoose.Types.ObjectId;

//product create
export const createProductService = async (req)=>{
    try {
        const reqBody = req.body;
        const data = await Product.create(reqBody);
        return {status: "success", message: 'product created', data: data}
    }
    catch (error) {
        return {statusCode: 500, message: 'Internal server error', error: error.message};
    }

}

// product brand create
export const createBrandService = async (req)=>{
    try {
        const reqBody = req.body;
        const data = await Brand.create(reqBody);
        return {status: "success", message: 'Category created', data: data}
    }
    catch (error) {
        return {statusCode: 500, message: 'Internal server error', error: error.message};
    }

}

// product category create
export const createCategoryService = async (req)=>{
    try {
        const reqBody = req.body;
        const data = await Category.create(reqBody);
        return {status: "success", message: 'Category created', data: data}
    }
    catch (error) {
        return {statusCode: 500, message: 'Internal server error', error: error.message};
    }

}

// product details
export const createProductDetailsService = async (req)=>{
    try {
        const reqBody = req.body;
        const data = await productDetails.create(reqBody);
        return {status:"success", message: `Product details create successfully`, data: data}
    }
    catch (error) {
        return {statusCode: 500, message: 'Internal server error', error: error.message};
    }
}





// Service function to get all product categories
export const getAllCategoriesService = async () => {
    try {
        const categories = await Category.find();
        if (!categories) {
            return { status: "fail", message: "No categories found", data: [] };
        }
        return { status: "success", message: "All categories retrieved successfully", data: categories };
    } catch (error) {
        return { status: "error", message: "Failed to retrieve categories", error: error.message };
    }
};

// Service function to get all product brands
export const getAllBrandsService = async () => {
    try {
        const brands = await Brand.find();
        if (!brands) {
            return { statusCode: 404, status: "fail", message: "No brands found", data: [] };
        }
        return { statusCode: 200, status: "success", message: "All brands retrieved successfully", data: brands };
    } catch (error) {
        return { statusCode: 500, status: "error", message: "Failed to retrieve brands", error: error.message };
    }

};

// Service function to get all product sliders
export const getSliderListService = async ()=>{
    try {
        const data = await ProductSlider.find();
        if(data === null || data === undefined) {
            return { statusCode: 404, status: "fail", message: "No Slider found", data: [] };
        }
        return {statusCode: 200, status: "success", message: "All sliders retrieved successfully", data: data}
    }
    catch (e) {
        return {statusCode: 500, message: 'Failed to retrieve sliders', error: e.message};
    }
}

// Service function to get a product list by category
export const searchByCategoryService = async (req) => {
    try {
        const catId = new objId(req.params.catId);

        const matchStage = {$match:{categoryId: catId}}
        const joinWithCategories = {$lookup: {from: "categories", localField: "categoryId", foreignField: "_id", as: "Category"}}
        const joinWithBrands = {$lookup: {from: "brands", localField: "brandId", foreignField: "_id", as: "Brand"}}

        const projection = {
            $project:{
                categoryID:0,
                brandID:0,
                "Category._id": 0,
                "Brand._id": 0,
                "Category.createdAt": 0,
                "Category.updatedAt": 0,
                "Brand.createdAt": 0,
                "Brand.updatedAt": 0

            }
        }
        const pipeline = [
            matchStage,
            joinWithCategories,
            {$unwind:"$Category"},
            joinWithBrands,
            {$unwind:"$Brand"},
            projection
        ]
        const products = await Product.aggregate(pipeline);
        if (!products || products.length === 0) {
            return {
                statusCode: 404,
                status: "fail",
                message: "No products found for this category",
                data: [],
            };
        }
        return {
            statusCode: 200,
            status: "success",
            message: "Products retrieved successfully",
            data: products,
        };
    } catch (error) {
        return {
            statusCode: 500,
            status: "error",
            message: "Failed to retrieve products",
            error: error.message,
        };
    }

};

// Service function to get a product list by brand
export const searchByBrandService = async (req) => {
    try {
        const brandId = new objId(req.params.brandId);

        const matchStage = {$match:{brandId: brandId}}
        const joinWithBrands = {$lookup: {from: "brands", localField: "brandId", foreignField: "_id", as: "Brand"}}
        const joinWithCategories = {$lookup: {from: "categories", localField: "categoryId", foreignField: "_id", as: "Category"}}
        const projection = {
            $project:{
                categoryID:0,
                brandID:0,
                "Category._id": 0,
                "Brand._id": 0,
                "Category.createdAt": 0,
                "Category.updatedAt": 0,
                "Brand.createdAt": 0,
                "Brand.updatedAt": 0

            }
        }

        const pipeline = [matchStage, joinWithBrands, {$unwind:"$Brand"}, joinWithCategories, {$unwind:"$Category"}, projection]

        const products = await Product.aggregate(pipeline);
        if (!products || products.length === 0) {
            return {statusCode: 404, status: "fail", message: "No products found for this Brand", data: [],};
        }
        return {statusCode: 200, status: "success", message: "Products retrieved successfully", data: products,
        };
    } catch (error) {
        return {statusCode: 500, status: "error", message: "Failed to retrieve products", error: error.message,
        };
    }

};

// Service function to get a product list by keyword
export const searchByKeywordService = async (req) => {
    try {
        const keyword = req.params.keyword;
        const searchRegex = new RegExp(keyword, "i");

        const matchStage = {
            $match: {
                $or: [
                    { title: searchRegex },
                    { shortDescription: searchRegex },
                    { remark: searchRegex }
                ]
            }
        };

        const joinWithBrands = {$lookup: {from: "brands", localField: "brandId", foreignField: "_id", as: "Brand"}}
        const joinWithCategories = {$lookup: {from: "categories", localField: "categoryId", foreignField: "_id", as: "Category"}}
        const projection = {
            $project:{
                categoryId:0,
                brandId:0,
                "Category._id": 0,
                "Brand._id": 0,
                "Category.createdAt": 0,
                "Category.updatedAt": 0,
                "Brand.createdAt": 0,
                "Brand.updatedAt": 0

            }
        }

        const pipeline = [matchStage, joinWithBrands, {$unwind:"$Brand"}, joinWithCategories, {$unwind:"$Category"}, projection]

        const products = await Product.aggregate(pipeline);
        if (!products || products.length === 0) {
            return {statusCode: 404, status: "fail", message: "No products found with this keyword"};
        }
        return {statusCode: 200, status: "success", message: "Products retrieved successfully", data: products,
        };
    } catch (error) {
        return {statusCode: 500, status: "error", message: "Failed to retrieve products", error: error.message,
        };
    }
};

// Service function to get a product list by remark
export const searchByRemarkService = async (req) => {
    try {
        const remark = req.params.remark;
        const searchRegex = new RegExp(remark, "i");
        const matchStage = {$match:{remark: searchRegex}};

        const joinWithBrands = {$lookup: {from: "brands", localField: "brandId", foreignField: "_id", as: "Brand"}}
        const joinWithCategories = {$lookup: {from: "categories", localField: "categoryId", foreignField: "_id", as: "Category"}}
        const projection = {
            $project:{
                categoryID:0,
                brandID:0,
                "Category._id": 0,
                "Brand._id": 0,
                "Category.createdAt": 0,
                "Category.updatedAt": 0,
                "Brand.createdAt": 0,
                "Brand.updatedAt": 0

            }
        }

        const pipeline = [matchStage, joinWithBrands, {$unwind:"$Brand"}, joinWithCategories, {$unwind:"$Category"}, projection]

        const products = await Product.aggregate(pipeline);
        if (!products || products.length === 0) {
            return {statusCode: 404, status: "fail", message: "No products found with this remark", data: [],};
        }
        return {statusCode: 200, status: "success", message: "Products retrieved successfully", data: products,
        };
    } catch (error) {
        return {statusCode: 500, status: "error", message: "Failed to retrieve products", error: error.message,
        };
    }

};

// Service function to get similar products
export const SimilarProductsService = async (req) => {
    try {
        const catId = new objId(req.params.catId);
        const matchStage = {$match:{categoryId: catId}};
        const limit = {$limit:10};
        const joinWithCategories = {$lookup: {from: "categories", localField: "categoryId", foreignField: "_id", as: "Category"}}
        const joinWithBrands = {$lookup: {from: "brands", localField: "brandId", foreignField: "_id", as: "Brand"}}

        const projection = {
            $project:{
                categoryID:0,
                brandID:0,
                "Category._id": 0,
                "Brand._id": 0,
                "Category.createdAt": 0,
                "Category.updatedAt": 0,
                "Brand.createdAt": 0,
                "Brand.updatedAt": 0

            }
        }
        const pipeline = [
            matchStage,
            limit,
            joinWithCategories,
            {$unwind:"$Category"},
            joinWithBrands,
            {$unwind:"$Brand"},
            projection
        ]
        const products = await Product.aggregate(pipeline);
        if (!products || products.length === 0) {
            return {
                statusCode: 404,
                status: "fail",
                message: "No products found for this category",
                data: [],
            };
        }
        return {
            statusCode: 200,
            status: "success",
            message: "Products retrieved successfully",
            data: products,
        };
    } catch (error) {
        return {
            statusCode: 500,
            status: "error",
            message: "Failed to retrieve products",
            error: error.message,
        };
    }

};

// Service function to get all products
export const getAllProductsService = async () => {
    try {
        const data = await Product.aggregate([
            {
                $lookup:{
                    from: "brands",
                    localField: "brandId",
                    foreignField: "_id",
                    as: "Brand",
                }
            },
            {$unwind:"$Brand"},
            {
                $lookup:{
                    from: "categories",
                    localField: "categoryId",
                    foreignField: "_id",
                    as: "Category",
                }
            },
            {$unwind:"$Category"},
            {
                $project:{
                    categoryID:0,
                    brandID:0,
                    "Category._id": 0,
                    "Brand._id": 0,
                    "Category.createdAt": 0,
                    "Category.updatedAt": 0,
                    "Brand.createdAt": 0,
                    "Brand.updatedAt": 0

                }
            }
        ]);
        if(data === null || data === undefined) {
            return {statusCode: 404, status: "fail", message: "No products found", data: []};
        }
        return {statusCode: 200, status: "success", message: "Products retrieved successfully", data: data};
    }catch (e) {
        return {
            statusCode: 500,
            status: "error",
            message: "Failed to retrieve products",
            error: e.message,
        }
    }
};

// Service function to get product details
export const readProductDetailService = async (req) => {
    try {
        const id = req.params.productId;
        const productId = new objId(id);
        const product = await Product.aggregate([
            {$match:{_id: productId}},
            {
                $lookup:{
                    from: "categories",
                    localField: "categoryId",
                    foreignField: "_id",
                    as: "category",
                }
            },
            {$unwind:"$category"},
            {
                $lookup:{
                    from: "brands",
                    localField: "brandId",
                    foreignField: "_id",
                    as: "brand",
                }
            },
            {$unwind:"$brand"},
            {
                $lookup:{
                    from: "productdetails",
                    localField: "_id",
                    foreignField: "productId",
                    as: "productDetails",
                }
            },

            {$unwind:"$productDetails"},

            {
                $project:{
                    categoryId:0,
                    brandId:0,
                    "Category._id": 0,
                    "Brand._id": 0,
                    "Category.createdAt": 0,
                    "Category.updatedAt": 0,
                    "Brand.createdAt": 0,
                    "Brand.updatedAt": 0
                }
            }
        ])

        if (!product || product.length === 0) {
            return {
                statusCode: 404,
                status: "fail",
                message: "No product found",
            };
        }
        return {
            statusCode: 200,
            status: "success",
            message: "Request Success",
            data: product,
        };
    }catch (e) {
        return {
            statusCode: 500,
            status: "error",
            message: "Request failed",
            error: e.message,
        };
    }
};

// Service function to get product review list
export const reviewListService = async (req)=>{
    try {
        const id = req.params.productId;
        const productId = new objId(id);

        const matchStage = {$match:{productId: productId}}

        // join with profile collection
        const joinWithProfile = {
            $lookup:{
                from: "profiles",
                localField: "userId",
                foreignField: "userId",
                as: "profile",
            }
        }
        // join with user collection
        const joinWithUser = {
            $lookup:{
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "user",
            }
        }
        const projection ={
            $project:{
                description: 1,
                rating: 1,
                createdAt: 1,
                "profile.name": 1,
                "user.profileImage": 1
            }
        }
        const pipeline = [
            matchStage,
            joinWithProfile,
            {$unwind:"$profile"},
            joinWithUser,
            {$unwind:"$user"},
            projection
        ]
        const data = await ProductReview.aggregate(pipeline)
        if (data === null || data === undefined) {
            return {statusCode: 404, status: "fail", message: "No product found"};
        }
        return {
            statusCode: 200,
            status: "success",
            message: "Request success",
            data: data
        }
    }catch (e) {
        return {
            statusCode: 500,
            status: "fail",
            message: "Something went wrong!",
            error: e.message,
        }
    }
}