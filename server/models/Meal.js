const mongoose = require('mongoose');

const mealSelection = ['BREAKFAST', 'LUNCH', 'DINNER', 'SNACK'];

const mealSchema = new mongoose.Schema ({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    name: {
        type: String,
        required: [true, 'Please name this meal'],
        uppercase: true,
        minLength: 2,
        maxLength: 20
    },
    mealType: {
        type: String, 
        required: true, 
        uppercase: true,
        enum: {
            values: mealSelection, 
            message: '{VALUE} is not a valid meal option'
        }
    },
    directions: {
        type:String, 
    }
});

module.exports = mongoose.model('Meal', mealSchema);