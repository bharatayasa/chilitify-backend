const connection = require('../config/db');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
    getMe: async (req, res) => {
        const id = req.user.id;
        const sql = "SELECT id, username, name, email FROM users WHERE id = ?";

        try {
            const getMe = await new Promise((resolve, reject) => {
                connection.query(sql, [id], (error, result) => {
                    if (error) {
                        return reject(error); 
                    }
                    resolve(result);
                });
            });

            const formatMe = getMe.map(get => ({
                id: get.id,
                username: get.username,
                name: get.name,
                email: get.email,
            }));

            return res.status(200).json({
                message: "Success to get my data", 
                data: formatMe
            });
        } catch (error) {
            console.error('Error fetching me:', error);
            return res.status(500).json({
                message: 'An error occurred while fetching me',
                error: error.message
            });
        }
    }, 
    updateMe: async (req, res) => {
        const id = req.user.id;
        const { username, name, email } = req.body;

        if (!username || !name || !email) {
            return res.status(400).json({
                message: 'Username, name, and email are required.'
            });
        }

        const sql = `
            UPDATE users
            SET username = ?, name = ?, email = ?
            WHERE id = ?
        `;

        try {
            await new Promise((resolve, reject) => {
                connection.query(sql, [username, name, email, id], (error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(result);
                });
            });

            return res.status(200).json({
                message: 'User data updated successfully'
            });
        } catch (error) {
            console.error('Error updating user data:', error);
            return res.status(500).json({
                message: 'An error occurred while updating user data',
                error: error.message
            });
        }
    }, 
    updatePassword: async (req, res) => {
        const id = req.user.id;
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                message: 'Current and new passwords are required.'
            });
        }

        const sqlGetPassword = "SELECT password FROM users WHERE id = ?";

        try {
            const result = await new Promise((resolve, reject) => {
                connection.query(sqlGetPassword, [id], (error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(result);
                });
            });

            if (result.length === 0) {
                return res.status(404).json({
                    message: 'User not found'
                });
            }

            const hashedPassword = result[0].password;

            const match = await bcrypt.compare(currentPassword, hashedPassword);
            if (!match) {
                return res.status(400).json({
                    message: 'Current password is incorrect'
                });
            }

            const newHashedPassword = await bcrypt.hash(newPassword, saltRounds);

            const sqlUpdatePassword = "UPDATE users SET password = ? WHERE id = ?";

            await new Promise((resolve, reject) => {
                connection.query(sqlUpdatePassword, [newHashedPassword, id], (error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(result);
                });
            });

            return res.status(200).json({
                message: 'Password updated successfully'
            });
        } catch (error) {
            console.error('Error updating password:', error);
            return res.status(500).json({
                message: 'An error occurred while updating the password',
                error: error.message
            });
        }
    }
};
