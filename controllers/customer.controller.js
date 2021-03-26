const Customer = require("../models/customer.model");
const Restaurant = require("../models/restaurant.model");
var bcrypt = require("bcryptjs");

// exports.allAccess = (req, res) => {
//   res.status(200).send("Public content");
// };

//will require special permissions
exports.getAllCustomers = (req, res) => {
  Customer.find()
    .then((customer) => res.status(200).json(customer))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.getCustomerById = (req, res) => {
  Customer.findById(req.userId)
    .then((customer) => {
      console.log(customer);
      if (customer) {
        return res.status(200).json(customer);
      } else {
        return res.status(404).json("Customer Not Found");
      }
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

//will require special permissions
exports.deleteCustomerById = (req, res) => {
  Customer.findByIdAndDelete(req.userId)
    .then(() => res.status(200).json("Customer deleted"))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.updateCustomerById = (req, res) => {
  Customer.findById(req.userId).then((customer) => {
    customer.name = req.body.name;
    customer.email = req.body.email;
    customer.password = bcrypt.hashSync(req.body.password, 8);
    customer.city = req.body.city == null ? "" : req.body.city;
    customer.phone_number = req.body.phone_number;
    customer.orders = req.body.orders;

    customer
      .save()
      .then(() => res.status(200).json("Customer updated!"))
      .catch((err) => res.status(400).json("Error: " + err));
  });
};

//get restaurant by id
exports.getRestaurantById = (req, res) => {
  Restaurant.findById(req.params.id)
    .then((restaurant) => {
      //get necessary info of restaurant and return
      //main is menu
      const name = restaurant.name;
      const email = restaurant.email;
      const city = restaurant.city;
      const menu = restaurant.menu;
      const address = restaurant.address;

      const returned_restaurant = {
        name,
        email,
        city,
        menu,
        address,
      };
      return res.status(200).json(returned_restaurant);
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

// exports.userBoard = (req, res) => {
//   res.status(200).send("User Content");
// };
