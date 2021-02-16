const mongoose = require("mongoose");

const Schema = mongoose.Schema;

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
  },
});

const menuSectionSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  items: [dishSchema],
});

const tableSchema = new Schema({
  qrlink: {
    type: String,
    required: true,
    minlength: 3,
  },
  capacity: {
    type: Number,
    required: true,
  },
});

const ordersSchema = new Schema(
  {
    tableNumber: {
      type: String,
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
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const restaurantSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 4,
    },
    city: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    orders: [ordersSchema],
    menu: [menuSectionSchema],
    tables: [tableSchema],
  },
  {
    timestamps: true,
  }
);

const restaurant = mongoose.model("restaurant", restaurantSchema);

module.exports = restaurant;
