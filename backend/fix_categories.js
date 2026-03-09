const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "jersey_ecommerce",
});

db.query(
    `UPDATE products SET category = 
        CASE 
            WHEN LOWER(category) = 'premier league' THEN 'Premier League'
            WHEN LOWER(category) = 'la liga' THEN 'La Liga'
            WHEN LOWER(category) = 'serie a' THEN 'Serie A'
            WHEN LOWER(category) = 'bundesliga' THEN 'Bundesliga'
            WHEN LOWER(category) = 'national team' THEN 'National Team'
            ELSE category
        END`, 
    (err, result) => {
        if (err) {
            console.error("Error updating categories:", err);
        } else {
            console.log("Categories updated successfully.");
        }
        process.exit();
    }
);
