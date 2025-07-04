const express = require('express');
const router = express.Router();
const adminRouter = require('../controllers/adminController')
const {verifyToken , restrictTo} = require('../middleWare/authMiddleware')



/**
 * @swagger
 * /admin/allocate-coupons:
 *   post:
 *     summary: Allocate coupons to all employees
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               count:
 *                 type: integer
 *                 example: 40
 *     responses:
 *       200:
 *         description: Coupons allocated
 *       400:
 *         description: Invalid count
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access denied (not admin)
 *       500:
 *         description: Server error
 */

router.post('/allocate-coupons', verifyToken, adminRouter.allocateCoupons);


/**
 * @swagger
 * /admin/employee/{id}:
 *   delete:
 *     summary: Delete an employee by ID
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the employee to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Employee deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "✅ Employee deleted successfully"
 *       404:
 *         description: Employee not found
 *         content:
 *           application/json:
 *             example:
 *               message: "Employee not found"
 *       500:
 *         description: Server error
 */

  router.delete("/employee/:id", verifyToken, adminRouter.deleteEmployee);

/**
 * @swagger
 * /admin/canteen/{id}:
 *   delete:
 *     summary: Delete a canteen by ID
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the canteen to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Canteen deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "✅ Canteen deleted successfully"
 *       404:
 *         description: Canteen not found
 *         content:
 *           application/json:
 *             example:
 *               message: "Canteen not found"
 *       500:
 *         description: Server error
 */

router.delete("/canteen/:id", verifyToken, adminRouter.deleteCanteen);
module.exports = router;



/**
 * @swagger
 * /admin/addUsers:
 *   post:
 *     summary: Add a new user to the system
 *     tags: [Admin]
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
 *               - email
 *               - password
 *               - Designation
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: Password123
 *               Designation:
 *                 type: string
 *                 example: Manager
 *     responses:
 *       200:
 *         description: User added successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Canteen Added successfully"
 *       400:
 *         description: Bad Request (missing fields or user already exists)
 *         content:
 *           application/json:
 *             examples:
 *               MissingFields:
 *                 summary: Required fields are missing
 *                 value:
 *                   message: "All Field is require"
 *               UserExists:
 *                 summary: User already exists
 *                 value:
 *                   message: "Users Aleady exist"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               message: "An error occurred while adding the user"
 */

router.post("/addUsers" , verifyToken,adminRouter.addUsers)