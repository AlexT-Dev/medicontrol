const express = require('express');
const router = express.Router();

const userController = require('../controllers/usersController.js');
//Se definen las rutas 

router.get('/users/', userController.list)

module.exports = router;
