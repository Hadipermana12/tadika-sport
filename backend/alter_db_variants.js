const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "jersey_ecommerce",
});

db.query("ALTER TABLE products CHANGE stock stock_home INT DEFAULT 0", (err) => {
    if (err) console.error("Error changing stock to stock_home:", err);
    else console.log("Changed stock to stock_home.");

    db.query("ALTER TABLE products ADD COLUMN stock_away INT DEFAULT 0", (err2) => {
        if (err2) console.error("Error adding stock_away:", err2);
        else console.log("Added stock_away column.");
        process.exit();
    });
});
