export class ControlsModels {
    constructor(controlsData) {
        this.childId = controlsData.childId,
        this.app_blocked_list = controlsData.app_blocked_list,
        this.screen_limit = controlsData.screen_limit,
        this.bedTime_start = controlsData.bedTime_start,
        this.bedTime_end = controlsData.bedTime_end,
        this.internet_access = controlsData.internet_access
    }
}