
const express = require("express");
const router = express.Router();

const {verifyToken,restrictTo} = require('../middleWare/authMiddleware')
const employeeController = require('../controllers/employeeController')




/**
 * @swagger
 * /employee/buy:
 *   post:
 *     summary: Purchase a product using coupons
 *     tags: [Employee]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: integer
 *                 example: 2
 *               quantity:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       200:
 *         description: Purchase successful
 *       400:
 *         description: Invalid input or not enough coupons
 *       403:
 *         description: Unauthorized or user not approved
 *       500:
 *         description: Internal server error
 */


router.post("/buy",verifyToken,employeeController.buyProduct);

module.exports = router;
