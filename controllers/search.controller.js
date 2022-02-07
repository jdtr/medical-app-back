const { response } = require('express');

//Models
const User = require('../models/user.model');
const Doctor = require('../models/doctor.model');
const Hospital = require('../models/hospital.model');

const getAll = async (req, resp = response) => {
    const search = req.params.search;
    const regex = new RegExp(search, "i")
    const [users, doctors, hospitals] = await Promise.all([
        User.find({ name: regex }),
        Doctor.find({ name: regex }),
        Hospital.find({ name: regex })
    ])

    resp.json({
        ok: true,
        users,
        doctors,
        hospitals
    })
};

const getByCollection = async (req, res = response) => {
    const table = req.params.table;
    const search = req.params.search;
    const regex = new RegExp(search, "i");

    let data = [];

    switch(table) {
        case 'users':
            data = await User.find({ name: regex });
            break;
        case 'doctors':
            data = await Doctor.find({ name: regex })
                        .populate('user', 'name img')
                        .populate('hospital', 'name img')
            break;
        case 'hospitals':
            data = await Hospital.find({ name: regex }).populate('user', 'name img');
            break;
        default:
            res.status(400).json({
                ok: false,
                msg: "Table don't exist"
            })
            break;
        
    }
    res.json({
        ok: true,
        result: data
    })
}

module.exports = {
    getAll,
    getByCollection
}