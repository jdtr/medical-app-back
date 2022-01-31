const jwt = require("jsonwebtoken")

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

module.exports = {
    validJWT
}