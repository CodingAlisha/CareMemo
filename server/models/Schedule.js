const mongoose  = require("mongoose");

const scheduleSchema = new mongoose.Schema ({
    
    eventType: {
        type: String, 
        required: true, 
        enum: 
            ['DOCTOR', 'PRACTICE', 'MEETING', 'DANCE', 'OTHER']
    },
    reason: {
        type: String, 
        required: true, 
        trim: true
    },
    status: {
        type: String, 
        enum: ['SCHEDULED', 'CANCELLED', 'COMPLETED'],
        default: 'SCHEDULED'
    }
}, {timestamps: true});


module.exports = mongoose.model('Schedule', scheduleSchema);