const { verifySignUpCustomer } = require("../middlewares");
const { verifySignUpRestaurant } = require("../middlewares");
const controller = require("../controllers/auth.controller.js");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  /**
   * @api {post} http://localhost:5000/customer/signup Customers signup
   * @apiName Customer Signup
   * @apiGroup Customer
   *
   * @apiParam {String} name Name of the customer
   * @apiParam {String} email Email of the customer
   * @apiParam {String} password Password of the customer (Min Length <code>4</code>)
   * @apiParam {String} [city] City of the customer
   * @apiParam {Number} phone_number Phone number of the customer
   *
   * @apiSuccess {String} json-response Customer Added
   * @apiError 400 Error
   */
  app.post(
    "/customer/signup",
    [verifySignUpCustomer.checkDuplicateUsernameOrEmail],
    controller.signup
  );

  /**
   * @api {post} http://localhost:5000/customer/signin Customers signin
   * @apiName Customer Signin
   * @apiGroup Customer
   *
   * @apiParam {String} email Email of the customer
   * @apiParam {String} password Password of the customer (Min Length <code>4</code>)
   *
   * @apiSuccess {Object} json-response Customer
   * @apiError 404 User not found
   * @apiError 401 Password incorrect
   * @apiError 500 Error
   */
  app.post("/customer/signin", controller.signin);

  /**
   * @api {post} http://localhost:5000/restaurant/signup Restaurants signup
   * @apiName Restaurants signup
   * @apiGroup Restaurant
   *
   * @apiParam {String} name Name of the Restaurant
   * @apiParam {String} city City where restaurant is located
   * @apiParam {Object[]} menu Array of menu objects
   * @apiParam {Object[]} menu[items] Array of item objects in the menu
   * @apiParam {String} items[name] Name of the item
   * @apiParam {Number} items[price] Price of the item
   * @apiParam {Object[]} tables Array of table objects
   * @apiParam {String} tables[qrlink] Link to the url of the table
   * @apiParam {Number} tables[capacity] Customer capacity of the table
   *
   * @apiSuccess {String} json-response Restaurant added!
   * @apiError 400 Error
   * @apiError 403 Unauthorized
   */

  app.post(
    "/restaurant/signup",
    [verifySignUpRestaurant.checkDuplicateUsernameOrEmail],
    controller.signup_restaurant
  );

  /**
   * @api {post} http://localhost:5000/restaurant/signin Restaurants signin
   * @apiName Restaurants signin
   * @apiGroup Restaurant
   *
   * @apiParam {String} name Email of the restaurant
   * @apiParam {String} password Password of the restaurant (Min Length <code>4</code>)
   *
   * @apiSuccess {Object} json-response Restaurant
   * @apiError 404 User not found
   * @apiError 401 Password incorrect
   * @apiError 500 Error
   */
  app.post("/restaurant/signin", controller.signin_restaurant);
};
