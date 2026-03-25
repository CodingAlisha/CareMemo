const mongoose = require('mongoose');


const physicianSchema = new mongoose.Schema ({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    name: {
        type: String,
        required: [true, "Please enter doctors' name"],
        uppercase: true,
        required: true
    },
    specialty: {
        type: String,
        required: [true, "Please enter medical specialty"],
        uppercase: true,
        required: true

    },
    contact: {
        type: String,
        required: [true, "Please enter contact information"],
        required: true
        // minLength: 10,
        // maxLength: 11
        
    }
});

module.exports = mongoose.model ('Physician', physicianSchema);