import {pool} from '../configs/Database.js'

const users_table = `CREATE TABLE IF NOT EXISTS users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

const children_table = `CREATE TABLE IF NOT EXISTS children(
    id INT AUTO_INCREMENT PRIMARY KEY,
    parentId INT,
    name VARCHAR(100) NOT NULL,
    age INT,
    imageFileName VARCHAR(255),
    FOREIGN KEY (parentId) REFERENCES users(id) ON DELETE CASCADE
)`

const activity_table = `CREATE TABLE IF NOT EXISTS activities(
    id INT AUTO_INCREMENT PRIMARY KEY,
    childId INT,
    activity_type VARCHAR(50),
    activity_desc TEXT,
    startTime DATETIME,
    endTime DATETIME,
    FOREIGN KEY (childId) REFERENCES children(id) ON DELETE CASCADE
)`

const controls_table = `CREATE TABLE IF NOT EXISTS controls(
    id INT AUTO_INCREMENT PRIMARY KEY,
    childId INT,
    app_blocked_list TEXT,
    screen_limit INT,
    bedTime_start TIME,
    bedTime_end TIME,
    internet_access BOOLEAN,
    FOREIGN KEY (childId) REFERENCES children(id) ON DELETE CASCADE
)`

const settings_table = `CREATE TABLE IF NOT EXISTS settings(
    id INT AUTO_INCREMENT PRIMARY KEY,
    parentId INT,
    notifications BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (parentId) REFERENCES users(id) ON DELETE CASCADE
)`

const feedback_table = `CREATE TABLE IF NOT EXISTS feedback(
    id INT AUTO_INCREMENT PRIMARY KEY,
    parentId INT,
    ticket_no VARCHAR(36) NOT NULL,
    deviceID INT NOT NULL,
    issue_type VARCHAR(255) NOT NULL,
    issue_desc VARCHAR(255) NOT NULL,
    screenshot VARCHAR(100),
    urgency VARCHAR(10),
    FOREIGN KEY (parentId) REFERENCES users(id) ON DELETE CASCADE
)`

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
        await createTable("Children", children_table);
        await createTable("Activities", activity_table);
        await createTable("Controls", controls_table);
        await createTable("Settings", settings_table);
        await createTable("Feedback", feedback_table);
        console.log("All tables created successfully");
    } catch (error) {
        console.log("Table not created!", error);
    }
}

export default createAllTables;