import {pool} from '../configs/Database.js'

const users_table = `CREATE TABLE IF NOT EXISTS users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    license VARCHAR(16) NOT NULL,
    expiry_date DATETIME NOT NULL,
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

const devices_table = `CREATE TABLE IF NOT EXISTS devices(
    id INT AUTO_INCREMENT PRIMARY KEY,
    childId INT,
    device_name VARCHAR(50) NOT NULL,
    os VARCHAR(50) NOT NULL,
    mac_address VARCHAR(20),
    ip_address VARCHAR(45),
    disc_serial VARCHAR(50) NOT NULL,
    license VARCHAR(16) NOT NULL,
    FOREIGN KEY (childId) REFERENCES devices(id) ON DELETE CASCADE
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
    app_alerts BOOLEAN DEFAULT TRUE,
    email_notifications BOOLEAN DEFAULT TRUE,
    offers_notifications BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (parentId) REFERENCES users(id) ON DELETE CASCADE
)`

const report_issue_table = `CREATE TABLE IF NOT EXISTS report_issue(
    id INT AUTO_INCREMENT PRIMARY KEY,
    parentId INT,
    ticket_no VARCHAR(36) NOT NULL,
    deviceId INT NOT NULL,
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
        await createTable("Devices", devices_table);
        await createTable("Activities", activity_table);
        await createTable("Controls", controls_table);
        await createTable("Settings", settings_table);
        await createTable("Report Issue", report_issue_table);
        console.log("All tables created successfully");
    } catch (error) {
        console.log("Table not created!", error);
    }
}

export default createAllTables;