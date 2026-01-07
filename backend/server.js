require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
const db = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'jersey_ecommerce',
});

// Check DB Connection
db.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to database:', err);
    } else {
        console.log('Connected to MySQL database');
        connection.release();
    }
});

// --- API Routes ---

// Get All Products (with variants)
app.get('/api/products', (req, res) => {
    const query = `
        SELECT p.id, p.name, p.category, p.price,
               v.type, v.image_url, v.description
        FROM products p
        LEFT JOIN product_variants v ON p.id = v.product_id
    `;

    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        // Transform flat SQL results into nested structure
        const productsMap = new Map();

        results.forEach(row => {
            if (!productsMap.has(row.id)) {
                productsMap.set(row.id, {
                    id: row.id,
                    name: row.name,
                    category: row.category,
                    price: row.price,
                    variants: {}
                });
            }
            if (row.type) {
                productsMap.get(row.id).variants[row.type] = {
                    image: row.image_url,
                    description: row.description
                };
            }
        });

        res.json(Array.from(productsMap.values()));
    });
});

// Create Order
app.post('/api/orders', (req, res) => {
    const { customer, items, total } = req.body;

    // Transaction would be better here, but stick to simple logic for now
    const orderQuery = `
        INSERT INTO orders (customer_name, customer_email, address, city, postal_code, phone_number, total_amount)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(orderQuery,
        [customer.firstName + ' ' + customer.lastName, customer.email, customer.address, customer.city, customer.postalCode, customer.phoneNumber, total],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });

            const orderId = result.insertId;

            // Insert Items
            const itemValues = items.map(item => [
                orderId, item.name, item.variant, item.size, item.quantity, item.price
            ]);

            const itemsQuery = `
                INSERT INTO order_items (order_id, product_name, variant_type, size, quantity, price)
                VALUES ?
            `;

            db.query(itemsQuery, [itemValues], (err, itemResult) => {
                if (err) return res.status(500).json({ error: 'Order created but items failed: ' + err.message });

                res.status(201).json({ message: 'Order created successfully', orderId });
            });
        }
    );
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
