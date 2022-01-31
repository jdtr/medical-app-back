const jwt = require('jsonwebtoken');

const generateJWT = ( uid ) => {
    const payload = { uid };

    return new Promise((resolve, reject) => {
        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '12h'
        }, (err, token) => {
            if (err) {
                console.log(err)
                reject("Couldn't generate token")
            }
            else {
                resolve(token)
            }
        })
    })
}

module.exports = {
    generateJWT
}