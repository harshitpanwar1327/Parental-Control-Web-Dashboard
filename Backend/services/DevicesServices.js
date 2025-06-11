import {pool} from '../configs/Database.js'

export const registerDeviceLogic = async (deviceData) => {
    try {
        const query = `INSERT INTO devices(device_name, os, mac_address, ip_address, disk_serial, license) VALUES (?,?,?,?,?,?)`;
        const values = [deviceData.device_name, deviceData.os, deviceData.mac_address, deviceData.ip_address, deviceData.disk_serial, deviceData.license];
        await pool.query(query, values);

        return {success: true, message: "Device registered successfully"};
    } catch (error) {
        console.log(error);
        return {success: false, message: "Device not registered!"};
    }
}

export const manageDevicesLogic = async (license, childId) => {
    try {
        let [row] = await pool.query(`SELECT * FROM devices WHERE license = ? AND (childId = ? || childId IS NULL)`, [license, childId]);

        return {success: true, message: "Devices fetched successfully", data: row};
    } catch (error) {
        console.log(error);
        return {success: false, message: "Unable to fetch devices!"};
    }
}

export const updateDeviceLogic = async (childId, id) => {
    try {
        const query = `UPDATE devices SET childId = ? WHERE id = ?`;
        const values = [childId, id];
        await pool.query(query, values);

        return {success: true, message: ""};
    } catch (error) {
        console.log(error);
        return {success: false, message: "Device not allocated to any child!"};
    }
}

export const getDevicesLogic = async (license) => {
    try {
        let [row] = await pool.query(`SELECT * FROM devices WHERE license = ?`, license);

        return {success: true, message: "Devices fetched successfully", data: row};
    } catch (error) {
        console.log(error);
        return {success: false, message: "Unable to fetch devices!"};
    }
}