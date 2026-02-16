const mongoose = require('mongoose');

const medicationSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: false,
        uppercase: true
    },
    dose: {
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

module.exports = mongoose.model ('Medication', medicationSchema);