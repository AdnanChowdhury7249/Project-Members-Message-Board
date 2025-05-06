import express from 'express';
import passport, { authenticate } from 'passport';
import path from 'path';
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/login', passport.authenticate('local'), authController.login);
router.get('/logout', authController.logout);
router.get('/current-user', authController.getCurrentUser);



export default router;
