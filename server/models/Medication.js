const mongoose = require('mongoose');

const medicationSchema = new mongoose.Schema ({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    name: {
        type: String,
        required: false,
        uppercase: true,
        required: true
    },
    dose: {
        type: String,
        required: false,
        uppercase: true,
        required: true

    },
    notes: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 200
        
    }
});

module.exports = mongoose.model ('Medication', medicationSchema);