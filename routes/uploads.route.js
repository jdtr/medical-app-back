/* 
    Path: api/uploads 
*/


const { Router } = require('express');
const { fileUpload, getImage } = require('../controllers/uploads.controller');
const { validJWT } = require('../middleware/valid-jwt.middleware');
const expressFileUpload = require('express-fileupload');

const router = Router();

router.use(expressFileUpload());

router.put('/:type/:id', validJWT, fileUpload)
router.get('/:type/:photo', getImage)

module.exports = router;
