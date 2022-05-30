const { response } = require("express");

const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const { generateJWT } = require("../helpers/jwt");
const { googleVerify } = require("../helpers/google.verify");

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
const googleSignIn = async (req, res= response) => {

    const googleToken = req.body.token;

    try {
        const { name, email, picture } = await googleVerify(googleToken);
        const userDB = await User.findOne({ email })
        let user;

        if ( !userDB ) {
            user = new User({
                name,
                email,
                password: "@@@",
                img: picture,
                google: true
            })
        } else {
            user = userDB;
            user.google = true;
        }

        // Save in DB
        await user.save();
        //generate token - jWT
        const token = await generateJWT(user.id);

        res.json({
            ok: true,
            token
        })
    } catch (error) {
        res.status(401).json({
            ok: true,
            msg: "Token isn't valid"
        })
    }
    
}
const renewToken = async (req, res= response) => {
    const uid = req.uid;
    const token = await generateJWT(uid);
    const user = await User.findById(uid);

    res.json({
        ok: true,
        token,
        user
    })
}

module.exports = {
    login,
    googleSignIn,
    renewToken
}
