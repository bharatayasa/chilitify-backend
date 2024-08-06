const connection = require('../config/db');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = {
    getAllUsers: async (req, res) => {
        const sql = `
            SELECT
                id, 
                username, 
                name, 
                email,
                role, 
                created_at, 
                updated_at, 
                deleted_at 
            FROM 
                users 
            ORDER BY 
                id DESC
        `;
    
        try {
            const users = await new Promise((resolve, reject) => {
                connection.query(sql, (error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(result);
                });
            });
    
            const formatUser = users.map(user => ({
                id: user.id,
                username: user.username,
                name: user.name,
                email: user.email,
                role: user.role,
                created_at: moment(user.created_at).format('DD-MM-YYYY'),
                updated_at: moment(user.updated_at).format('DD-MM-YYYY'),
                deleted_at: moment(user.deleted_at).format('DD-MM-YYYY'),
            }));
    
            return res.status(200).json({
                success: true,
                message: "Success to get all users data",
                data: formatUser
            });
        } catch (error) {
            console.error('Error fetching users:', error);
            return res.status(500).json({
                message: "Internal server error",
                error: error.message
            });
        }
    },
    getUserById: async (req, res) => {
        const id = req.params.id
        const sql = `
            SELECT 
                id, 
                username, 
                name, 
                email, 
                role, 
                created_at, 
                updated_at, 
                deleted_at 
            FROM 
                users 
            WHERE 
                id = ?
        `;

        try {
            const users = await new Promise((resolve, reject) => {
                connection.query(sql, [id], (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(results);
                });
            });

            if (users.length === 0) {
                return res.status(404).json({
                    message: "User not found"
                });
            }

            const formatUser = users.map(user => ({
                id: user.id,
                username: user.username,
                name: user.name,
                email: user.email,
                role: user.role,
                created_at: moment(user.created_at).format('DD-MM-YYYY'),
                updated_at: moment(user.updated_at).format('DD-MM-YYYY'),
                deleted_at: moment(user.deleted_at).format('DD-MM-YYYY'),
            }));

            return res.status(200).json({
                success: true,
                message: "Success to users data by id",
                data: formatUser
            });
        } catch (error) {
            console.error('Error fetching user:', error);
            return res.status(500).json({
                message: "Internal server error",
                error: error.message
            });
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
                success: true,
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
    updateUser: async (req, res) => {
        const { username, name, email, role } = req.body;
        const id = req.params.id; 
    
        const sql = "UPDATE users SET username = ?, name = ?, email = ?, role = ? WHERE id = ?";
    
        try {
            const user = await new Promise((resolve, reject) => {
                connection.query(sql, [username, name, email, role, id], (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(result);
                });
            });
    
            return res.status(200).json({
                message: "Success to update data",
                data: user
            });
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
                error: error.message
            });
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
    },
    restoreUser: async(req, res) => {
        const id = req.params.id; 
        const sql = "UPDATE users SET deleted_at = NULL WHERE id = ?"

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
                message: "sucess to restore data", 
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
