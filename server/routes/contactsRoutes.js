const express = require('express');
const { authenticate } = require('../middlewares/authenticate');
const { findUserContacts, findUserByUsername } = require('../controllers/contactsController');

const router = express.Router();

router.get('/', authenticate, findUserContacts);
router.post('/global', authenticate, findUserByUsername);

module.exports = router;