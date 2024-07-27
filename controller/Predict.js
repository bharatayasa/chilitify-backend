const axios = require('axios');
const FormData = require('form-data');
const dotenv = require('dotenv');
const connection = require('../config/db');
dotenv.config(); 
const model_api = process.env.MODEL_API;

module.exports = {
    predict: async (req, res) => {
        if (!req.file) {
            return res.status(404).send('No image uploaded.');
        }

        try {
            const form = new FormData();
            form.append('file', req.file.buffer, {
                filename: req.file.originalname,
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

            const {description_id, user_id,	confidence} = req.body
            const insertPredict = `INSERT INTO Predictions (description_id, user_id, confidence) VALUE (${data.id}, ${req.user.id}, ${result.confidence})`
            const insertPrediction = await new Promise((resolve, reject) => {
                connection.query(insertPredict, [description_id, user_id,	confidence], (error, result) => {
                    if (error) {
                        reject(error)
                    }
                    resolve(result)
                })
            })

            return res.status(200).json({
                message: "Success to predict",
                user_id: req.user.id,
                data,
                confidence: result.confidence,
                insert_status: insertPrediction.protocol41
            });
        } catch (error) {
            console.error('Error uploading file:', error);
            return res.status(500).send('An error occurred');
        }
    }
}
