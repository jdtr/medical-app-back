const { Schema, model } = require('mongoose');

const HospitalSchema = Schema({
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
    }
}, { collection: 'hospitals' });

HospitalSchema.method('toJSON', function() {// To change property(only visual in response)
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model('Hospital', HospitalSchema)//Mongo add s