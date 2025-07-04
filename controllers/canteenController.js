const db = require('../models/db')


exports.addProduct = async (req, res) => {
  const { name, image , price, quantity } = req.body;
  if (!name || !price) {
    return res.status(400).json({ message: "Name and price are required" });
  }

  try {
    await db.query(
      "INSERT INTO products ( name, image, price, quantity) VALUES (?, ?, ?, ?)",
      [name, image, price, quantity]
    );

    res.status(201).json({ message: "✅ Product added successfully" });
  } catch (err) {
    console.error("Error adding product:", err);
    res.status(500).json({ message: "❌ Server error", error: err.message });
  }
};


