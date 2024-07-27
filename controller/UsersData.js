const connection = require('../config/db');

module.exports = {
    getAllUsers: async(req, res) => {
        const sql = "SELECT * FROM users"; 

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
    }
}