const mongoose = require('mongoose');

const medicalSchema = new mongoose.Schema ({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    name: {
        type: String,
        required: [true, 'Please enter medical type or N/A'],
        uppercase: true
        
    },
    allergy: {
        type: String,
        required: [true, 'Please enter allergy or N/A'],
        uppercase: true

    },
    notes: {
        type: String,
        required: [true, 'Please enter notes or type none'],
        minLength: 3,
        maxLength: 200
        
    }
});

module.exports = mongoose.model ('Medical', medicalSchema);