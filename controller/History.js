const connection = require('../config/db');
const moment = require('moment'); 

module.exports = {
    readHistory: async (req, res) => {
        const userId = req.user.id;
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
                        p.user_id = ? 
                        AND p.deleted_at IS NULL
                    ORDER BY 
                        p.id DESC
                `;
        try {
            const predictions = await new Promise((resolve, reject) => {
                connection.query(sql, [userId], (error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(result);
                });
            });

            const formattedPredictions = predictions.map(prediction => ({
                class: prediction.class,
                description: prediction.description,
                prevention: prediction.prevention,
                confidence: prediction.confidence,
                created_at: moment(prediction.created_at).format('YYYY-MM-DD'),
            }));

            return res.status(200).json({
                message: "Success to get history prediction by user id",
                data: formattedPredictions
            });

        } catch (error) {
            console.error('Error fetching predictions:', error);
            return res.status(500).json({
                message: 'An error occurred while fetching predictions',
                error: error.message
            });
        }
    },
    deleteHistory: async (req, res) => {
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
            console.error('Error fetching predictions:', error);
            return res.status(500).json({
                message: 'An error occurred while fetching predictions', 
                error: error.message
            });
        }
    }
}