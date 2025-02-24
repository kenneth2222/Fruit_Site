const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },

    lastname: {
        type: String,
        required: true
    },

    country: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    },

    town: {
        type: String,
        required: true
    },

    postcode: {
        type: String,
        required: true
    },

    phone: {
        type: Number,
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

    categories: {
        type: String,
        enum: {
            values: [],
            message: ""
        }
    },
    
    isVerified:{
        type: Boolean,
        default:false
    },

    dateCreated: {
        type: Date,
        default: () => {
            const date = new Date
            return date.toISOString()
        }
    },


})
const productModel = mongoose.model('product', productSchema)
module.exports = productModel






