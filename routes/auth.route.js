/* Ruta: /api/users  */
const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn, renewToken } = require('../controllers/auth.controller');
const { validFields } = require('../middleware/valid-fields.middleware');
const { validJWT } = require('../middleware/valid-jwt.middleware');

const router = Router();

router.post('/',
    [
        check("email", "Email is required").isEmail(),
        check("password", "Password is required").not().isEmpty(),
        validFields
    ],
    login
)
router.post('/google',
    [
        check("token", "Google's token is required").not().isEmpty(),
        validFields
    ],
    googleSignIn
)
router.get('/renew',
    validJWT,
    renewToken
)

module.exports = router;