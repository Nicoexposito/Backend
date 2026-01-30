const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Producte',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
        min: [1, 'La quantitat ha de ser mínim 1']
    },
    addedAt: {
        type: Date,
        default: Date.now
    }
});

const cartSchema = new mongoose.Schema({
    sessionId: {
        type: String,
        required: true,
        unique: true
    },
    items: [cartItemSchema]
}, { timestamps: true });

// Índex per cercar per sessionId
cartSchema.index({ sessionId: 1 });

module.exports = mongoose.model('Cart', cartSchema);
