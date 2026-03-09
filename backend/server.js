require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer Config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Database Connection
const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "jersey_ecommerce",
});

// Check DB Connection
db.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to database:", err);
  } else {
    console.log("Connected to MySQL database");
    connection.release();
  }
});

// --- API Routes ---

// Get All Products (with variants)
app.get('/api/products', (req, res) => {
    const query = `
        SELECT p.id, p.name, p.category, p.price, p.stock_home, p.stock_away,
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
                    stock_home: row.stock_home,
                    stock_away: row.stock_away,
                    image: row.image_url, // For simple display if no variants or first variant
                    variants: {}
                });
            }
            if (row.type) {
                productsMap.get(row.id).variants[row.type] = {
                    image: row.image_url,
                    description: row.description
                };
                // Fallback main image
                if (!productsMap.get(row.id).image) {
                     productsMap.get(row.id).image = row.image_url;
                }
            }
        });

        res.json(Array.from(productsMap.values()));
    });
});

// Create Product
app.post('/api/products', upload.fields([{ name: 'homeImage', maxCount: 1 }, { name: 'awayImage', maxCount: 1 }]), (req, res) => {
    const { name, category, price, stock_home, stock_away } = req.body;
    let homeImage = '';
    let awayImage = '';

    if (req.files && req.files['homeImage'] && req.files['homeImage'][0]) {
        homeImage = `http://localhost:${PORT}/uploads/${req.files['homeImage'][0].filename}`;
    }
    if (req.files && req.files['awayImage'] && req.files['awayImage'][0]) {
        awayImage = `http://localhost:${PORT}/uploads/${req.files['awayImage'][0].filename}`;
    }

    const query = 'INSERT INTO products (name, category, price, stock_home, stock_away) VALUES (?, ?, ?, ?, ?)';
    
    db.query(query, [name, category, price, stock_home || 0, stock_away || 0], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        const productId = result.insertId;

        // Add home variant if image uploaded
        if (homeImage) {
             const variantQuery = "INSERT INTO product_variants (product_id, type, image_url, description) VALUES (?, 'home', ?, 'Home Kit')";
             db.query(variantQuery, [productId, homeImage], (err) => {
                 if (err) console.error("Failed to add home variant", err);
             });
        }
        // Add away variant if image uploaded
        if (awayImage) {
             const variantQuery = "INSERT INTO product_variants (product_id, type, image_url, description) VALUES (?, 'away', ?, 'Away Kit')";
             db.query(variantQuery, [productId, awayImage], (err) => {
                 if (err) console.error("Failed to add away variant", err);
             });
        }

        res.status(201).json({ id: productId, name, category, price, homeImage, awayImage });
    });
});

// Update Product
app.put('/api/products/:id', upload.fields([{ name: 'homeImage', maxCount: 1 }, { name: 'awayImage', maxCount: 1 }]), (req, res) => {
    const { name, category, price, stock_home, stock_away } = req.body;
    const { id } = req.params;
    const query = 'UPDATE products SET name = ?, category = ?, price = ?, stock_home = ?, stock_away = ? WHERE id = ?';

    db.query(query, [name, category, price, stock_home || 0, stock_away || 0, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        let homeImage = '';
        let awayImage = '';

        if (req.files && req.files['homeImage'] && req.files['homeImage'][0]) {
            homeImage = `http://localhost:${PORT}/uploads/${req.files['homeImage'][0].filename}`;
        } else if (req.body.existingImage) {
            homeImage = req.body.existingImage;
        }

        if (req.files && req.files['awayImage'] && req.files['awayImage'][0]) {
            awayImage = `http://localhost:${PORT}/uploads/${req.files['awayImage'][0].filename}`;
        } else if (req.body.existingAwayImage) {
            awayImage = req.body.existingAwayImage;
        }

        // Helper to update or insert variant
        const upsertVariant = (type, imageUrl, description) => {
            if (!imageUrl) return;
            // Check if variant exists
            db.query("SELECT id FROM product_variants WHERE product_id = ? AND type = ?", [id, type], (err, results) => {
                if (err) {
                    console.error(`Failed to check ${type} variant for upsert`, err);
                    return;
                }
                if (results.length > 0) {
                    db.query("UPDATE product_variants SET image_url = ? WHERE product_id = ? AND type = ?", [imageUrl, id, type]);
                } else {
                    db.query("INSERT INTO product_variants (product_id, type, image_url, description) VALUES (?, ?, ?, ?)", [id, type, imageUrl, description]);
                }
            });
        };

        upsertVariant('home', homeImage, 'Home Kit');
        upsertVariant('away', awayImage, 'Away Kit');
        
        res.json({ message: 'Product updated successfully' });
    });
});

// Delete Product
app.delete('/api/products/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM products WHERE id = ?';

    db.query(query, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Product deleted successfully' });
    });
});

// Create Order
app.post("/api/orders", (req, res) => {
  const { customer, items, total } = req.body;

  // Transaction would be better here, but stick to simple logic for now
  const orderQuery = `
        INSERT INTO orders (customer_name, customer_email, address, city, postal_code, phone_number, total_amount)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

  db.query(
    orderQuery,
    [
      customer.firstName + " " + customer.lastName,
      customer.email,
      customer.address,
      customer.city,
      customer.postalCode,
      customer.phoneNumber,
      total,
    ],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });

      const orderId = result.insertId;

      // Insert Items
      const itemValues = items.map((item) => [
        orderId,
        item.name,
        item.variant,
        item.size,
        item.quantity,
        item.price,
      ]);

      const itemsQuery = `
                INSERT INTO order_items (order_id, product_name, variant_type, size, quantity, price)
                VALUES ?
            `;

      db.query(itemsQuery, [itemValues], (err, itemResult) => {
        if (err)
          return res
            .status(500)
            .json({ error: "Order created but items failed: " + err.message });

        // Deduct stock for each item
        items.forEach((item) => {
          if (item.productId) {
            const stockColumn = item.variant === 'away' ? 'stock_away' : 'stock_home';
            db.query(
              `UPDATE products SET ${stockColumn} = GREATEST(${stockColumn} - ?, 0) WHERE id = ?`,
              [item.quantity, item.productId],
              (updateErr) => {
                if (updateErr) console.error("Failed to update stock for product:", item.productId, updateErr);
              }
            );
          }
        });

        res
          .status(201)
          .json({ message: "Order created successfully", orderId });
      });
    }
  );
});

// Get All Orders
app.get("/api/orders", (req, res) => {
  const query = "SELECT * FROM orders ORDER BY created_at DESC";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Get Single Order with Items
app.get("/api/orders/:id", (req, res) => {
  const orderId = req.params.id;
  const orderQuery = "SELECT * FROM orders WHERE id = ?";
  const itemsQuery = "SELECT * FROM order_items WHERE order_id = ?";

  db.query(orderQuery, [orderId], (err, orderResults) => {
    if (err) return res.status(500).json({ error: err.message });
    if (orderResults.length === 0)
      return res.status(404).json({ error: "Order not found" });

    const order = orderResults[0];

    db.query(itemsQuery, [orderId], (err, itemsResults) => {
      if (err) return res.status(500).json({ error: err.message });

      order.items = itemsResults;
      res.json(order);
    });
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
