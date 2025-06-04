import { ControlsModels } from '../models/ControlsModels.js'
import { getControlLogic, updateControlLogic } from '../services/ControlsServices.js'

export const getControl = async (req, res) => {
    const {childId} = req.params;

    if(!childId) return res.status(400).json({success: false, message: "ChildId cannot be undefined!"});

    try {
        let response = await getControlLogic(childId);
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

export const updateControl = async (req, res) => {
    const {childId} = req.params;
    const {app_blocked_list, screen_limit, bedTime_start, bedTime_end, internet_access} = req.body;

    if(!childId) return res.status(400).json({success: false, message: "ChildId cannot be undefined!"});

    const controlsData = new ControlsModels({childId, app_blocked_list, screen_limit, bedTime_start, bedTime_end, internet_access});

    try {
        let response = await updateControlLogic(controlsData);
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