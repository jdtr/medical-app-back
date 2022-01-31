const {  validationResult } = require('express-validator');

//Custom middleware
const validFields = (req, res, next) => {
    const errors = validationResult(req);

    if( !errors.isEmpty() ) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }
    next();
}

module.exports = {
    validFields
}