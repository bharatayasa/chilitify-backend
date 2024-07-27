const connection = require('../config/db');

module.exports = {
    getAllPredict: async(req, res) => {
        const sql = "SELECT * FROM Predictions"

        try {
            const prediction = await new Promise((resolve, reject) => {
                connection.query(sql, (error, result) => {
                    if (error) {
                        reject(error)
                    }
                    resolve(result)
                })
            })

            return res.status(200).json({
                message: "sucess to get all prediction data", 
                data: prediction
            })
        } catch (error) {
            return res.status(500).json({
                message: "internal server error", 
                error: error.message
            })
        }
    },
    deletePrediction: async (req, res) => {
        const id = req.params.id;
        const sql = "UPDATE Predictions SET deleted_at = NOW() WHERE id = ?";

        try {
            const prediction = await new Promise((resolve, reject) => {
                connection.query(sql, id, (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(result);
                });
            });

            return res.status(200).json({
                message: "Success to mark data as deleted",
                data: prediction
            });

        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
                error: error.message
            });
        }
    }
}