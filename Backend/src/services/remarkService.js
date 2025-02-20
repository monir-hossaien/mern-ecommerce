//create remark service
import Remark from "../models/product/remarkModel.js";

export const createRemarkService = async (req)=>{
    try {
        const reqBody = req.body;
        const data = await Remark.create(reqBody);
        return {statusCode: 200, status: "success", message: 'Request Success', data: data}
    }
    catch (error) {
        return {statusCode: 500, message: 'Internal server error', error: error.message};
    }

}

//remark list
export const remarkListService = async ()=>{
    try {
        const data = await Remark.find();
        return {statusCode: 200, status: "success", message: 'Request Success', data: data}
    }
    catch (error) {
        return {statusCode: 500, message: 'Internal server error', error: error.message};
    }

}