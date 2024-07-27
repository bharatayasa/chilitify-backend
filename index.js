const express = require('express');
const dotenv = require('dotenv');
const router = require('./endpoints/router');

const app = express(); 
dotenv.config(); 
app.use(express.json());
app.use(router);

const port = process.env.PORT || 3000; 
const host = process.env.HOST; 

app.listen(port, host, () => {
    console.log(`server up and runnig at http://${host}:${port}`);
})
