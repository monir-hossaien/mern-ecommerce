//create remark
import {createRemarkService, remarkListService} from "../services/remarkService.js";

//create remark
export const createRemark = async (req, res) => {
    const result = await createRemarkService(req)
    return res.status(result.statusCode).json(result);
}

//get remark list
export const remarkList = async (req, res) => {
    const result = await remarkListService()
    return res.status(result.statusCode).json(result);
}
