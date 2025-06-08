import {pool} from '../configs/Database.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();

export const registerUserLogic = async (userData) => {
    try {
        const hash_password = await bcrypt.hash(userData.password, 10);
        const query = `INSERT INTO users(name, email, password, license, expiry_date) VALUES(?,?,?,?,?)`;
        const values = [userData.name, userData.email, hash_password, userData.license, userData.expiry_date];
        await pool.query(query, values);

        let [rows] = await pool.query(`SELECT * FROM users WHERE email = ?`, userData.email);

        await pool.query(`INSERT INTO settings(parentId, app_alerts, email_notifications, offers_notifications) VALUES (?,?,?,?)`, [rows[0].id, true, true, true]);

        return {success: true, message: "User registered in the database successfully"};
    } catch (error) {
        console.log(error);
        return {success: false, message: "Something went wrong while registering data in database!"}
    }
}

export const loginUserLogic = async (email, password) => {
    try {
        const [userRow] = await pool.query(`SELECT * FROM users WHERE email = ?`, [email]);
        if(userRow.length == 0) {
            return {success: false, message: "User not found!"}
        }

        const verifyPassword = userRow[0].password;
        const confirmPassword = await bcrypt.compare(password, verifyPassword);
        if(!confirmPassword) {
            return {success: false, message: "Invalid credentials!"}
        }

        const token = jwt.sign(
            {id: userRow[0].id, email: userRow[0].email},
            process.env.JWT_SECRET,
            {expiresIn: '3hr'}
        )

        return {success: true, message: "User login successfully", token: token, parentId: userRow[0].id};
    } catch (error) {
        console.log(error);
        return {success: false, message: "Something went wrong while fetching user data in database!"};
    }
}

export const getLicenseLogic = async (parentId) => {
    try {
        const [rows] = await pool.query(`SELECT license, expiry_date FROM users WHERE id = ?`, [parentId]);

        return {success: true, message: "User login successfully", data: rows};
    } catch (error) {
        console.log(error);
        return {success: false, message: "Could not find the license!"};
    }
}