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
    },
    getDataDescriptionById: async(req, res) => {
        const sql = "SELECT * FROM description WHERE id = ?"
        const id = req.params.id

        try {
            const description = await new Promise((resolve, reject) => {
                connection.query(sql, id, (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(result);
                })
            })

            return res.status(200).json({
                message: "sucess to get data by id", 
                data: description
            })
        } catch (error) {
            return res.status(500).json({
                message: "internal server error", 
                error: error.message
            })
        }
    },
    addDataDescription: async(req, res) => {
        const {	clas , description, prevention } =  req.body
        const sql = "INSERT INTO description (class, description, prevention) VALUE (?, ?, ?)"

        try {
            const data = await new Promise((resolve, reject) => {
                connection.query(sql, [clas, description, prevention], (error, result) => {
                    if (error) {
                        reject(error)
                    }
                    resolve(result)
                })
            })

            return res.status(201).json({
                message: "sucess to add description data", 
                data: data
            })
        } catch (error) {
            return res.status(500).json({
                message: "internal server error", 
                error: error.message
            })
        }
    }, 
    updateDescriptionData: async(req, res) => {

    }, 
    deleteDescriptionData: async (req, res) => {
        
    }
}