const connection = require('../config/db');
const moment = require('moment'); 

module.exports = {
    getAllPredict: async (req, res) => {
        const sql = `
                SELECT 
                    p.id, 
                    p.description_id, 
                    p.confidence, 
                    p.created_at, 
                    d.description,
                    d.class,
                    d.prevention
                FROM 
                    Predictions p
                INNER JOIN 
                    description d ON p.description_id = d.id
                WHERE 
                    p.deleted_at IS NULL
                ORDER BY 
                    p.id DESC
            `;

        try {
            const predictions = await new Promise((resolve, reject) => {
                connection.query(sql, (error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(result);
                });
            });

            const formattedPredictions = predictions.map(prediction => ({
                id: prediction.id,
                class: prediction.class,
                description: prediction.description,
                prevention: prediction.prevention,
                confidence: prediction.confidence,
                created_at: moment(prediction.created_at).format('YYYY-MM-DD'),
            }));

            return res.status(200).json({
                success: true,
                message: "Success to get all prediction data",
                data: formattedPredictions
            });
        } catch (error) {
            console.error('Error fetching predictions:', error);
            return res.status(500).json({
                message: "Internal server error",
                error: error.message
            });
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
