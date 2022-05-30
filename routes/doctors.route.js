/* Ruta: /api/doctors  */

const { Router } = require('express');
const { check } = require('express-validator');
const { validFields } = require('../middleware/valid-fields.middleware');
const { validJWT } = require('../middleware/valid-jwt.middleware');

const {
    getDoctors,
    createDoctor,
    updateDoctor,
    deleteDoctor,
    getDoctorById
} = require('../controllers/doctors.controller');

const router = Router();

//Routes
router.get('/', getDoctors);
router.post('/', 
    [
        validJWT,
        check('name', 'Name is required').not().isEmpty(),
        validFields
    ],
    createDoctor
);
router.put('/:id', 
    [
        validJWT,
        check('name', 'Name is required').not().isEmpty(),
        validFields
    ],
    updateDoctor
);
router.delete('/:id', validJWT, deleteDoctor);

router.get('/:id', validJWT, getDoctorById);

module.exports = router;

