export class SettingsModels {
    constructor(settingsData) {
        this.parentId = settingsData.parentId,
        this.app_alerts = settingsData.app_alerts,
        this.email_notifications = settingsData.email_notifications,
        this.offers_notifications = settingsData.offers_notifications
    }
}