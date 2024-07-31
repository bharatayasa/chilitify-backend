const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connection = require('../config/db');
const dotenv = require('dotenv');
dotenv.config();

const secretKey = process.env.JWT_SECRET;

module.exports = {
    login: async (req, res) => {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).send('Username and password are required.');
        }

        try {
            const sql = 'SELECT * FROM users WHERE username = ?';
            const user = await new Promise((resolve, reject) => {
                connection.query(sql, [username], (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(results);
                });
            });

            if (user.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid username or password.'
                });
            }

            const validPassword = await bcrypt.compare(password, user[0].password);
            if (!validPassword) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid username or password.'
                });
            }

            const token = jwt.sign(
                { 
                    id: user[0].id, 
                    username: user[0].username, 
                    role: user[0].role 
                }, 
                secretKey, 
                { 
                    expiresIn: '1h' 
                }
            );

            return res.status(200).json({
                success: true,
                message: 'Login successful',
                data: {
                    user:{
                        id: user[0].id,
                        username: user[0].username,
                        role: user[0].role,
                    },
                    token: token,
                }
            });
        } catch (error) {
            console.error('Error logging in:', error);
            return res.status(500).json({
                success: false,
                message: 'An error occurred',
                error: error.message
            });
        }
    }
};
