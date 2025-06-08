import { SettingsModels } from '../models/SettingsModels.js'
import { getSettingsLogic, updateSettingsLogic } from '../services/SettingsServices.js'

export const getSettings = async (req, res) => {
    const {parentId} = req.params;

    if(!parentId) return res.status(400).json({success: false, message: "ParentId cannot be undefined!"});

    try {
        let response = await getSettingsLogic(parentId);
        if(response.success) {
            return res.status(200).json(response);
        } else {
            return res.status(400).json(response);
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: "Internal Server Error!"});
    }
}

export const updateSettings = async (req, res) => {
    const {parentId} = req.params;
    const {key, value} = req.body;

    if(!parentId) return res.status(400).json({success: false, message: "ParentId cannot be undefined!"});

    try {
        let response = await updateSettingsLogic(parentId, key, value);
        if(response.success) {
            return res.status(200).json(response);
        } else {
            return res.status(400).json(response);
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: "Internal Server Error!"});
    }
}