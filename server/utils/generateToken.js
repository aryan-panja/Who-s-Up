const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};
