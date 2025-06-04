import {pool} from '../configs/Database.js'

export const getChildrenLogic = async () => {
    try {
        let [rows] = await pool.query(`SELECT * FROM children;`);

        return {success: true, message: "Children data fetched successfully", data: rows};
    } catch (error) {
        console.log(error);
        return {success: false, message: "Failed to fetch children data!"};
    }
}

export const insertChildLogic = async (childrenData) => {
    try {
        let query = `INSERT INTO children(parentId, name, age, imageFileName) VALUES(?,?,?,?)`;
        let values = [childrenData.parentId, childrenData.name, childrenData.age, childrenData.imageFileName];
        await pool.query(query, values);

        return {success: true, message: "Child profile added successfully"};
    } catch (error) {
        console.log(error);
        return {success: false, message: "Failed to insert child data!"};
    }
}

export const getChildLogic = async (childId) => {
    try {
        const [rows] = await pool.query(`SELECT * FROM children WHERE id = ?`, [childId]);

        return {success: true, message: "Child data fetched successfully", data: rows};
    } catch (error) {
        console.log(error);
        return {success: false, message: "Failed to fetch child data!"};
    }
}

export const updateChildLogic = async (childId, childrenData) => {
    try {
        let query = `UPDATE children SET name = ?, age = ?, imageFileName = ?  WHERE id = ?`;
        let values = [childrenData.name, childrenData.age, childrenData.imageFileName, childId];
        await pool.query(query, values);

        return {success: true, message: "Child profile updated successfully"};
    } catch (error) {
        console.log(error);
        return {success: false, message: "Failed to update child data!"};
    }
}

export const deleteChildLogic = async (childId) => {
    try {
        const query = `DELETE FROM children WHERE id = ?`;
        const values = [childId];
        await pool.query(query, values);

        return {success: true, message: "Child profile deleted successfully"};
    } catch (error) {
        console.log(error);
        return {success: false, message: "Failed to delete the child profile!"};
    }
}