import {pool} from '../configs/Database.js'

export const getActivitiesLogic = async (childId) => {
    try {
        const [rows] = await pool.query(`SELECT * FROM activities WHERE childId = ?`, [childId]);

        return {success: true, message: "Activities data fetched successfully", data: rows};
    } catch (error) {
        console.log(error);
        return {success: false, message: "Failed to load activities data!"};
    }
}

export const insertActivitiesLogic = async (activitiesData) => {
    try {
        const query = `INSERT INTO activities(childId, activity_type, activity_desc, startTime, endTime)
            VALUES (?,?,?,?,?)`;
        const values = [activitiesData.childId, activitiesData.activity_type, activitiesData.activity_desc, activitiesData.startTime, activitiesData.endTime];
        await pool.query(query, values);

        return {success: true, message: "Activities data added successfully"};
    } catch (error) {
        console.log(error);
        return {success: false, message: "Failed to insert activities data!"};
    }
}