const { response } = require('express');

const Doctor = require('../models/doctor.model');

const getDoctors = async (req, res = response) => {
    const doctorsDB = await Doctor.find()
            .populate('user','name img')
            .populate('hospital', 'name img') 

    res.json({
        ok: true,
        doctors: doctorsDB
    })
}
const createDoctor = async (req, res = response) => {
    const uid = req.uid;
    const doctorModel = new Doctor({
        user: uid,
        ...req.body
    })

    try {
        const doctorDB = await doctorModel.save();

        res.json({
            ok: true,
            doctor: doctorDB
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Communicate with the Admin"
        })
    }
}
const updateDoctor = (req, res = response) => {
    res.json({
        ok: true,
        msg: "Put Doctor"
    })
}
const deleteDoctor = (req, res = response) => {
    res.json({
        ok: true,
        msg: "Delete Doctor"
    })
}

module.exports = {
    getDoctors,
    createDoctor,
    updateDoctor,
    deleteDoctor
}