const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const db = require("./models/db");
dotenv.config();

const app = express();
const authController = require("./controllers/authController");
// Enable CORS — MUST be before all routes
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json()); // must be after cors

// Swagger
const { swaggerUi, swaggerSpec } = require("./swagger/swaggerConfig");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/auth", require("./routes/authRoute"));
app.use("/admin", require("./routes/admin.routes"));
app.use("/otp", require("./routes/OtpRoute"));
app.use("/canteen", require("./routes/canteenRoute"));
app.use("/employee", require("./routes/employeeRoute"));

app.get("/users/pending", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id, name, email FROM users WHERE status = 'pedding'"
    );
    res.json(rows);
  } catch (err) {
    console.error("Error fetching pending users:", err); // <-- log the actual error
    res
      .status(500)
      .json({ message: "Failed to fetch users", error: err.message });
  }
});

// Start server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
