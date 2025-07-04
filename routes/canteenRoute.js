const express = require('express')
const router = express.Router();

const canteenController = require('../controllers/canteenController')
const { verifyToken } = require('../middleWare/authMiddleware')

/**
 * @swagger
 * /canteen/products:
 *   post:
 *     summary: Add a new product by canteen
 *     tags: [Canteen]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - image
 *               - quantity
 *             properties:
 *               name:
 *                 type: string
 *                 example: Veg Sandwich
 *               image:
 *                  type: string
 *                  example: http://example.com/image.jpg
 *               price:
 *                 type: number
 *                 example: 40
 *               quantity :
 *                 type: number
 *                 example: 50
 *     responses:
 *       201:
 *         description: Product added successfully
 *       400:
 *         description: Missing required fields
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access denied (not canteen)
 *       500:
 *         description: Server error
 */
// Add Product Route
router.post(
  "/products",
  verifyToken,
  canteenController.addProduct
);

module.exports = router;  