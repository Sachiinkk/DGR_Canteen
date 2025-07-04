// models/db.js

const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});



(async () => {
  try {
    const [rows] = await db.query("SELECT 1 + 1 AS result");
    console.log(`✅ MySQL Connected. Test Query Result: ${rows[0].result}`);
  } catch (err) {
    console.error("❌ MySQL Connection Failed:", err.message);
  }
})();
module.exports = db
