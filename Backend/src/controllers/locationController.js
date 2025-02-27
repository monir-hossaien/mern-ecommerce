import {
    createDistrictService,
    createDivisionService,
    createPostService,
    createUnionService, districtListService, divisionListService, postListService
} from "../services/locationService.js";


export const createDivision = async (req, res) => {
    const result = await createDivisionService(req);
    return res.status(result.statusCode).json(result);
}

export const divisionList = async (req, res) => {
    const result = await divisionListService(req);
    return res.status(result.statusCode).json(result);
}


export const createDistrict = async (req, res) => {
    const result = await createDistrictService(req);
    return res.status(result.statusCode).json(result);
}

export const districtList = async (req, res) => {
    const result = await districtListService(req);
    return res.status(result.statusCode).json(result);
}

export const createPost = async (req, res) => {
    const result = await createPostService(req);
    return res.status(result.statusCode).json(result);
}

export const postList = async (req, res) => {
    const result = await postListService(req);
    return res.status(result.statusCode).json(result);
}

export const createUnion = async (req, res) => {
    const result = await createUnionService(req);
    return res.status(result.statusCode).json(result);
}