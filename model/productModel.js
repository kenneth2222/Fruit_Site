const mongoose = require('mongoose');
const userModel = require('./userModel');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true,
        minlength: [2, 'Product name must be at least 2 characters long']
    },
    description: {
        type: String,
        required: [true, 'Product description is required'],
        minlength: [10, 'Description must be at least 10 characters long']
    },
    price: {
        type: Number,
        required: [true, 'Product price is required'],
        min: [0, 'Price cannot be negative'],
        default: 0
    },
    category: {
        type: String,
        required: [true, 'Product category is required'],
        enum: ['Fruits', 'Juice', 'Vegetables', 'Dried Nuts'],
        default: 'Fruits'
    },
    stockQuantity: {
        type: Number,
        required: [true, 'Stock quantity is required'],
        min: [0, 'Stock cannot be negative'],
        default: 0
    },
    shortDescription: {
        type: String,
        required: [true, 'Short description is required'],
        minlength: [10, 'Short description must be at least 10 characters long'],
        maxlength: [100, 'Short description must not exceed 100 characters'],
        trim: true
    },
    fullDescription: {
        type: String,
        required: [true, 'Long description is required'],
        minlength: [10, 'Long description must be at least 10 characters long'],
        maxlength: [1000, 'Long description must not exceed 1000 characters'],
        trim: true
    },
    sku: {
        type: String,
        required: [true, 'Product SKU is required'],
        unique: true,
        trim: true
    },
    // images: [{
    //     type: String,
    //     validate: {
    //         //This ensures that the images property is an array of strings
    //         // validator: (v) => Array.isArray(v) && v.every(url => typeof url === 'string'),
    //         message: 'Images must be an array of strings'
    //     }
    // }],
    image: { type: String, 
        required: true
        // validate: {
        // validator: (value) => typeof value === 'string',
        // message: 'Image must be a valid URL as a string'
    },
    
    isFeatured: {
        type: Boolean,
        default: false
    },
    tags: [{
        type: String,
        trim: true
    }],
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        // required: true
    },
    dateCreated: {
        type: Date,
        default: () => new Date().toISOString()
    }
},{ timestamps: true });//This adds createdAt and updatedAt fields to the schema

const productModel = mongoose.model('Product', productSchema);
module.exports = productModel;