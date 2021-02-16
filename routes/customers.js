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
   * @api {get} http://localhost:5000/customers/:id Get Customer by Id
   * @apiName GetCustomerById
   * @apiGroup Customer
   *
   * @apiParam {String} id Customer id
   *
   * @apiSuccess {Object} Customer object
   * @apiError 400 Error
   * @apiError 403 Unauthorized
   *
   */
  app.get("/customers/:id", [authJwt.verifyToken, controller.getCustomerById]);

  /**
   * @api {delete} http://localhost:5000/customers/:id Delete Customer by Id
   * @apiName DeleteCustomerById
   * @apiGroup Customer
   *
   * @apiParam {String} id Customer id
   *
   * @apiSuccess {String} json-response Customer deleted!
   * @apiError 400 Error
   * @apiError 403 Unauthorized
   */
  app.delete("/customers/:id", [
    authJwt.verifyToken,
    controller.deleteCustomerById,
  ]);

  /**
   * @api {patch} http://localhost:5000/customers/:id Update Customer by Id
   * @apiName UpdateCustomerById
   * @apiGroup Customer
   *
   * @apiParam {String} id Customer id
   *
   * @apiParam {String} name Name of the customer
   * @apiParam {String} email Email of the customer
   * @apiParam {String} password Password of the customer
   * @apiParam {String} city City of the customer
   * @apiParam {Number} phone_number Phone number of the customer
   * @apiParam {Object[]} orders List of orders objects
   *
   * @apiSuccess {String} json-response Customer updated!
   * @apiError 400 Error
   * @apiError 403 Unauthorized
   */
  app.patch(
    "/customers/:id",
    [authJwt.verifyToken],
    controller.updateCustomerById
  );

  // app.get("/customers/user", [authJwt.verifyToken], controller.userBoard);
};
