const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

const  validJWT = (req, res, next) => {
    const token = req.header("x-token")

    if ( !token ) {
        return res.status(401).json({
            ok: false,
            msg: "There isn't token in request"
        })
    }

    try {
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;//Pass to other request
        next()
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            ok: false,
            msg: "Token don't valid"
        })
    }
}

const validAdminRole = async (req, res, next) => {
    const uid = req.uid;

    try {
        const userDB = await userModel.findById(uid);

        if( !userDB ) {
            return res.status(404).json({
                ok: false,
                msg: "User don't exists"
            })
        }
        if ( userDB.role !== 'ADMIN_ROLE' ) {
            return res.status(403).json({
                ok: false,
                msg: "Don't have permissions for that"
            })
        }
        next();

    } catch (err) {
        console.log(err)
        res.status(500).json({
            ok: false,
            msg: "talk with the admin"
        })
    }
}

const validAdminOrSameUser = async (req, res, next) => {
    const uid = req.uid;

    try {
        const userDB = await userModel.findById(uid);

        if( !userDB ) {
            return res.status(404).json({
                ok: false,
                msg: "User don't exists"
            })
        }
        if ( userDB.role === 'ADMIN_ROLE' || uid === id ) {
            next();   
        } else {
            return res.status(403).json({
                ok: false,
                msg: "Don't have permissions for that"
            });
        }

    } catch (err) {
        console.log(err)
        res.status(500).json({
            ok: false,
            msg: "talk with the admin"
        })
    }
}

module.exports = {
    validJWT,
    validAdminRole,
    validAdminOrSameUser
}