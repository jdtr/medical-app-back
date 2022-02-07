const generalPath = require('path')//Path del servidor o computador
const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { updateImage } = require('../helpers/update-image');
const fs = require('fs');

const fileUpload = (req, res = response) => {
    const {type, id} = req.params;

    const typesValid = ['hospitals', 'doctors', 'users'];

    if ( !typesValid.includes(type) ) {
        return res.status(400).json({
            ok: false,
            msg: "Type doesn't exist"        
        })
    }

    if ( !req.files || Object.keys(req.files).length == 0 ) {
        return res.status(400).json({
            ok: false,
            msg: "There aren't any files"
        })
    }

    const file = req.files.image;
    const cutName =  file.name.split('.');
    const extensionFile = cutName[cutName.length - 1]

    //Valid extension
    const validExtension = ['png', 'jpg', 'jpeg', 'gif'];

    if ( !validExtension.includes(extensionFile) ) {
        return res.status(400).json({
            ok: false,
            msg: "It isn't valid extension"
        })
    }

    // Generate name
    const fileName = `${uuidv4()}.${ extensionFile}`;

    // Path for saving image
    const path = `./uploads/${type}/${fileName}`;

    //Uplaod image
    file.mv(path, (err) => {
        if ( err ) {
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: "Error uploading image"
            })
        }

        //Update imagen in DB
        updateImage(type, id, fileName);

        res.json({
            ok: true,
            msg: 'FileUploaded',
            fileName
        })
    })

}
const getImage = (req, res) => {
    const { type, photo } = req.params;

    const pathImage = generalPath.join(__dirname, `../uploads/${type}/${photo}`);

    if ( fs.existsSync(pathImage) ) res.sendFile(pathImage);
    else res.sendFile(generalPath.join(__dirname, '../uploads/not-image.jpg'));
}

module.exports = {
    fileUpload,
    getImage
}