const mongoose = require('mongoose');

const medicalSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: false,
        uppercase: true
    },
    allergy: {
        type: String,
        required: false,
        uppercase: true

    },
    notes: {
        type: String,
        required: false,
        minLength: 3,
        maxLength: 200
        
    }
});

module.exports = mongoose.model ('Medical', medicalSchema);