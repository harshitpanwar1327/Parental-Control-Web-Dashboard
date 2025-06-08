import {pool} from '../configs/Database.js'

export const getSettingsLogic = async (parentId) => {
    try {
        const [rows] = await pool.query(`SELECT * FROM settings WHERE parentId = ?`, [parentId]);
        
        return {success: true, message: "Settings fetched successfully!", data: rows}
    } catch (error) {
        console.log(error);
        return {success: false, message: "Failed to load settings!"};
    }
}

export const updateSettingsLogic = async (parentId, key, value) => {
    try {
        await pool.query(`UPDATE settings SET ${key} = ${value} WHERE parentId = ${parentId}`);

        return {success: true, message: "Settings updated successfully!"}
    } catch (error) {
        console.log(error);
        return {success: false, message: "Failed to update settings!"};
    }
}