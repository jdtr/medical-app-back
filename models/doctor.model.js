const { Schema, model } = require('mongoose');

const DoctorSchema = Schema({
    name: {
        type: String,
        require: true
    },
    img: {
        type: String,
    },
    user: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Users'//same to user's model
    },
    hospital: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Hospital'
    }
});

DoctorSchema.method('toJSON', function() {// To change property(only visual in response)
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model('Doctor', DoctorSchema)//Mongo add s