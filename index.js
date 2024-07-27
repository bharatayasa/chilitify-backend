const express = require('express');
const dotenv = require('dotenv');
const router = require('./endpoints/router');
const cors = require('cors');

const app = express(); 
dotenv.config(); 

const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(router);

const port = process.env.PORT || 3000; 
const host = process.env.HOST; 

app.listen(port, host, () => {
    console.log(`server up and runnig at http://${host}:${port}`);
})
