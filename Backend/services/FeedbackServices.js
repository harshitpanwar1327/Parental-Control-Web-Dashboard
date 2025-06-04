import {pool} from '../configs/Database.js'

export const insertFeedbackLogic = async (feedbackData) => {
    try {
        const query = `INSERT INTO feedback() VALUES (?,?,?,?,?,?,?)`;
        const value = [feedbackData.parentId, feedbackData.ticket_no, feedbackData.deviceID, feedbackData.issue_type, feedbackData.issue_desc, feedbackData.screenshot, feedbackData.urgency];
        await pool.query(query, value);

        return {success: true, message: "Feedback saved successfully"};
    } catch (error) {
        console.log(error);
        return {success: false, message: "Feedback not saved!"};
    }
}