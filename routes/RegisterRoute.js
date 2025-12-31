import express from 'express';
import { body } from 'express-validator';
import RegisterController from '../controllers/RegisterController.js';

const router = express.Router();

router.post('/',
        [
            body('email').isEmail().withMessage(" Please Enter a valid Email"),
            body('password').isLength({ min:6 }).withMessage( " Password Cannot be less than 6 Characters"),
            body('name').isLength({ min: 3 }).withMessage('Name should not be greater than 3 characters'),
            body( 'phone').isLength({ min:10, max: 10 }).withMessage("Phone No. should be only 10 digits."),
            body ('plate').isLength({ min:5 }).withMessage( " Please the Valid Bus Number"),
            body('startingRoute').isString().withMessage("Only String is Available"),
            body('endingRoute').isString().withMessage("Only String available"),

        ], RegisterController );

export default router;

