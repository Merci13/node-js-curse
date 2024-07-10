const path = require('path');

const express = require('express');

const authController = require('../controllers/auth');

const router = express.Router();


router.get('/login',authController.getLogin);
router.get('/signup',authController.getSignup);


router.post('/login', authController.postLogin);
router.post('/logout', authController.postLogout);
router.post('/signup', authController.postSignup);




module.exports = router;