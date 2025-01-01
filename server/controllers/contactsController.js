const pool = require("../models/db");

// find user2id from contacts table and get the user details from users table
exports.findUserContacts = async (req, res) => {
    const user_id = req.user;

    //   console.log(user_id);

    try {
        const result = await pool.query(
            "SELECT * FROM users WHERE user_id IN (SELECT user2_id FROM contacts WHERE user1_id = $1)",
            [user_id]
        );
        // console.log(result.rows);
        res.status(200).json({ contacts: result.rows });
    } catch (error) {
        res.status(500).json({ message: "Error finding contacts", error: error.message });
    }
};

// find all the user from table base on the username
exports.findUserByUsername = async (req, res) => {

    const { username } = req.body;
    console.log(username);

    try {
        const result = await pool.query("SELECT * FROM users WHERE username ILIKE $1",
            [`%${username}%`]);

        console.log(result.rows);

        res.status(200).json({ contacts: result.rows });
    }
    catch (error) {
        res.status(500).json({ message: "Error finding contacts", error: error.message });
    }
}