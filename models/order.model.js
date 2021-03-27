const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ordersSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    restaurantId: {
      type: String,
      required: true,
    },
    tableNumber: {
      type: String,
      trim: true,
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
        itemId: {
          type: String,
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
          requird: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const order = mongoose.model("order", ordersSchema);

module.exports = order;
