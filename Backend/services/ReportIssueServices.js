import {pool} from '../configs/Database.js'

export const insertIssueLogic = async (issueData) => {
    try {
        const query = `INSERT INTO report_issue(parentId, ticket_no, deviceId, issue_type, issue_desc, screenshot, urgency) VALUES (?,?,?,?,?,?,?)`;
        const value = [issueData.parentId, issueData.ticket_no, issueData.deviceId, issueData.issue_type, issueData.issue_desc, issueData.screenshot, issueData.urgency];
        await pool.query(query, value);

        return {success: true, message: "Issue Reported Successfully"};
    } catch (error) {
        console.log(error);
        return {success: false, message: "Issue not reported!"};
    }
}