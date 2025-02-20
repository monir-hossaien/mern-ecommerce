import Feature from "../models/features/featuresModel.js";
import LegalModel from "../models/features/lagalModel.js";
//service function to create feature
export const featureCreateService = async (req)=>{
    try {
        const reqBody = req.body;
        const data = await Feature.create(reqBody);
        if(!data){
            return {
                statusCode: 404,
                status: "fail",
                message:"Failed to create feature",
            }
        }
        return {
            statusCode: 200,
            status: "success",
            message:"Successfully created feature",
            data: data
        }
    }
    catch (e) {
        return {
            statusCode: 404,
            status: "fail",
            message: "Internal Server Error",
            error: e.message
        }
    }
}

//service function to get all features list
export const featuresListService = async () => {
    try {
        const data = await Feature.find();
        if(!data){
            return {
                statusCode: 404,
                status: "fail",
                message:"Failed to find features list",
            }
        }
        return {
            statusCode: 200,
            status: "success",
            message:"Features list retrieved successfully",
            data: data
        }
    }
    catch (e) {
        return {
            statusCode: 404,
            status: "fail",
            message: "Internal Server Error",
            error: e.message
        }
    }
}


//service function to create legal
export const createLegalService = async (req)=>{
    try {
        const reqBody = req.body;
        const data = await LegalModel.create(reqBody);
        if(!data){
            return {
                statusCode: 404,
                status: "fail",
                message:"Failed to create legal",
            }
        }
        return {
            statusCode: 200,
            status: "success",
            message:"Successfully created legal",
            data: data
        }
    }
    catch (e) {
        return {
            statusCode: 404,
            status: "fail",
            message: "Internal Server Error",
            error: e.message
        }
    }
}

//service function to get all legal list
export const legalListService = async () => {
    try {
        const data = await LegalModel.find();
        if(!data){
            return {
                statusCode: 404,
                status: "fail",
                message:"Failed to retrieve legal",
            }
        }
        return {
            statusCode: 200,
            status: "success",
            message:"Legal list retrieved successfully",
            data: data
        }
    }
    catch (e) {
        return {
            statusCode: 404,
            status: "fail",
            message: "Internal Server Error",
            error: e.message
        }
    }
}