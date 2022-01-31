const { response } = require("express");

const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const { generateJWT } = require("../helpers/jwt");

const login = async(req, res = response) => {
    const { email, password } = req.body;

    try {
        const userDB = await User.findOne({ email });

        if ( !userDB ) {
            return res.status(404).json({
                ok: false,
                msg: "Email is not valid"
            })
        }

        const validPassword = bcrypt.compareSync(password, userDB.password);
        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: "Password is not valid"
            })
        }

        // Generate token
        const token = await generateJWT(userDB.id);

        res.json({
            ok: true,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Contact the admin"
        })
    }
}

module.exports = {
    login
}
