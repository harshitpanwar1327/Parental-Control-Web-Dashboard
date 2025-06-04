import {pool} from '../configs/Database.js'

export const getControlLogic = async (childId) => {
    try {
        let [rows] = await pool.query(`SELECT * FROM controls WHERE childId = ?`, [childId]);

        return {success: true, message: "Controls fetched successfully", data: rows};
    } catch (error) {
        console.log(error);
        return {success: false, message: "Controls not found!"};
    }
}

export const updateControlLogic = async (controlsData) => {
    try {
        let query = `INSERT INTO controls(childId, app_blocked_list, screen_limit, bedtime_start, bedtime_end, internet_access) VALUES (?,?,?,?,?,?)`;
        let values = [controlsData.childId, controlsData.app_blocked_list, controlsData.screen_limit, controlsData.bedTime_start, controlsData.bedTime_end, controlsData.internet_access];
        await pool.query(query, values);

        return {success: true, message: "Controls saved successfully"};
    } catch (error) {
        console.log(error);
        return {success: false, message: "Controls not updated!"};
    }
}