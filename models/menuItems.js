const mongoose = require('mongoose');
mongoose.pluralize(null);
const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    taste: {
        type: String,
        enum: ['sweet', 'spicy', 'sour'],
        required: true
    },
    is_drink: {
        type: Boolean,
        require: true
    },
    num_sales: {
        type: Number,
        required: true
    }
})

const menuItem = mongoose.model("menuItem", menuItemSchema);
module.exports = menuItem;