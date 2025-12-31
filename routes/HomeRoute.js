import App from './App.js';
import {Home} from '../controllers/HomeController.js';
import express from 'express';

const router = express.Router();

router.get( '/', HomeController);

export default router;