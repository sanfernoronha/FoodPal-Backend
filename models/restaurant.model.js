const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderItems = new Schema({
    itemName: {
        type: String,
        minlength: 3,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    }
});

const orders = new Schema({
    id: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    tableNumber: {
        type: Number,
        trim: true,
    },
    isPrepared: {
        type: Boolean,
        required: true,
    },
    isPreparing: {
        type: Boolean,
        required: true,
    },
    isServed: {
        type: Boolean,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    isPaid: {
        type: Boolean,
        required: true,
    },
    items: [orderItems],
},
{
    timestamps: true,
});

const dishSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
    }
});

const menuSectionSchema = new Schema({
    dishes: [dishSchema],
});

const tableSchema = new Schema({
    qrlink: {
        type: String,
        required: true,
        minlength: 3,
    },
    capactiy: {
        type: Number,
        required: true,
    }
})

const restaurantSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    city: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,

    },
    orders: [orders],
    menu: [menuSectionSchema],
    tables: [tableSchema]


},{
    timestamps: true,
}

);


const restaurant = mongoose.model('restaurant', restaurantSchema);

module.exports = restaurant;