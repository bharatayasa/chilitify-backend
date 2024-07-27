const connection = require('../config/db');
const bcrypt = require('bcrypt');

module.exports = {
    getAllUsers: async(req, res) => {
        const sql = "SELECT * FROM users ORDER BY users.id DESC"; 

        try {
            const user = await new Promise((resolve, reject) => {
                connection.query(sql, (error, result) => {
                    if (error) {
                        reject(error); 
                    }
                    resolve(result); 
                })
            })

            return res.status(200).json({
                message: "sucess to get all users data", 
                data: user
            })
        } catch (error) {
            return res.status(500).json({
                message: "internal server error", 
                error: error.message
            })
        }
    }, 
    getUserById: async(req, res) => {
        const id = req.params.id; 
        const sql = "SELECT * FROM users WHERE id = ?"; 

        try {
            const user = await new Promise((resolve, reject) => {
                connection.query(sql, id, (error, result) => {
                    if (error) {
                        reject(error); 
                    }
                    resolve(result); 
                })
            })
    
            return res.status(200).json({
                message: "sucess to get user data by id", 
                data: user
            })
        } catch (error) {
            return res.status(500).json({
                message: "internal server error", 
                error: error.message
            })
        }
    }, 
    addUser: async(req, res) => {
        const { username, name, email, password, role } = req.body
        const sql = "INSERT INTO users (username, name, email, password, role) VALUE (?, ?, ?, ?, ?)"; 
        
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
            const user = await new Promise((resolve, reject) => {
                connection.query(sql, [username, name, email, hashedPassword, role], (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(result);
                })
            })

            return res.status(201).json({
                message: "success to add data", 
                data: user
            })
        } catch (error) {
            return res.status(500).json({
                message: "internal server error", 
                error: error.message
            })
        }
    }, 
    updateUser: async(req, res) => {
        const { username, name, email, password, role } = req.body
        const id = req.params.id; 
        const sql = "UPDATE users SET username = ?, name = ?, email = ?, password = ? , role = ? WHERE id = ?";

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
            const user = await new Promise((resolve, reject) => {
                connection.query(sql, [username, name, email, hashedPassword, role, id], (error, result) => {
                    if (error) {
                        reject(error)
                    }
                    resolve(result);
                })
            })

            return res.status(201).json({
                message: "success to update data", 
                data: user
            })
        } catch (error) {
            return res.status(500).json({
                message: "internal server error", 
                error: error.message
            })
        }
    }, 
    deleteUser: async(req, res) => {
        const id = req.params.id; 
        const sql = "UPDATE users SET deleted_at = NOW() WHERE id = ?"

        try {
            const user = await new Promise((resolve, reject) => {
                connection.query(sql, id, (error, result) => {
                    if (error) {
                        reject(error)
                    }
                    resolve(result)
                })
            })

            return res.status(201).json({
                message: "sucess to delete data", 
                data: user
            })
        } catch (error) {
            return res.status(500).json({
                message: "internal server error", 
                error: error.message
            })
        }
    }
}