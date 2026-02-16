const mongoose = require('mongoose');

const physicianSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: [true, "Please enter doctors' name"],
        uppercase: true
    },
    specialty: {
        type: String,
        required: [true, "Please enter medical specialty"],
        uppercase: true

    },
    contact: {
        type: String,
        required: [true, "Please enter contact information"],
        minLength: 10,
        maxLength: 11
        
    }
});

module.exports = mongoose.model ('Physician', physicianSchema);