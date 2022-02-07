const fs = require('fs');

const UserModel = require('../models/user.model');
const DoctorModel = require('../models/doctor.model');
const HospitalModel = require('../models/hospital.model');

const processImage = (folderType, typeObj, fileName) => {
    const oldPath = `./uploads/${folderType}/${typeObj.img}`;
    //Delete image previous
    if ( fs.existsSync(oldPath) ) fs.unlinkSync(oldPath);

    typeObj.img = fileName;
}

const updateImage = async (type, id, fileName) => {
    switch (type) {
        case 'doctors':
            const doctor = await DoctorModel.findById(id);
            if( !doctor ) return false;
            processImage('doctors', doctor, fileName)
            await doctor.save();
            return true;
        break;
        case 'hospitals':
            const hospital = await HospitalModel.findById(id);
            if( !hospital ) return false;
            processImage('hospitals', hospital, fileName)
            await hospital.save();
            return true;
        break;
        case 'users':
            const users = await UserModel.findById(id);
            if( !users ) return false;
            processImage('users', users, fileName)
            await users.save();
            return true;
        break;
    }
}

module.exports = {
    updateImage
}