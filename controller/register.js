const bcrypt = require('bcrypt');
const connection = require('../config/db');

module.exports = {
    register: async (req, res) => {
        const { username, name, email, password } = req.body;
    
        if (!username || !name || !email || !password) {
            return res.status(400).send('All fields are required.');
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
                    message: 'Username or email already exists.'
                });
            }
    
            const hashedPassword = await bcrypt.hash(password, 10);
    
            const sql = `INSERT INTO users (username, name, email, password, role, created_at, updated_at) VALUES (?, ?, ?, ?, 'user', NOW(), NOW())`;
            const data =  await new Promise((resolve, reject) => {
                connection.query(sql, [username, name, email, hashedPassword], (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(results);
                });
            });
    
            return res.status(201).json({
                message: 'User registered successfully.', 
                data: data
            });
        } catch (error) {
            console.error('Error registering user:', error);
            res.status(500).send('An error occurred');
        }
    }
};