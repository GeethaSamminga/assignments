const mongoose = require("mongoose");

const addCartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
        required: true,
    },
    quantity: {
        type: Number,
        default: 1,
    },
    // totalPrice: {
    //     type: Number,
    //     required: true,
    // },
    addedAt: {
        type: Date,
        default: Date.now(),
    }
});

const AddCart = mongoose.model("AddCart", addCartSchema);

module.exports = AddCart;
