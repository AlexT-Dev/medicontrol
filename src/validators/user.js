const { check } = require('express-validator'); // Para validar las capturas de los input
const { validateResult } = require('../validators/helper'); //


const validateLogin = [ // cuenta y contraseña
    check('cuenta')
      .isEmail(),
    check('password')
      .not().isEmpty(),
    (req, res, next) =>{
        validateResult(req, res, next);   
    }      
]

module.exports = { validateLogin }