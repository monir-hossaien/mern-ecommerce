import {generateOTPExpireTime, generateOTP} from "../config/config.js";
import {createToken} from "../utility/token.js";
import mongoose from "mongoose";
import UserProfile from "../models/user/profileModel.js";
import User from "../models/user/userModel.js";
import ProductReview from "../models/product/reviewModel.js";
import {emailData} from "../Helpers/emailTamplate.js";
import SendEmail from "../utility/email.js";

// user registration service
export const registerService = async (req)=>{
    try {
        const reqBody = req.body;
        if(req.file){
            reqBody.profileImage = req.file?.path ||"";
        }
        //check user exit or not
        const existingUser = await User.findOne({email: reqBody.email})
        if(existingUser){
            return{
                statusCode: 400,
                status: "fail",
                message: "User already exists"
            }
        }
        const user = await User.create(reqBody);
        if(!user){
            return{
                statusCode: 400,
                status: "fail",
                message: "Request failed"
            }
        }
        return {
            statusCode: 201,
            status: "success",
            message: "Request success",
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
        const profile = await UserProfile.findOne().select("name")
        if (!user) {
            return {statusCode: 404, status: "fail", message: "User not found"};
        }
        else{
            const updateOTP = generateOTP();
            const expires = generateOTPExpireTime();
            await User.updateOne({email: user_email}, {$set:{otp: updateOTP, otpExpire: expires}}, {new: true});

            //otp send to email
            const subject = "Your OTP Verification Code";
            const emailBody = emailData(profile?.name, updateOTP);
            await SendEmail(user_email, subject, emailBody);

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
            await User.updateOne({email}, {$set:{otp: null}});
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
                statusCode: 400,
                status: "fail",
                message: "Request failed"
            };
        }
        return {
            statusCode: 201,
            status: "success",
            message: "Save successfully"
        }


    }catch (e) {
        return {
            statusCode: 500,
            status: "fail",
            message: "Something went wrong!",
            error: e.message
        }
    }

}

// user profile read service
export const readProfileService = async (req)=>{
   try {
       const userId = new mongoose.Types.ObjectId(req.headers.id);
       const profile = await UserProfile.findOne({userId: userId});
       return {
           statusCode: 200,
           status: "success",
           message: "Request success",
           data: profile
       }
   }catch (e) {
       return {
           statusCode: 500,
           status: "fail",
           message: "Something went wrong!",
           error: e.message
       }
   }
}

//user details
export const readUserService = async (req)=>{
    try {
        const userId = new mongoose.Types.ObjectId(req.headers.id);
        const user = await User.findOne({_id: userId});
        if(user === null || user === undefined){
            return {statusCode: 400, status: "fail", message: "User not found"};
        }
        return {
            statusCode: 200,
            status: "success",
            message: "Request success",
            data: user
        }
    }catch (e) {
        return {
            statusCode: 500,
            status: "fail",
            message: "Something went wrong!",
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