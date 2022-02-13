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
const updateHospital = async (req, res = response) => {
    const id = req.params.id;
    const uid = req.uid;

    try {   
        const hospital = await Hospital.findById(id)

        if ( !hospital ) {
            return res.status(404).json({
                ok: false,
                msg: "Hospital not found"
            })
        }

        const hospitalChanges = {
            ...req.body,
            user: uid
        }


        const updatedHospital = await Hospital.findByIdAndUpdate(id, hospitalChanges, { new: true });
        res.json({
            ok: true,
            hospital: updatedHospital
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            error
        })
    }    
}
const deleteHospital = async (req, res = response) => {
    const id = req.params.id;

    try {   
        const hospital = await Hospital.findById(id)

        if ( !hospital ) {
            return res.status(404).json({
                ok: false,
                msg: "Hospital not found"
            })
        }

        await Hospital.findByIdAndDelete(id);
        res.json({
            ok: true,
            msg: "Deleted hospital",
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            error
        })
    }    
}

module.exports = {
    getHospitals,
    createHospital,
    updateHospital,
    deleteHospital
}