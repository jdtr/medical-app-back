const { response } = require('express');
const Hospital = require('../models/hospital.model')

const getHospitals = async (req, res = response) => {
    // Populate se utiliza para traer información de otra trabal referecniada con la actual
    const hospitalsDB = await Hospital.find().populate('user', 'name img') 
    res.json({
        ok: true,
        hospitals: hospitalsDB
    })
}
const createHospital = async (req, res = response) => {
    const uid = req.uid;
    const hospitalModel = new Hospital({
        user: uid,
        ...req.body
    });

    try {
        const hospitalDB = await hospitalModel.save();
        res.json({
            ok: true,
            hospital: hospitalDB
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg: 'Communicate with the admin'
        })
    }
}
const updateHospital = (req, res = response) => {
    res.json({
        ok: true,
        msg: "Put hospital"
    })
}
const deleteHospital = (req, res = response) => {
    res.json({
        ok: true,
        msg: "Delete hospital"
    })
}

module.exports = {
    getHospitals,
    createHospital,
    updateHospital,
    deleteHospital
}