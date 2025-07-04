const db = require("../models/db");

exports.buyProduct = async (req, res) => {
  const userId = req.user.id; 
  const { productId, quantity } = req.body;

  if (!productId || !quantity || quantity < 1) {
    return res.status(400).json({ message: "Product ID and quantity are required" });
  }

  try {
    const [userRows] = await db.query(
      "SELECT * FROM users WHERE id = ? AND Designation = 'employee' AND status = 'approved'",
      [userId]
    );
    if (!userRows.length) {
      return res.status(403).json({ message: "Access denied" });
    }
    const employee = userRows[0];

    const [productRows] = await db.query("SELECT * FROM products WHERE id = ?", [productId]);
    if (!productRows.length) {
      return res.status(404).json({ message: "Product not found" });
    }
    const product = productRows[0];

    const totalCost = product.price * quantity;

    if (employee.coupons < totalCost) {
      return res.status(400).json({ message: "Insufficient coupons" });
    }

    await db.query("UPDATE users SET coupons = coupons - ? WHERE id = ?", [totalCost, userId]);

    // await db.query(
    //   "INSERT INTO purchases (user_id, product_id, quantity, total_coupons) VALUES (?, ?, ?, ?)",
    //   [userId, productId, quantity, totalCost]
    // );

    res.status(200).json({
      message: "✅ Purchase successful",
      remainingCoupons: employee.coupons - totalCost,
    });
  } catch (err) {
    console.error("❌ Purchase error:", err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};
