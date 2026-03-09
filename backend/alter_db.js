const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'jersey_ecommerce',
});

const alterQuery = "ALTER TABLE products ADD COLUMN stock INT DEFAULT 0;";

db.query(alterQuery, (err, result) => {
    if (err) {
        if (err.code === 'ER_DUP_FIELDNAME') {
            console.log("Column 'stock' already exists.");
        } else {
            console.error("Error altering table:", err);
        }
    } else {
        console.log("Successfully added 'stock' column to products table.");
    }
    process.exit(0);
});
