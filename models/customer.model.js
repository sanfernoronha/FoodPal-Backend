const mongoose = require('mongoose');
const bcrypt = require("bcryptjs")

const Schema = mongoose.Schema;

const ordersSchema = new Schema({
    restaurant_name: {
        type: String,
        required: true
    },
    restaurant_id: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true,
    },
    items: [
        {
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
        }
    ],
},
{
    timestamps: true
});

const customerSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 4
    },  
    city: {
        type: String,
        trim: true
    },
    phone_number: {
        type: Number,
        trim: true,
        maxlength: 10,
        required: true
    },
    orders: [ordersSchema]
},
{
    timestamps: true
}
);



const customer = mongoose.model('customer',customerSchema);
module.exports = customer;