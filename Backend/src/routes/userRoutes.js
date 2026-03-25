const express = require('express');
const router = express.Router();

const userController = require('../controllers/authController');

const verifyToken = require('../middlewares/authMiddleware');

router.get('/me', verifyToken, userController.findUserById);

module.exports = router;

