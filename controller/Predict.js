const axios = require('axios');
const FormData = require('form-data');
const dotenv = require('dotenv');
const fs = require('fs');
const connection = require('../config/db');
dotenv.config();

const model_api = process.env.MODEL_API;

module.exports = {
    predict: async (req, res) => {
        if (!req.file) {
            return res.status(404).send('No image uploaded.');
        }

        // console.log('Uploaded file info:', req.file);

        try {
            const form = new FormData();
            form.append('file', fs.createReadStream(req.file.path), {
                filename: req.file.filename,
                contentType: req.file.mimetype
            });

            const response = await axios.post(`${model_api}/predict_image/`, form, {
                headers: {
                    ...form.getHeaders()
                }
            });

            const responseData = response.data.data;
            const result = {
                id: responseData.id,
                confidence: responseData.confidence
            };

            const sql = "SELECT * FROM description WHERE id = ?";
            const data = await new Promise((resolve, reject) => {
                connection.query(sql, [result.id], (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    if (results.length === 0) {
                        return reject(new Error('No description found for the given id'));
                    }
                    resolve(results[0]);
                });
            });

            const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

            const insertPredict = `INSERT INTO Predictions (description_id, user_id, confidence, image_name) VALUES (?, ?, ?, ?)`;
            const insertPrediction = await new Promise((resolve, reject) => {
                connection.query(insertPredict, [data.id, req.user.id, result.confidence, req.file.filename], (error, result) => {
                // connection.query(insertPredict, [data.id, req.user.id, result.confidence, imageUrl], (error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(result);
                });
            });

            return res.status(200).json({
                message: "Success to predict",
                user_id: req.user.id,
                data,
                confidence: result.confidence,
                image_url: imageUrl,
                insert_status: insertPrediction.affectedRows > 0
            });
        } catch (error) {
            console.error('Error processing request:', error);
            return res.status(500).send('An error occurred');
        }
    }
};
