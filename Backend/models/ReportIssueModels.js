export class ReportIssueModels {
    constructor(IssueData) {
        this.parentId = IssueData.parentId,
        this.ticket_no = IssueData.ticket_no,
        this.deviceId = IssueData.deviceId,
        this.issue_type = IssueData.issue_type,
        this.issue_desc = IssueData.issue_desc,
        this.screenshot = IssueData.screenshot,
        this.urgency = IssueData.urgency
    }
}