const bcrypt = require('bcrypt');
const moment = require('moment');
const connection = require('../config/db');

module.exports = {
    register: async (req, res) => {
        const { username, name, email, password } = req.body;

        if (!username || !name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required.'
            });
        }

        try {
            const sqlCheck = 'SELECT * FROM users WHERE username = ? OR email = ?';
            const existingUser = await new Promise((resolve, reject) => {
                connection.query(sqlCheck, [username, email], (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(results);
                });
            });

            if (existingUser.length > 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Username or email already exists.'
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const sql = `INSERT INTO users (username, name, email, password, role, created_at, updated_at) VALUES (?, ?, ?, ?, 'user', NOW(), NOW())`;
            const result = await new Promise((resolve, reject) => {
                connection.query(sql, [username, name, email, hashedPassword], (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(results);
                });
            });

            const userId = result.insertId;
            const sqlUser = 'SELECT id, name, email, password, created_at, updated_at FROM users WHERE id = ?';
            const user = await new Promise((resolve, reject) => {
                connection.query(sqlUser, [userId], (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(results[0]);
                });
            });

            return res.status(201).json({
                success: true,
                message: 'User registered successfully.',
                data: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    createdAt: moment(user.created_at).format('YYYY-MM-DD'),
                    updatedAt: moment(user.updated_at).format('YYYY-MM-DD')
                }
            });
        } catch (error) {
            console.error('Error registering user:', error);
            return res.status(500).json({
                success: false,
                message: 'An error occurred',
                error: error.message
            });
        }
    }
};
