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

export const updateSettingsLogic = async (settingsData) => {
    try {
        const query = `INSERT INTO settings(parentId, notifications) VALUES(?,?)`;
        const values = [settingsData.parentId, settingsData.notifications];
        await pool.query(query, values);

        return {success: true, message: "Settings fetched successfully!"}
    } catch (error) {
        console.log(error);
        return {success: false, message: "Failed to load settings!"};
    }
}