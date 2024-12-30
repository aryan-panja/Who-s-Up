const express = require('express');
const { signup, login, checkUniqueEmail, checkUniqueUsername } = require('../controllers/authController');
const { validateSignup, validateLogin } = require('../middlewares/validateRequest');

const router = express.Router();

router.post('/signup', validateSignup, signup);
router.post('/signup/checkUniqueEmail', checkUniqueEmail);
router.post('/signup/checkUniqueUsername', checkUniqueUsername);
router.post('/login', validateLogin, login);

module.exports = router;
