export class DevicesModels {
    constructor(devicesData) {
        this.device_name = devicesData.device_name,
        this.os = devicesData.os,
        this.mac_address = devicesData.mac_address,
        this.ip_address = devicesData.ip_address,
        this.disc_serial = devicesData.disc_serial,
        this.license = devicesData.license
    }
}