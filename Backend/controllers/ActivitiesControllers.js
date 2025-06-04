import { getActivitiesLogic, insertActivitiesLogic } from '../services/ActivitiesServices.js'
import {ActivitiesModels} from '../models/ActivitiesModels.js'

export const getActivities = async (req, res) => {
    const {childId} = req.params;

    if(!childId) return res.status(400).json({success: false, message: "ChildId cannot be undefined!"});

    try {
        let response = await getActivitiesLogic(childId);
        if(response.success) {
            return res.status(200).json(response);
        } else {
            return res.status(400).json(response);
        }
    } catch(error) {
        console.log(error);
        return res.status(500).json({success: false, message: "Internal Server Error"});
    }
}

export const insertActivities = async (req, res) => {
    const {childId} = req.params;
    const {activity_type, activity_desc, startTime, endTime} = req.body;

    if(!childId) return res.status(400).json({success: false, message: "ChildId cannot be undefined!"});

    const activitiesData = new ActivitiesModels({childId, activity_type, activity_desc, startTime, endTime});

    try {
        let response = await insertActivitiesLogic(activitiesData);
        if(response.success) {
            return res.status(200).json(response);
        } else {
            return res.status(400).json(response);
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: "Internal Server Error"});
    }
}