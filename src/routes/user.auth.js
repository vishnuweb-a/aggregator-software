import router from 'express'
import multer from 'multer'
import { loginUser, registerUser,validateAndMarkStatus ,logoutUser ,  forgotPassword ,verifyOtpForForgotPassword ,changePassword, getMe, updateProfile } from '../controller/auth.controller.js'

const authRouter = router()
const upload = multer({ storage: multer.memoryStorage() })

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
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
 *               - phoneNumber
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               phoneNumber:
 *                 type: number
 *     responses:
 *       201:
 *         description: User created successfully (unverified) and OTP sent
 *       400:
 *         description: Bad request (missing fields, invalid email, user exists, etc.)
 */
authRouter.post('/register',registerUser)

/**
 * @swagger
 * /api/auth/validate:
 *   post:
 *     summary: Validate user OTP
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - otp
 *             properties:
 *               email:
 *                 type: string
 *               otp:
 *                 type: number
 *     responses:
 *       200:
 *         description: User verified successfully
 *       400:
 *         description: Invalid OTP or user not found
 */
authRouter.post('/validate',validateAndMarkStatus)

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login an existing user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Bad request (missing fields or wrong password)
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
authRouter.post('/login',loginUser)

/**
 * @swagger
 * /api/auth/logout:
 *   delete:
 *     summary: Logout the current user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: User logged out successfully
 *       500:
 *         description: Internal server error
 */
authRouter.delete('/logout',logoutUser)

/**
 * @swagger
 * /api/auth/forgotpassword:
 *   post:
 *     summary: Request OTP for password reset
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP sent successfully
 *       404:
 *         description: User not found or email missing
 *       500:
 *         description: Internal server error
 */
authRouter.post('/forgotpassword',forgotPassword)

/**
 * @swagger
 * /api/auth/verifyotp:
 *   post:
 *     summary: Verify OTP for password reset
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - otp
 *             properties:
 *               email:
 *                 type: string
 *               otp:
 *                 type: number
 *     responses:
 *       200:
 *         description: OTP verified successfully
 *       400:
 *         description: Invalid OTP
 *       500:
 *         description: Internal server error
 */
authRouter.post('/verifyotp',verifyOtpForForgotPassword)

/**
 * @swagger
 * /api/auth/changepassword:
 *   post:
 *     summary: Change user password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       404:
 *         description: User not found or password not updated
 *       500:
 *         description: Internal server error
 */
authRouter.post('/changepassword',changePassword)

authRouter.get('/me', getMe)
authRouter.put('/profile', upload.single('photo'), updateProfile)

export default authRouter