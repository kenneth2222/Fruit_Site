const mongoose = require('mongoose');
const adminSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    phoneNumber: {
        type: String,
        required: true
    },
    
    isVerified:{
        type: Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        dwfault:false

    },

    dateCreated: {
        type: Date,
        default: () => {
            const date = new Date
            return date.toISOString()
        }
    },


})
const adminModel = mongoose.model('admin', adminSchema)
module.exports = adminModel