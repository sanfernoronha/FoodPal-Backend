const Customer = require("../models/customer.model");
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
  Customer.findById(req.params.id)
    .then((customer) => res.status(200).json(customer))
    .catch((err) => res.status(400).json("Error: " + err));
};

//will require special permissions
exports.deleteCustomerById = (req, res) => {
  Customer.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).json("Customer deleted"))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.updateCustomerById = (req, res) => {
  Customer.findById(req.params.id).then((customer) => {
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

// exports.userBoard = (req, res) => {
//   res.status(200).send("User Content");
// };
