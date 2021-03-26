const { authJwt } = require("../middlewares");
const controller = require("../controllers/customer.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // app.get("/customers/all", [authJwt.verifyToken], controller.allAccess);

  /**
   * @api {get} http://localhost:5000/customer/get Get Customer
   * @apiName GetCustomer
   * @apiGroup Customer
   *
   *
   * @apiHeader {String} x-access-token= <code>Token</code> JWT Token as "Token"
   *
   * @apiSuccess {Object} Customer object
   * @apiError 400 Error
   * @apiError 403 Unauthorized
   *
   */
  app.get("/customer/get", [authJwt.verifyToken, controller.getCustomerById]);

  /**
   * @api {delete} http://localhost:5000/customer/delete Delete Customer
   * @apiName DeleteCustomerById
   * @apiGroup Customer
   *
   *
   * @apiHeader {String} x-access-token= <code>Token</code> JWT Token as "Token"
   *
   * @apiSuccess {String} json-response Customer deleted!
   * @apiError 400 Error
   * @apiError 403 Unauthorized
   */
  app.delete("/customer/delete", [
    authJwt.verifyToken,
    controller.deleteCustomerById,
  ]);

  /**
   * @api {patch} http://localhost:5000/customer/update Update Customer
   * @apiName UpdateCustomerById
   * @apiGroup Customer
   *
   *
   *
   * @apiParam {String} name Name of the customer
   * @apiParam {String} email Email of the customer
   * @apiParam {String} password Password of the customer
   * @apiParam {String} city City of the customer
   * @apiParam {Number} phone_number Phone number of the customer
   * @apiParam {Object[]} orders List of orders objects
   *
   * @apiHeader {String} x-access-token= <code>Token</code> JWT Token as "Token"
   *
   * @apiSuccess {String} json-response Customer updated!
   * @apiError 400 Error
   * @apiError 403 Unauthorized
   */
  app.patch(
    "/customer/update",
    [authJwt.verifyToken],
    controller.updateCustomerById
  );

  //get restaurant by id
  //needs verify token and a controller which will return selected restaurant data

  /**
   * @api {get} http://localhost:5000/customer/get/restaurant/:id Get restaurant by restaurant id
   * @apiName GetRestaurantById
   * @apiGroup Customer
   *
   * @apiParam {String} id Restaurant id
   * @apiHeader {String} x-access-token= <code>Token</code> JWT Token as "Token"
   *
   *  @apiSuccess {Object} Restaurant object
   * @apiError 400 Error
   * @apiError 403 Unauthorized
   */
  app.get(
    "/customer/get/restaurant/:id",
    [authJwt.verifyToken],
    controller.getRestaurantById
  );

  //ignore

  // app.get("/customers/user", [authJwt.verifyToken], controller.userBoard);
};
