const express = require('express')
const router = express.Router();
const multer = require('multer');

const server = require('../controller/Intro')
router.get('/', server.server)

const DataDescription = require('../controller/DataDescription');
router.get('/description', DataDescription.getAllDataDescription)

const Predict = require('../controller/Predict');
const upload = multer({ 
    storage: multer.memoryStorage() 
});
router.post('/predict', upload.single('file'), Predict.predict);

module.exports = router
