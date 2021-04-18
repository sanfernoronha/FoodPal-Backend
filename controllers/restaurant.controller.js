/* 
1. Decide where is order placed in the entire model and then create appropriate routes for it
2. Make sure all responses are made finalized
3. Add comments
4. Decide what finally is gonna be contained in the qr code 
5. Decide if string will be formed in front end or back ends
Notes:- 




*/

const Restaurant = require("../models/restaurant.model");
var bcrypt = require("bcryptjs");


exports.getAllRestaurants = (req, res) => {
  Restaurant.find()
    .then((restaurants) => {
      if (restaurants) {
        return res.status(200).json(restaurants);
      } else {
        return res.status(404).json("Restaurant Not Found");
      }
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.getRestaurantById = (req, res) => {
  Restaurant.findById(req.userId)
    .then((restaurant) => {
      if (restaurant) {
        return res.status(200).json(restaurant);
      } else {
        return res.status(404).json("Restaurant Not Found");
      }
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.deleteRestaurantById = (req, res) => {
  Restaurant.findByIdAndDelete(req.userId)
    .then(() => res.status(200).json("Restaurant deleted"))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.updateRestaurantById = (req, res) => {
  Restaurant.findById(req.userId).then((restaurant) => {
    restaurant.name = req.body.name;
    restaurant.city = req.body.city;
    // restaurant.orders = req.body.orders;
    restaurant.menu = req.body.menu;
    restaurant.tables = req.body.tables;
    restaurant.address = req.body.address;

    restaurant
      .save()
      .then(() => res.status(200).json("Restaurant updated!"))
      .catch((err) => res.status(400).json("Error: " + err));
  });
};

exports.addTable = (req, res) => {
  Restaurant.findById(req.userId).then((restaurant) => {
    var tables = restaurant.tables;
    var new_table = {
      qrlink: req.body.qrlink,
      capacity: req.body.capacity,
      tableNumber: req.body.tableNumber
    }
    tables.push(new_table);



    // restaurant.orders = req.body.orders;

    restaurant.tables = tables;
    restaurant
      .save()
      .then(() => res.status(200).json("Table added"))
      .catch((err) => res.status(400).json("Error: " + err));

  })
}


exports.updateTable = (req, res) => {
  Restaurant.findById(req.userId).then((restaurant) => {

    var tableIndex = restaurant.tables.findIndex(item => item._id.toString() === req.body._id);
    restaurant.tables[tableIndex].qrlink = req.body.qrlink;
    restaurant.tables[tableIndex].capacity = req.body.capacity;
    restaurant.tables[tableIndex].tableNumber = req.body.tableNumber;
    restaurant
      .save()
      .then(() => res.status(200).json("Table updated"))
      .catch((err) => res.status(400).json("Error: " + err));

  })
}