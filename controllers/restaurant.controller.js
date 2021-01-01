const Restaurant = require("../models/restaurant.model");
var bcrypt = require("bcryptjs");

exports.getAllRestaurants = (req, res) => {
  Restaurant.find()
    .then((restaurant) => res.status(200).json(restaurant))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.addRestaurants = (req, res) => {
  const name = req.body.name;
  const city = req.body.city;
  const orders = null;
  const menu = req.body.menu;
  const tables = req.body.tables;

  const newRestaurant = new Restaurant({
    name,
    city,
    orders,
    menu,
    tables,
  });

  newRestaurant
    .save()
    .then(() => res.status(200).json("Restaurant added!"))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.getRestaurantById = (req, res) => {
  Restaurant.findById(req.params.id)
    .then((restaurant) => res.status(200).json(restaurant))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.deleteRestaurantById = (req, res) => {
  Restaurant.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).json("Restaurant deleted"))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.updateRestaurantById = (req, res) => {
  Restaurant.findById(req.params.id).then((restaurant) => {
    restaurant.name = req.body.name;
    restaurant.city = req.body.city;
    restaurant.orders = req.body.orders;
    restaurant.menu = req.body.menu;
    restaurant.tables = req.body.tables;

    restaurant
      .save()
      .then(() => res.status(200).json("Restaurant updated!"))
      .catch((err) => res.status(400).json("Error: " + err));
  });
};

exports.addOrders = (req, res) => {
  Restaurant.findById(req.body.res_id).then((restaurant) => {
    var total_price = 0.0;
    var final_orders = [];

    var orders = req.body.items;
    orders.forEach((order) => {
      total_price += order.quantity * order.price;
      final_orders.push({
        itemName: order.name,
        quantity: order.quantity,
        price: order.price,
      });
    });

    if (restaurant.orders == null) {
      restaurant.orders = [];
    }

    restaurant.orders.push({
      tableNumber: req.body.table_no,

      total: total_price,
      isPaid: false,
      items: final_orders,
    });

    restaurant
      .save()
      .then(() => res.status(200).json("Order placed!"))
      .catch((err) => res.status(400).json("Error: " + err));
  });
};
