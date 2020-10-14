const router = require("express").Router();
let Customer = require("../models/customer.model");

// const customerController = require("../controllers/customerController")

/**
 * @api {put} http://localhost:5000/customers/add Add customer
 * @apiName AddCustomer
 * @apiGroup Customer
 *
 * @apiParam {String} name Name of the customer
 * @apiParam {String} email Email Id of the customer
 * @apiParam {String} [city]  City of the customer
 * @apiParam {Number} phone_number Phone number of the customer
 *
 * @apiSuccess {String} success_msg Customer added
 * @apiError 400 Error
 */
// router.route("/add").put((req, res) => {
//   const name = req.body.name;
//   const email = req.body.email;
//   const city = req.body.city == null ? "" : req.body.city;
//   const phone_number = req.body.phone_number;
//   const orders = null;

//   const newCustomer = new Customer({
//     name,
//     email,
//     city,
//     phone_number,
//     orders,
//   });

//   newCustomer
//     .save()
//     .then(() => res.status(200).json("Customer added"))
//     .catch((err) => res.status(400).json("Error: " + err));
// });

// router.route("/auth/register").post(customerController.register);
// router.route("/auth/sign_in").post(customerController.sign_in);

module.exports = router;
