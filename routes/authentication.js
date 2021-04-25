const express = require('express');
const router = express.Router();
const { signin } = require('../controllers/authentication');
const { check, validationResult } = require('express-validator');

router.post("/signin", [
    check("email").isEmail().withMessage('Email is required'),
    check("password").isLength({ min: 1 }).withMessage('Password is required')
],signin);

module.exports = router;
