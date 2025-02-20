import {
    getAllBrandsService,
    getAllCategoriesService,
    searchByBrandService,
    searchByCategoryService,
    searchByKeywordService,
    searchByRemarkService,
    SimilarProductsService,
    getAllProductsService,
    getSliderListService,
    readProductDetailService,
    createProductService,
    createBrandService,
    createCategoryService,
    createProductDetailsService, reviewListService
} from "../../src/services/productService.js";

// product create
export const createProduct = async (req, res) => {
    try {
        const result = await createProductService(req);
        res.status(201).json({
            status:"success",
            message:"product created successfully",
            data: result
        })
    }
    catch (e) {
        return res.json({status:"fail","Message":e.toString()})
    }
}

// brand create
export const createBrand = async (req, res) => {
    try {
        const result = await createBrandService(req);
        res.status(201).json({
            status:"success",
            message:"Brand created successfully",
            data: result
        })
    }
    catch (e) {
        return res.json({status:"fail","Message":e.toString()})
    }
}


// product category create
export const createCategory = async (req, res) => {
    try {
        const result = await createCategoryService(req);
        res.status(201).json({
            status:"success",
            message:" CategoryModel created successfully",
            data: result
        })
    }
    catch (e) {
        return res.json({status:"fail","Message":e.toString()})
    }
}


// product details create
export const createProductDetails = async (req, res) => {
    try {
        const result = await createProductDetailsService(req);
        return res.status(200).json(result);
    }
    catch (e) {
        return res.json({status:"fail","Message":e.toString()})
    }
}






//get all product category
export const getAllCategories = async (req, res) => {
    try {
        const result = await getAllCategoriesService()
        return res.status(200).json(result);

    }
    catch (e) {
        return res.json({status:"fail","Message":e.toString()})
    }


}

//get all product brands
export const getAllBrands = async (req, res) => {
    const result = await getAllBrandsService()
    return res.status(result.statusCode).json(result);
}
//get sliderList
export const getSliderList = async (req, res) => {
    const result = await getSliderListService()
    return res.status(result.statusCode).json(result);
}

//product list by category
export const productListByCategory = async (req, res) => {
    const result = await searchByCategoryService(req);
    return res.status(result.statusCode).json(result);
}

//product list by brand
export const productListByBrand = async (req, res) => {
    const result = await searchByBrandService(req);
    return res.status(result.statusCode).json(result);
}

//product list by keyword
export const productListByKeyword = async (req, res) => {
    const result = await searchByKeywordService(req);
    return res.status(result.statusCode).json(result);
}

//product list by remark
export const productListByRemark = async (req, res) => {
    const result = await searchByRemarkService(req);
    return res.status(result.statusCode).json(result);
}

//get similar products
export const getSimilarProducts = async (req, res) => {
    const result = await SimilarProductsService(req);
    return res.status(result.statusCode).json(result);
}

//get all products
export const getAllProducts = async (req, res) => {
    const result = await getAllProductsService();
    return res.status(result.statusCode).json(result);
}

//get product details
export const readProductDetails = async (req, res) => {
    const result = await readProductDetailService(req);
    return res.status(result.statusCode).json(result);
}

//get product review list
export const productReviewList = async (req, res) => {
    const result = await reviewListService(req);
    return res.status(result.statusCode).json(result);
}

