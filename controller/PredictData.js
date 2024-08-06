const connection = require('../config/db');
const moment = require('moment'); 

module.exports = {
    getAllPredict: async (req, res) => {
        const sql = `
                    SELECT 
                        p.id, 
                        p.description_id, 
                        p.user_id, 
                        p.confidence, 
                        p.created_at, 
                        p.deleted_at, 
                        p.image_name,
                        d.description,
                        d.class,
                        d.prevention,
                        u.username,  
                        u.email 
                    FROM 
                        Predictions p
                    INNER JOIN 
                        description d ON p.description_id = d.id
                    INNER JOIN 
                        users u ON p.user_id = u.id
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

            const baseUrl = `${req.protocol}://${req.get('host')}/uploads`;

            const formattedPredictions = predictions.map(prediction => ({
                id: prediction.id,
                user_id: prediction.user_id,
                username: prediction.username,
                email: prediction.email,
                class: prediction.class,
                description: prediction.description,
                prevention: prediction.prevention,
                confidence: prediction.confidence,
                image_url: prediction.image_name ? `${baseUrl}/${prediction.image_name}` : null,
                created_at: moment(prediction.created_at).format('DD-MM-YYYY'),
                deleted_at: moment(prediction.deleted_at).format('DD-MM-YYYY'),
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
    }, 
    restoreHistory: async (req, res) => {
        const id = req.params.id;
        const sql = "UPDATE Predictions SET deleted_at = NULL WHERE id = ?";
    
        try {
            const result = await new Promise((resolve, reject) => {
                connection.query(sql, [id], (error, result) => {
                    if (error) {
                        return reject(error); 
                    }
                    resolve(result);
                });
            });
    
            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: "Data not found or already restored"
                });
            }
    
            return res.status(200).json({
                message: "Success to restore data",
                data: result
            });
    
        } catch (error) {
            console.error('Error restoring data:', error);
            return res.status(500).json({
                message: 'An error occurred while restoring data', 
                error: error.message
            });
        }
    }
    
}
