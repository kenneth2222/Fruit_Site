const mongoose = require('mongoose');


const cartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user', 
        required: true
    },
    products: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'product', 
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: [1, 'Quantity must be at least 1'],
            default: 1
        }
    }],
    status: {
        type: String,
        enum: ['active', 'completed', 'cancelled'],
        default: 'active'
    },
    dateCreated: {
        type: Date,
        default: () => new Date().toISOString()
    },
    dateUpdated: {
        type: Date,
        default: () => new Date().toISOString()
    }
});

// Update dateUpdated before saving
cartSchema.pre('save', function (next) {
    this.dateUpdated = new Date().toISOString();
    next();
});

const cartModel = mongoose.model('cart', cartSchema);
module.exports = cartModel;
