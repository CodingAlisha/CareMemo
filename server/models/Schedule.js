const mongoose  = require("mongoose");

const scheduleSchema = new mongoose.Schema ({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    eventType: {
        type: String, 
        required: true, 
        enum: 
            ['DOCTOR', 'PRACTICE', 'MEETING', 'DANCE', 'OTHER']
    },
    date: {
        type: Date, 
        required: true, 
    },
    reason: {
        type: String, 
        required: true, 
        trim: true
    },
    status: {
        type: String, 
        enum: ['SCHEDULED', 'CANCELED', 'COMPLETED'],
        default: 'SCHEDULED'
    }
}, {timestamps: true});


module.exports = mongoose.model('Schedule', scheduleSchema);