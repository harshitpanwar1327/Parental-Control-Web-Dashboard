export class FeedbackModels {
    constructor(feedbackData) {
        this.parentId = feedbackData.parentId,
        this.ticket_no = feedbackData.ticket_no,
        this.deviceID = feedbackData.deviceID,
        this.issue_type = feedbackData.issue_type,
        this.issue_desc = feedbackData.issue_desc,
        this.screenshot = feedbackData.screenshot,
        this.urgency = feedbackData.urgency
    }
}