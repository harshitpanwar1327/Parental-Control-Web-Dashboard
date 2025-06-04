export class ActivitiesModels {
    constructor(activitiesData) {
        this.childId = activitiesData.childId,
        this.activity_type = activitiesData.activity_type;
        this.activity_desc = activitiesData.activity_desc;
        this.startTime = activitiesData.startTime;
        this.endTime = activitiesData.endTime;
    }
}