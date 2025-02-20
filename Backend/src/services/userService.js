import {OTP_EXPIRE_TIME, RANDOM_OTP, saltRounds} from "../../src/config/config.js";
import SendEmail from "../../src/utility/email.js";
import {createToken} from "../utility/token.js";
import mongoose from "mongoose";
import UserProfile from "../models/customers/profileModel.js";
import User from "../models/user/userModel.js";
import ProductReview from "../models/product/reviewModel.js";

// user registration service
export const registerService = async (req)=>{
    try {
        const reqBody = req.body;
        const user = await User.create(reqBody);

        if(user === null || user === undefined){
            return{
                statusCode: 401,
                status: "fail",
                message: "User not Created"
            }
        }
        return {
            statusCode: 201,
            status: "success",
            message: "User created",
            data: user
        }
    }
    catch (e) {
        return {
            statusCode: 500,
            status: "fail",
            message: "fail to create user",
            error: e.message
        }
    }
}

// user email verify
export const emailVerifyService = async (req)=>{
    try {
        const user_email = req.body.email;
        const user = await User.findOne({email: user_email});

        if (!user) {
            return {statusCode: 404, status: "fail", message: "User not found"};
        }
        else{
            const updateOTP = RANDOM_OTP;
            const expires = OTP_EXPIRE_TIME;
            await User.updateOne({email: user_email}, {$set:{otp: updateOTP, otpExpire: expires}}, {new: true});

            //otp send to email
            const subject = "Your OTP Verification Code";
            const text = `Your 6-digit OTP is ${updateOTP}. It is valid for 5 minutes.`;
            await SendEmail(user_email, subject, text);

            return {
                statusCode: 200,
                status: "success",
                message: `6-digit OTP sent your email address`,
            }
        }
    }
    catch (e) {
        return {
            statusCode: 500,
            status: "fail",
            message: "fail to sent OTP verification Code",
            error: e.message
        }
    }
}

// user login service
export const loginService = async (req)=>{
    try {
        const {email, otp} = req.body;
        const user = await User.findOne({email: email, otp: otp});

        if (!user) {
            return {statusCode: 404, status: "fail", message: "Invalid email or OTP"};
        }
        // Check OTP expiration
        if (user['otpExpire'] < Date.now()) {
            return { status: "fail", message: "OTP has expired. Please request a new one." };
        }
        else{
            const token = await createToken(user['email'], user['_id']);
            return{
                statusCode: 200,
                status: "success",
                message: "login successfully",
                token: token
            }
        }
    }
    catch (e) {
        return {
            statusCode: 500,
            status: "fail",
            message: "Internal Server Error",
            error: e.message
        }
    }
}


// user profile create and update service
export const saveProfileService = async (req)=>{

    try {
        const id = req.headers.id;
        const userId = new mongoose.Types.ObjectId(id);
        const reqBody = req.body;
        reqBody.userId = userId;
        const data = await UserProfile.updateOne({userId: userId}, {$set:reqBody}, {upsert: true})
        if(!data){
            return {
                statusCode: 404,
                status: "fail",
                message: "User not found"
            };
        }
        return {
            statusCode: 200,
            status: "success",
            message: "Save sucessfully"
        }


    }catch (e) {
        return {
            statusCode: 500,
            status: "fail",
            message: "fail to create profile",
            error: e.message
        }
    }

}

// user profile read service
export const readProfileService = async (req)=>{
   try {
       const userId = req.headers.id;
       const user = await UserProfile.find({userId: userId});

       if(user === null || user === undefined){
           return {statusCode: 404, status: "fail", message: "User not found"};
       }
       return {
           statusCode: 200,
           status: "success",
           message: "User Profile read successfully",
           data: user
       }
   }catch (e) {
       return {
           statusCode: 500,
           status: "fail",
           message: "Internal server Error",
           error: e.message
       }
   }
}

//create product review service
export const createReviewService = async (req)=>{
    try {
        const id = req.headers.id;
        const userId = new mongoose.Types.ObjectId(id);
        const productId = new mongoose.Types.ObjectId(req.params.productId);
        const reqBody = req.body;
        reqBody.userId = userId;
        reqBody.productId = productId;

        const data = await ProductReview.create(reqBody)

        if(data === null || data === undefined){
            return {
                statusCode: 401,
                status: "fail",
                message: "Review not Created"
            }
        }
        return {
            statusCode: 201,
            status: "success",
            message: "Review created successfully",
            data: data
        }
    }catch (e) {
        return {
            statusCode: 500,
            status: "fail",
            message: "fail to create review",
        }
    }
}