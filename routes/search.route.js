/* 
    Path: api/all/:search
*/

const { Router } = require('express');
const { getAll, getByCollection } = require('../controllers/search.controller');
const { validJWT } = require('../middleware/valid-jwt.middleware');

const router = Router();

router.get('/:search', validJWT, getAll)
router.get('/collection/:table/:search', validJWT, getByCollection)

module.exports = router;