/* Ruta: /api/users  */

const { Router } = require('express');
const { check } = require('express-validator');
const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/users.controller');
const { validFields } = require('../middleware/valid-fields.middleware');
const { validJWT } = require('../middleware/valid-jwt.middleware');

const router = Router();

//Routes
router.get('/', validJWT, getUsers);
router.post('/', 
    [//add multiple middlewares
        check('name', 'Name is required').not().isEmpty(),
        check('password', 'Password is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        validFields
    ],
    createUser
);
router.put('/:id', 
    [//add multiple middlewares
        validJWT,
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        check('role', 'Role is required').not().isEmpty(),
    ],
    updateUser
);
router.delete('/:id', validJWT, deleteUser);

module.exports = router;

