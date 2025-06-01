import mysql2 from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config();

export const pool = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    connectionLimit: 10,
    queueLimit: 5,
    waitForConnections: true
})

export const checkConnection = async () => {
    try {
        const connection = await pool.getConnection();
        console.log("Database connected Successfully");
        connection.release();
    } catch (error) {
        console.log("Database connection lost! Database not connected!", error);
    }
}