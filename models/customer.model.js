const mongoose = require('mongoose');

const Schema = mongoose.Schema;

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
    city: {
        type: String,
        trim: true
    },
    orders: [
        {
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
        }
    ]
},
{
    timestamps: true
}
)