const mongoose = require('mongoose');
// const phoneNumberRegex = /^[0-9] {10}/;
// const phoneNumberRegex = /^\d{3}--\d{3}--\d{4}$/;

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

// },
// contact: {
//     type: String,
//     required: [true, "Please enter contact information"],
//     validate: {
//         validator: function(v) {
//             return phoneNumberRegex.test(v);
//         },
//         message: props => `${props.value} is not a valid phone number input.`
//     }
    
// }
});

module.exports = mongoose.model ('Physician', physicianSchema);