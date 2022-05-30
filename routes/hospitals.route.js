/* Ruta: /api/hospitals  */

const { Router } = require('express');
const { check } = require('express-validator');
const { validFields } = require('../middleware/valid-fields.middleware');
const { validJWT } = require('../middleware/valid-jwt.middleware');

const {
    getHospitals,
    createHospital,
    updateHospital,
    deleteHospital
} = require('../controllers/hospitals.controller');

const router = Router();

//Routes
router.get('/', getHospitals);
router.post('/', 
    [
        validJWT,
        check('name', 'Name is required').not().isEmpty(),
        //check('hospital', 'Hospital is required').isMongoId(),//Valid taht ID exist in Mongo
        validFields
    ],
    createHospital
);
router.put('/:id', 
    [
        validJWT,
        check('name', 'Name is required').not().isEmpty(),
        validFields
    ],
    updateHospital
);
router.delete('/:id', validJWT, deleteHospital);

module.exports = router;

