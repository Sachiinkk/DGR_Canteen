const express = require('express')
const router = express.Router()
const OtpController = require('../controllers/OTP/otpController')



/**
 * @swagger
 * tags:
 *   name: OTP
 *   description: OTP-based mobile verification
 */

/**
 * @swagger
 * /otp/send-otp:
 *   post:
 *     summary: Send OTP to user's mobile number using Firebase
 *     tags: [OTP]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - mobile
 *             properties:
 *               mobile:
 *                 type: string
 *                 example: "9721830891"
 *     responses:
 *       200:
 *         description: OTP sent or frontend trigger message
 *       400:
 *         description: Mobile number is missing
 */
router.post('/send-otp', OtpController.sendOtp);

/**
 * @swagger
 * /otp/verify-otp:
 *   post:
 *     summary: Verify OTP via Firebase ID token
 *     tags: [OTP]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idToken
 *               - mobile
 *             properties:
 *               idToken:
 *                 type: string
 *                 example: "eyJhbGciOiJSUzI1NiIsInR5cCI6..."
 *               mobile:
 *                 type: string
 *                 example: "9721830891"
 *     responses:
 *       200:
 *         description: User already exists
 *       201:
 *         description: User verified and added successfully
 *       400:
 *         description: Missing token or mobile
 *       401:
 *         description: Invalid phone number
 *       500:
 *         description: OTP verification failed
 */


router.post('/verify-otp', OtpController.verifyOtp);

module.exports = router;

