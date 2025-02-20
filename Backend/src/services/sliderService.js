import productSlider from "../models/product/sliderModel.js";

export const createSliderService =async (req)=>{
    try {
        const reqBody = req.body;
        const data = await productSlider.create(reqBody);
        if(!data){
            return {status:"fail", message: 'Request failed.', data: data}
        }
        return {status:"success", message: 'Product slider create successfully', data: data}
    }
    catch (e) {
        return { error: e.message };
    }
}