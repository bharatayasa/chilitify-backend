const connection = require('../config/db');

module.exports = {
    getAllDataDescription: async(req, res) => {
        const sql = "SELECT * FROM description"
    
        try {
            const description = await new Promise((resolve, reject) => {
                connection.query(sql, (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(result);
                })
            })
    
            return res.status(200).json({
                message: "sucess to get data", 
                data: description
            })
        } catch (error) {
            return res.status(500).json({
                message: "internal server error", 
                error: error.message
            })
        }
    }
}