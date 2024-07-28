const connection = require('../config/db');

module.exports = {
    totalPrediction: async (req, res) => {
        const sql = "SELECT COUNT(*) as total FROM Predictions";

        try {
            const totalPrediction = await new Promise((resolve, reject) => {
                connection.query(sql, (error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(result);
                });
            });

            return res.status(200).json({
                data: totalPrediction 
            });
        } catch (error) {
            console.error('Error fetching total predictions:', error);
            return res.status(500).json({
                message: "Internal server error",
                error: error.message
            });
        }
    },
    totalUser: async (req, res) => {
        const sql = "SELECT COUNT(*) as total FROM users";

        try {
            const totalusers = await new Promise((resolve, reject) => {
                connection.query(sql, (error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(result);
                });
            });

            return res.status(200).json({
                message: "sucess to get total user",
                data: totalusers 
            });

        } catch (error) {
            console.error('Error fetching total predictions:', error);
            return res.status(500).json({
                message: "Internal server error",
                error: error.message
            });
        }
    }, 
    totalClass: async (req, res) => {
        const sql = `
            SELECT 
                d.class
            FROM 
                Predictions p
            INNER JOIN 
                description d ON p.description_id = d.id
            WHERE 
                p.deleted_at IS NULL
        `;
        
        try {
            const results = await new Promise((resolve, reject) => {
                connection.query(sql, (error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(result); 
                });
            });

            const classCount = results.reduce((acc, row) => {
                const className = row.class;
                if (acc[className]) {
                    acc[className]++;
                } else {
                    acc[className] = 1;
                }
                return acc;
            }, {});

            const formattedClassCount = Object.entries(classCount).map(([className, count]) => ({
                class: className,
                count: count
            }));

            return res.status(200).json({
                message: "Success to get total class count", 
                data: formattedClassCount
            });
        } catch (error) {
            console.error('Error fetching total class:', error);
            return res.status(500).json({
                message: "Internal server error",
                error: error.message
            });
        }
    }
}
