const config = require("../config/auth.config");
const Customer = require("../models/customer.model");
const Restaurant = require("../models/restaurant.model");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // console.log("Signup customer");
  const customer = new Customer({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    city: req.body.city == null ? "" : req.body.city,
    phone_number: req.body.phone_number,
    orders: null,
  });
  // console.log(customer);
  customer
    .save()
    .then(() => res.status(200).json("Customer added!"))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.signin = (req, res) => {
  Customer.findOne({
    email: req.body.email,
  }).exec((err, customer) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!customer) {
      return res.status(404).send({ message: "User Not found." });
    }

    var passwordIsValid = bcrypt.compareSync(
      req.body.password,
      customer.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    var token = jwt.sign({ id: customer.id }, config.secret, {
      expiresIn: 86400,
    });

    res.status(200).send({
      accessToken: token,
      customer: customer,
    });
  });
};

exports.signup_restaurant = (req, res) => {
  const name = req.body.name;
  const city = req.body.city;
  // const orders = null;
  const menu = req.body.menu;
  const tables = req.body.tables;
  const email = req.body.email;
  const password = bcrypt.hashSync(req.body.password, 8);
  const address = req.body.address;

  const newRestaurant = new Restaurant({
    name,
    city,
    // orders,
    menu,
    tables,
    email,
    password,
    address,
  });

  newRestaurant
    .save()
    .then(() => res.status(200).json("Restaurant added!"))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.signin_restaurant = (req, res) => {
  // console.log("Signing in restaurant");
  Restaurant.findOne({
    email: req.body.email,
  }).exec((err, restaurant) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!restaurant) {
      return res.status(404).send({ message: "User Not found." });
    }

    var passwordIsValid = bcrypt.compareSync(
      req.body.password,
      restaurant.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    var token = jwt.sign({ id: restaurant.id }, config.secret, {
      expiresIn: 86400,
    });

    res.status(200).send({
      accessToken: token,
      restaurant: restaurant,
    });
  });
};
