import {createSliderService} from "../services/sliderService.js";

export const createSlider = async (req, res) => {
    try {
        const result = await createSliderService(req);
        return res.status(200).json(result);
    }
    catch (e) {
        return res.json({status:"fail","Message":e.toString()})
    }
}