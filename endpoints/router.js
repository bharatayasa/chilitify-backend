const express = require('express');
const router = express.Router();
const multer = require('multer');
const AccesToken = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');

const register = require('../controller/register');
router.post('/register', register.register)

const login = require('../controller/login')
router.post('/login', login.login)

const server = require('../controller/Intro')
router.get('/', server.server)

const DataDescription = require('../controller/DataDescription');
router.get('/description', AccesToken, checkRole('admin'), DataDescription.getAllDataDescription)

const Predict = require('../controller/Predict');
const upload = multer({ 
    storage: multer.memoryStorage() 
});
router.post('/predict', AccesToken, checkRole('user'), upload.single('file'), Predict.predict);

module.exports = router
