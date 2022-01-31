/* Ruta: /api/users  */
const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth.controller');
const { validFields } = require('../middleware/valid-fields.middleware');

const router = Router();

router.post('/',
    [
        check("email", "Email is required").isEmail(),
        check("password", "Password is required").not().isEmpty(),
        validFields
    ],
    login
)

module.exports = router;