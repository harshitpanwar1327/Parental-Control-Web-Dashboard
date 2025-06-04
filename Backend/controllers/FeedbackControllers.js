import { FeedbackModels } from '../models/FeedbackModels.js'
import { insertFeedbackLogic } from '../services/FeedbackServices.js'

export const insertFeedback = async (req, res) => {
    const {parentId} = req.params;
    const {ticket_no, deviceID, issue_type, issue_desc, screenshot, urgency} = req.body;

    if(!parentId || !ticket_no || !deviceID || !issue_type || !issue_desc) {
        return res.status(400).json({success: false, message: "Fill all the required fields"})
    }

    const feedbackData = new FeedbackModels({parentId, ticket_no, deviceID, issue_type, issue_desc, screenshot, urgency});

    try {
        let response = await insertFeedbackLogic(feedbackData);
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