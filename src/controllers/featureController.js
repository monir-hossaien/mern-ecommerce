
import {featureCreateService, featuresListService, createLegalService, legalListService} from "../services/featureService.js";
//feature create
export const createFeature = async (req, res) => {
    const result = await featureCreateService(req)
    return res.status(result.statusCode).json(result);
}
// get all features list
export const getFeaturesList = async (req, res) => {
    const result = await featuresListService()
    return res.status(result.statusCode).json(result);
}

// create legal
export const createLegal = async (req, res) => {
    const result = await createLegalService(req)
    return res.status(result.statusCode).json(result);
}
// get all legal list
export const getLegalList = async (req, res) => {
    const result = await legalListService()
    return res.status(result.statusCode).json(result);
}