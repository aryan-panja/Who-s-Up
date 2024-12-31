const bcrypt = require('bcrypt');
const pool = require('../models/db');
const generateToken = require('../utils/generateToken');

// check if the new user is having unique email
exports.checkUniqueEmail = async (req, res) => {
  const { email } = req.body;

  console.log(email);

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    // console.log(result);
    if (result.rows.length > 0) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    res.status(200).json({ message: 'Email is unique' });
  } catch (error) {
    res.status(500).json({ message: 'Error checking email', error: error.message });
  }
};

// check if the new user is having unique username
exports.checkUniqueUsername = async (req, res) => {
  const { username } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

    if (result.rows.length > 0) {
      return res.status(409).json({ message: 'Username already exists' });
    }

    res.status(200).json({ message: 'Username is unique' });
  } catch (error) {
    res.status(500).json({ message: 'Error checking username', error: error.message });
  }
};

exports.signup = async (req, res) => {
  const { username, email, password, profile_pic } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (username, email, password, profile_pic, latest_login) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP) RETURNING *',
      [username, email, hashedPassword, profile_pic || null]
    );

    const user = result.rows[0];
    const token = generateToken(user.user_id);

    res.status(201).json({ message: 'User registered successfully', user: user, token: token });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = result.rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user.user_id);
    await pool.query('UPDATE users SET latest_login = CURRENT_TIMESTAMP WHERE user_id = $1', [user.user_id]);

    res.status(200).json({ message: 'Login successful', user: user, token: token});
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};
