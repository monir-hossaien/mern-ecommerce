import Division from "../models/Location/devisionModel.js";
import mongoose from "mongoose";
import District from "../models/Location/districtModel.js";
import Post from "../models/Location/postModel.js";
import Union from "../models/Location/unionModel.js";

const objID = mongoose.Types.ObjectId;
//create division
export const createDivisionService = async (req)=>{
    try {
        const reqBody = req.body;
        const existingDivision = await Division.findOne({name: reqBody.name})
        if(existingDivision){
            return {
                status: "failed",
                statusCode: 400,
                message: "Division already exists"
            }
        }
        const newDivision = await Division.create(reqBody);
        return {
            statusCode: 201,
            status: "success",
            message:"Request success",
            data: newDivision
        }

    }
    catch (e) {
        return {
            statusCode: 500,
            status:"fail",
            message: 'Something went wrong',
            error: e.message
        };
    }
}


// all division list
export const divisionListService = async (req)=>{
    try {
        const divisionList = await Division.find()
        if(!divisionList){
            return {
                status: "failed",
                statusCode: 400,
                message: "Request failed"
            }
        }
        return {
            statusCode: 200,
            status: "success",
            message:"Request success",
            data: divisionList
        }

    }
    catch (e) {
        return {
            statusCode: 500,
            status:"fail",
            message: 'Something went wrong',
            error: e.message
        };
    }
}



//create district
export const createDistrictService = async (req)=>{
    try {
        const divisionID = new objID(req.params.divisionID);
        const reqBody = req.body;
        reqBody.divisionID = divisionID;

        const existingDistrict = await District.findOne({name: reqBody.name})
        if(existingDistrict){
            return {
                status: "failed",
                statusCode: 400,
                message: "District already exists"
            }
        }
        const newDistrict = await District.create(reqBody);
        return {
            statusCode: 201,
            status: "success",
            message:"Request success",
            data: newDistrict
        }

    }
    catch (e) {
        return {
            statusCode: 500,
            status:"fail",
            message: 'Something went wrong',
            error: e.message
        };
    }
}

// district list
export const districtListService = async (req)=>{
    try {
        const divisionID = new objID(req.params.divisionID);
        if(!divisionID){
            return {
                status: "failed",
                statusCode: 404,
                message: "Division not found"
            }
        }
        const districtList = await District.find({divisionID})

        if(districtList === null){
            return {
                status: "failed",
                statusCode: 400,
                message: "Request failed"
            }
        }
        return {
            statusCode: 200,
            status: "success",
            message:"Request success",
            data: districtList
        }

    }
    catch (e) {
        return {
            statusCode: 500,
            status:"fail",
            message: 'Something went wrong',
            error: e.message
        };
    }
}


//create post
export const createPostService = async (req)=>{
    try {
        const reqBody = req.body;
        const districtID = new objID(req.params.districtID);
        reqBody.districtID = districtID;
        const existingPost = await Post.findOne({name: reqBody.name})
        if(existingPost){
            return {
                status: "failed",
                statusCode: 400,
                message: "Post already exists"
            }
        }
        const newPost = await Post.create(reqBody);
        return {
            statusCode: 201,
            status: "success",
            message:"Request success",
            data: newPost
        }

    }
    catch (e) {
        return {
            statusCode: 500,
            status:"fail",
            message: 'Something went wrong',
            error: e.message
        };
    }
}

//post list
export const postListService = async (req)=>{
    try {
        const districtID = new objID(req.params.districtID);
        const postList = await Post.find({districtID})

        if(postList === null){
            return {
                status: "failed",
                statusCode: 400,
                message: "Request failed"
            }
        }
        return {
            statusCode: 200,
            status: "success",
            message:"Request success",
            data: postList
        }

    }
    catch (e) {
        return {
            statusCode: 500,
            status:"fail",
            message: 'Something went wrong',
            error: e.message
        };
    }
}

//create union
export const createUnionService = async (req)=>{
    try {
        const reqBody = req.body;
        const postID = new objID(req.params.id);
        reqBody.postID = postID;

        const existingUnion = await Union.findOne({name: reqBody.name})
        if(existingUnion){
            return {
                status: "failed",
                statusCode: 400,
                message: "Union already exists"
            }
        }
        const newUnion = await Union.create(reqBody);
        return {
            statusCode: 201,
            status: "success",
            message:"Request success",
            data: newUnion
        }

    }
    catch (e) {
        return {
            statusCode: 500,
            status:"fail",
            message: 'Something went wrong',
            error: e.message
        };
    }
}