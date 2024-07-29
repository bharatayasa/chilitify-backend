const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

let connection;

function handleDisconnect() {
    connection = mysql.createConnection({
        host    : process.env.DB_HOST,
        user    : process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    connection.connect((error) => {
        if (error) {
            console.error("Failed connecting to MySQL database:", error.message);
            setTimeout(handleDisconnect, 2000);
        } else {
            console.log("Connected to MySQL database");
        }
    });

    connection.on('error', (err) => {
        console.error('Database connection error:', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleDisconnect();
        } else {
            throw err;
        }
    });
}

handleDisconnect();

module.exports = connection;
