import {registerDeviceLogic, manageDevicesLogic, getDevicesLogic, updateDeviceLogic} from '../services/DevicesServices.js'
import {DevicesModels} from '../models/DevicesModels.js'

export const registerDevice = async (req, res) => {
    const {device_name, os, mac_address, ip_address, disk_serial, license} = req.body;

    if(!device_name || !os || !disk_serial || !license) {
        return res.status(400).json({success: false, message: "Fill all the required fields!"})
    }

    const deviceData = new DevicesModels({device_name, os, mac_address, ip_address, disk_serial, license});

    try {
        let response = await registerDeviceLogic(deviceData);
        if(response.success) {
            return res.status(200).json(response);
        } else {
            return res.status(400).json(response);
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: "Internal Server Error"});
    }
}

export const manageDevices = async (req, res) => {
    const {license, childId} = req.body;

    try {
        let response = await manageDevicesLogic(license, childId);
        if(response.success) {
            return res.status(200).json(response);
        } else {
            return res.status(400).json(response);
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: "Internal Server Error"});
    }
}

export const updateDevice = async (req, res) => {
    const {childId, id} = req.body;

    if(!id) {
        return res.status(400).json({success: false, message: "Device id not found!"})
    }

    try {
        let response = await updateDeviceLogic(childId, id);
        if(response.success) {
            return res.status(200).json(response);
        } else {
            return res.status(400).json(response);
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: "Internal Server Error"});
    }
}

export const getDevices = async (req, res) => {
    const {license} = req.params;

    if(!license) {
        return res.status(400).json({success: false, message: "License not found!"});
    }

    try {
        let response = await getDevicesLogic(license);
        if(response.success) {
            return res.status(200).json(response);
        } else {
            return res.status(400).json(response);
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: "Internal Server Error"});
    }
}