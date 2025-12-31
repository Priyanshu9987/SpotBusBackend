import express from 'express';
import {body} from 'express-validator';
import LoginController from '../controllers/LoginController.js';

const router = express.Router();

router.post ('/', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min:6 }).withMessage('Password must Contain atleast 6 characters')
], LoginController );

export default router;