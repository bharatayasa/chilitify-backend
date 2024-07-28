const express = require('express');
const router = express.Router();
const multer = require('multer');
const AccesToken = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');

const server = require('../controller/Intro');
const register = require('../controller/Register');
const login = require('../controller/Login');
router.get('/', server.server);
router.post('/register', register.register);
router.post('/login', login.login);

const DataDescription = require('../controller/DescriptionData');
router.get('/description', AccesToken, checkRole('admin'), DataDescription.getAllDataDescription);
router.get('/description/:id', AccesToken, checkRole('admin'), DataDescription.getDataDescriptionById);
router.post('/description', AccesToken, checkRole('admin'), DataDescription.addDataDescription);
router.put('/description/:id', AccesToken, checkRole('admin'), DataDescription.updateDescriptionData);
router.delete('/description/:id', AccesToken, checkRole('admin'), DataDescription.deleteDescriptionData);

const DataPrediction = require('../controller/PredictData'); 
router.get('/predicted', AccesToken, checkRole('admin'), DataPrediction.getAllPredict);
router.delete('/predicted/:id', AccesToken, checkRole('admin'), DataPrediction.deletePrediction);

const DataUsers = require('../controller/UsersData');
router.get('/user', AccesToken, checkRole('admin'), DataUsers.getAllUsers);
router.get('/user/:id', AccesToken, checkRole('admin'), DataUsers.getUserById);
router.post('/user', AccesToken, checkRole('admin'), DataUsers.addUser);
router.put('/user/:id', AccesToken, checkRole('admin'), DataUsers.updateUser);
router.delete('/user/:id', AccesToken, checkRole('admin'), DataUsers.deleteUser);

const Dashboard = require('../controller/Dashboard');
router.get('/total/prediction', AccesToken, checkRole('admin'), Dashboard.totalPrediction);
router.get('/total/users', AccesToken, checkRole('admin'), Dashboard.totalUser);
router.get('/total/class', AccesToken, checkRole('admin'), Dashboard.totalClass);

const Predict = require('../controller/Predict');
const upload = multer({storage: multer.memoryStorage()});
router.post('/predict', AccesToken, checkRole('user'), upload.single('file'), Predict.predict);

const history = require('../controller/History'); 
router.get('/history', AccesToken, checkRole('user'), history.readHistory);
router.delete('/history/:id', AccesToken, checkRole('user'), history.deleteHistory);

const UserMe = require('../controller/UserMe')
router.get('/get/me', AccesToken, checkRole('user'), UserMe.getMe);
router.post('/update/me', AccesToken, checkRole('user'), UserMe.updateMe);
router.post('/update/me/password', AccesToken, checkRole('user'), UserMe.updatePassword);

module.exports = router
