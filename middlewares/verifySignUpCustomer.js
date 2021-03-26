let Customer = require("../models/customer.model");

const checkDuplicateUsernameOrEmail = (req, res, next) => {
  //username
  // console.log("Checking");
  Customer.findOne({
    name: req.body.name,
  }).exec((err, user) => {
    if (err) {
      console.log("Error");
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      res.status(400).send({ message: "Failed! Username is already in use!" });
      return;
    }

    //email

    Customer.findOne({
      email: req.body.email,
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user) {
        res.status(400).send({ message: "Failed! Email is already in use!" });
        return;
      }

      next();
    });
  });
};

const verifySignUpCustomer = {
  checkDuplicateUsernameOrEmail,
};

module.exports = verifySignUpCustomer;
