import { ReportIssueModels } from '../models/ReportIssueModels.js'
import { insertIssueLogic } from '../services/ReportIssueServices.js'

export const insertIssue = async (req, res) => {
    const {parentId} = req.params;
    const {ticket_no, deviceId, issue_type, issue_desc, urgency} = req.body;
    const screenshot = req.file ? req.file.filename : null;

    if(!parentId || !ticket_no || !deviceId || !issue_type || !issue_desc) {
        return res.status(400).json({success: false, message: "Fill all the required fields"})
    }

    const issueData = new ReportIssueModels({parentId, ticket_no, deviceId, issue_type, issue_desc, screenshot, urgency});

    try {
        let response = await insertIssueLogic(issueData);
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