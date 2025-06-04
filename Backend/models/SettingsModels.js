export class SettingsModels {
    constructor(settingsData) {
        this.parentId = settingsData.parentId,
        this.notifications = settingsData.notifications
    }
}