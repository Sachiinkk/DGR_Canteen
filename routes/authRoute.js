const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const { verifyToken, restrictTo } = require("../middleWare/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User authentication and approval
 */

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Register a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password , Designation , status]
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               Designation:
 *                  type: string
 * 
 *     responses:
 *       201:
 *         description: User registered
 *       400:
 *         description: Missing fields or invalid role
 */
router.post("/signup", authController.signup);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Logged in with token
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", authController.login);

/**
 * @swagger
 * /auth/approve-user/{id}:
 *   put:
 *     summary: Approve a pending user (admin only)
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user to approve
 *     responses:
 *       200:
 *         description: User approved
 *       403:
 *         description: Forbidden (not admin)
 *       404:
 *         description: User not found
 */
router.put(
  "/approve-user/:id",
  verifyToken,
  authController.approve
);

// Fallback route
router.use((req, res) => {
  return res.status(404).json({
    message: `Route ${req.originalUrl} with method ${req.method} not found`,
  });
});




module.exports = router;
