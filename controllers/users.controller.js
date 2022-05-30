const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const { generateJWT } = require('../helpers/jwt');

// Functions
const getUsers = async (req, res) => {
    const from = Number(req.query.from) || 0;

    const usersPagination = User.find({}, 'name email role google img').skip(from).limit(5);

    const [users, total] = await Promise.all([usersPagination, User.count()])

    res.json({
        ok: true,
        users, 
        total
    })
}

const createUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const exitEmail = await User.findOne({ email });

        if ( exitEmail ) {
            return res.status(400).json({
                ok: false,
                msg: 'Email is already registered'
            })
        }

        const user = new User(req.body)
        //Encrypt password
        const slat = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password)
        // Create user in DB
        await user.save(); 

        const token = await generateJWT(user.id);

        res.json({
            ok: true,
            user: user,
            token
        })   
    }
    catch(err) {
        console.error(err)
        res.status(500).json({
            ok: false,
            msg: 'found error... check logs'
        })
    }
}

const updateUser = async (req, res = response) => {
    // Valid token & check if user is correct
    const uid = req.params.id;
    
    try {
        const userDB = await User.findById(uid);

        if ( !userDB ) {
            return res.status(404).json({
                ok: false,
                msg: "User don't exist by that id"
            })
        }
        //Updates
        const { password, google, email, ...fields} = req.body;

        if ( userDB.email !== email ) {
            const emailExists = await User.findOne({ email: email });
            if ( emailExists ) {
                return res.status(400).json({
                    ok: false,
                    msg: "There is already a user with that email."
                })
            }
        }

        if ( !userDB.google ) {
            fields.email = email;
        } else if( userDB.email !== email ) {
            return res.status(400).json({
                ok: false,
                msg: "Google user can't change their email"
            })
        }

        const updateddUser = await User.findByIdAndUpdate(uid, fields, { new: true })

        res.json({
            ok: true,
            user: updateddUser
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Unexpected error"
        })
    }
}

const deleteUser = async (req, res = response) => {
    const uid = req.params.id;

    try {
        const userDB = await User.findById(uid);

        if ( !userDB ) {
            return res.status(404).json({
                ok: false,
                msg: "User doesn't exist by that user"
            })
        }

        await User.findByIdAndDelete(uid);

        res.json({
            ok: true,
            msg: "User was deleted"
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Unexpected error"
        })
    }
}

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
}