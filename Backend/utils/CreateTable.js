import {pool} from '../configs/Database.js'

const users_table = `CREATE TABLE IF NOT EXISTS users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

const createTable = async (tableName, query) => {
    try {
        await pool.query(query);
        console.log(`${tableName} table created successfully or already exists`);
    } catch (error) {
        console.log(`${tableName} table not created!`, error);
    }
}

const createAllTables = async () => {
    try {
        await createTable("Users", users_table);
        console.log("All tables created successfully");
    } catch (error) {
        console.log("Table not created!", error);
    }
}

export default createAllTables;