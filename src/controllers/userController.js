import {
    createReviewService,
    saveProfileService,
    emailVerifyService,
    loginService, readProfileService,
    registerService, readUserService
} from "../services/userService.js"

import {COOKIE_EXPIRE_TIME} from "../config/config.js";
import User from "../models/user/userModel.js";

export const userRegistration = async (req, res) => {
    const result = await registerService(req)
    return res.status(result.statusCode).json(result)
}

// email verify
export const emailSent = async (req, res) => {
    const result = await emailVerifyService(req);
    return res.status(result.statusCode).json(result);
}

// user login
export const login = async (req, res) => {
    const result = await loginService(req);
    if (result.status === "success") {
        // Create cookie options
        const cookieOptions = {
            httpOnly: true,
            secure: true, // Always true on Vercel
            partitioned: true,
            sameSite: "none", // Required for cross-origin requests
            maxAge: COOKIE_EXPIRE_TIME,
            path: "/"
        };


        // Ensure token is valid
        if (!result.token) {
            return res.status(500).json({ status: "error", message: "Token not generated" });
        }

        // Set user access token in res cookie
        res.cookie('token', result.token, cookieOptions);

        return res.json(result);
    } else {
        return res.status(401).json(result); // Handle login failure
    }
};

// user logout
export const logout = async (req, res) => {

    try {
        const userId = req.headers.id;
        const user = await User.find({_id: userId});
        if(user === null || user === undefined) {
            return res.status(404).json({
                status: "fail",
                message: "No user found. Please login first"
            })
        }
        res.clearCookie('token');
        return res.status(200).json({
            status: "success",
            message: "Logged out successfully",
        });
    }
    catch (e) {
        res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        })
    }

}

// create profile
export const createProfile = async (req, res) => {
    const result = await saveProfileService(req);
    return res.status(result.statusCode).json(result);
}

// update profile
export const updateProfile = async (req, res) => {
    const result = await saveProfileService(req);
    return res.status(result.statusCode).json(result);
}

//read profile
export const readProfile = async (req, res) => {
    const result = await readProfileService(req);
    return res.status(result.statusCode).json(result);
}

//read user
export const readUser = async (req, res) => {
    const result = await readUserService(req);
    return res.status(result.statusCode).json(result);
}

//create product review
export const createReview = async (req, res) => {
    const result = await createReviewService(req);
    return res.status(result.statusCode).json(result);
}