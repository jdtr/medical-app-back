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
const updateDoctor = async (req, res = response) => {
    const id = req.params.id;
    const uid = req.uid;

    try {   
        const doctor = await Doctor.findById(id)

        if ( !doctor ) {
            return res.status(404).json({
                ok: false,
                msg: "Hospital not found"
            })
        }

        const doctorChanges = {
            ...req.body,
            user: uid
        }


        const updatedDoctor = await Doctor.findByIdAndUpdate(id, doctorChanges, { new: true });
        res.json({
            ok: true,
            doctor: updatedDoctor
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            error
        })
    } 
}
const deleteDoctor = async (req, res = response) => {
    const id = req.params.id;

    try {   
        const doctor = await Doctor.findById(id)

        if ( !doctor ) {
            return res.status(404).json({
                ok: false,
                msg: "Doctor not found"
            })
        }

        await Doctor.findByIdAndDelete(id);
        res.json({
            ok: true,
            msg: "Deleted Doctor",
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            error
        })
    }    
}

module.exports = {
    getDoctors,
    createDoctor,
    updateDoctor,
    deleteDoctor
}