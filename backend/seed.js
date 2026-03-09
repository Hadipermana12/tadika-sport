
const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'jersey_ecommerce',
});

const products = [
    {
        name: "Manchester United 24/25",
        price: 1200000,
        category: "Premier League",
        variants: {
            home: { image: "https://cdn.media.amplience.net/i/frasersdev/37782208_o?fmt=auto&upscale=false&w=345&h=345&sm=c&$h-ttl$" },
            away: { image: "https://cdn.media.amplience.net/i/frasersdev/36739718_o?fmt=auto&upscale=false&w=767&h=767&sm=scaleFit&$h-ttl$" }
        }
    },
    {
        name: "Arsenal 24/25",
        price: 1180000,
        category: "Premier League",
        variants: {
            home: { image: "https://cdn.media.amplience.net/i/frasersdev/36741108_o?fmt=auto&upscale=false&w=345&h=345&sm=c&$h-ttl$" },
            away: { image: "https://cdn.media.amplience.net/i/frasersdev/37783118_o?fmt=auto&upscale=false&w=345&h=345&sm=c&$h-ttl$" }
        }
    },
    {
        name: "Liverpool 24/25",
        price: 1180000,
        category: "Premier League",
        variants: {
            home: { image: "https://cdn.shoplightspeed.com/shops/611228/files/63515014/650x750x2/nike-liverpool-24-25-home-jersey-red.jpg" },
            away: { image: "https://cdn.shoplightspeed.com/shops/611228/files/65698591/650x750x2/nike-liverpool-24-25-away-jersey-dark-green.jpg" }
        }
    },
    {
        name: "Manchester City 24/25",
        price: 1180000,
        category: "Premier League",
        variants: {
            home: { image: "https://cdn.shoplightspeed.com/shops/611228/files/73136162/650x750x2/puma-manchester-city-25-26-home-jersey-blue.jpg" },
            away: { image: "https://cdn.shoplightspeed.com/shops/611228/files/73136668/650x750x2/puma-manchester-city-25-26-away-jersey-black.jpg" }
        }
    },
    {
        name: "Real Madrid 24/25",
        price: 1300000,
        category: "La Liga",
        variants: {
            home: { image: "https://cdn.media.amplience.net/i/frasersdev/36823401_o?fmt=auto&upscale=false&w=345&h=345&sm=c&$h-ttl$" },
            away: { image: "https://cdn.media.amplience.net/i/frasersdev/36739112_o?fmt=auto&upscale=false&w=345&h=345&sm=c&$h-ttl$" }
        }
    },
    {
        name: "Barcelona 24/25",
        price: 1250000,
        category: "La Liga",
        variants: {
            home: { image: "https://cdn.media.amplience.net/i/frasersdev/37717818_o?fmt=auto&upscale=false&w=345&h=345&sm=c&$h-ttl$" },
            away: { image: "https://cdn.media.amplience.net/i/frasersdev/37602201_o?fmt=auto&upscale=false&w=345&h=345&sm=c&$h-ttl$" }
        }
    },
    {
        name: "Juventus 24/25",
        price: 1150000,
        category: "Serie A",
        variants: {
            home: { image: "https://cdn.media.amplience.net/i/frasersdev/37893103_o?fmt=auto&upscale=false&w=345&h=345&sm=c&$h-ttl$" },
            away: { image: "https://cdn.media.amplience.net/i/frasersdev/36823113_o?fmt=auto&upscale=false&w=345&h=345&sm=c&$h-ttl$" }
        }
    },
    {
        name: "AC Milan 24/25",
        price: 1100000,
        category: "Serie A",
        variants: {
            home: { image: "https://cdn.media.amplience.net/i/frasersdev/37762808_o?fmt=auto&upscale=false&w=345&h=345&sm=c&$h-ttl$" },
            away: { image: "https://cdn.media.amplience.net/i/frasersdev/37765613_o?fmt=auto&upscale=false&w=345&h=345&sm=c&$h-ttl$" }
        }
    }
];

const seed = async () => {
    console.log("Seeding products...");

    db.getConnection((err, connection) => {
        if (err) {
            console.error("Error getting connection:", err);
            return;
        }

        connection.query("SET FOREIGN_KEY_CHECKS = 0", (err) => {
            if (err) console.error("Error disabling FK:", err);

            const tables = ['order_items', 'orders', 'product_variants', 'products'];
            let completed = 0;

            const checkDone = () => {
                completed++;
                if (completed === tables.length) {
                    connection.query("SET FOREIGN_KEY_CHECKS = 1", () => {
                        console.log("Cleanup complete. Starting inserts...");
                        connection.release(); // Release this connection
                        insertProducts(); // Proceed to inserts using the pool
                    });
                }
            };

            tables.forEach(table => {
                connection.query(`TRUNCATE TABLE ${table}`, (err) => {
                    if (err) {
                        console.error(`Error truncating ${table}:`, err);
                        // Fallback to DELETE if TRUNCATE fails (e.g. strict mode)
                        connection.query(`DELETE FROM ${table}`, (err) => {
                            if (err) console.error(`Error deleting ${table}:`, err);
                            checkDone();
                        });
                    } else {
                        checkDone();
                    }
                });
            });
        });
    });

    function insertProducts() {
        for (const product of products) {
            const query = 'INSERT INTO products (name, category, price) VALUES (?, ?, ?)';
            db.query(query, [product.name, product.category, product.price], (err, result) => {
                if (err) {
                    console.error("Error inserting", product.name, err.message);
                } else {
                    const productId = result.insertId;
                    
                    // Home Variant
                    const homeVariantQuery = "INSERT INTO product_variants (product_id, type, image_url, description) VALUES (?, 'home', ?, 'Default Home Kit')";
                    db.query(homeVariantQuery, [productId, product.variants.home.image], (err) => {
                         if (err) console.error("Error inserting home variant", err.message);
                    });

                    // Away Variant
                    if (product.variants.away) {
                        const awayVariantQuery = "INSERT INTO product_variants (product_id, type, image_url, description) VALUES (?, 'away', ?, 'Default Away Kit')";
                        db.query(awayVariantQuery, [productId, product.variants.away.image], (err) => {
                             if (err) console.error("Error inserting away variant", err.message);
                        });
                    }
                    console.log(`Inserted ${product.name}`);
                }
            });
        }
    }
};

seed();
