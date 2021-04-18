const { authJwt } = require("../middlewares");
const controller = require("../controllers/restaurant.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  /**
   * @api {get} http://localhost:5000/restaurant/all Get restaurants
   * @apiName GetRestaurants
   * @apiGroup Restaurant
   *
   * @apiSuccess {Object[]} restaurants List of restaurants
   * @apiError 400 Error
   * @apiError 403 Unauthorized
   */
  app.get(
    "/restaurant/all",
    [authJwt.verifyToken],
    controller.getAllRestaurants
  );

  /**
   * @api {get} http://localhost:5000/restaurant/get Get Restaurant
   * @apiName GetRestaurant
   * @apiGroup Restaurant
   *
   * @apiHeader {String} x-access-token= <code>Token</code> JWT Token as "Token"
   *
   * @apiSuccess {Object} Restaurant object
   * @apiError 400 Error
   * @apiError 403 Unauthorized
   *
   */
  app.get("/restaurant/get", [
    authJwt.verifyToken,
    controller.getRestaurantById,
  ]);

  /**
   * @api {delete} http://localhost:5000/restaurant/delete Delete Restaurant
   * @apiName DeleteRestaurant
   * @apiGroup Restaurant
   *
   * @apiHeader {String} x-access-token= <code>Token</code> JWT Token as "Token"
   *
   * @apiSuccess {String} json-response Restaurant deleted!
   * @apiError 400 Error
   * @apiError 403 Unauthorized
   */
  app.delete("/restaurant/delete", [
    authJwt.verifyToken,
    controller.deleteRestaurantById,
  ]);

  /**
   * @api {patch} http://localhost:5000/restaurant/update Update Restaurant
   * @apiName UpdateRestaurant
   * @apiGroup Restaurant
   *
   * @apiHeader {String} x-access-token= <code>Token</code> JWT Token as "Token"
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
   * @apiSuccess {String} json-response Restaurant updated!
   * @apiError 400 Error
   * @apiError 403 Unauthorized
   */
  app.patch(
    "/restaurant/update",
    [authJwt.verifyToken],
    controller.updateRestaurantById
  );
  /**
   * @api {post} http://localhost:5000/restaurant/table/add Add table
    * @apiName Add Table
    * @apiGroup Restaurant
    *
    * @apiHeader {String} x-access-token= <code>Token</code> JWT Token as "Token"
    * 
    * @apiParam {String} qrlink QR link of table
    * @apiParam {Number} capacity Capacity of table
    * @apiParam {Number} tableNumber Table Number
    * @apiSuccess {String} json-response Table added
    * @apiError 400 Error
    * @apiError 403 Unauthorized
   */
  app.post(
    "/restaurant/table/add",
    [authJwt.verifyToken],
    controller.addTable
  )
  /**
  * @api {patch} http://localhost:5000/restaurant/table/update Update table
   * @apiName Update Table
   * @apiGroup Restaurant
   *
   * @apiHeader {String} x-access-token= <code>Token</code> JWT Token as "Token"
   *
   * @apiParam {String} _id Id of table
   * @apiParam {String} qrlink QR link of table
   * @apiParam {Number} capacity Capacity of table
   * @apiParam {Number} tableNumber Table Number
   * @apiSuccess {String} json-response Table updated
   * @apiError 400 Error
   * @apiError 403 Unauthorized
  */
  app.patch(
    "/restaurant/table/update",
    [authJwt.verifyToken],
    controller.updateTable
  )
};
