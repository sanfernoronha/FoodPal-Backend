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
  //  * @apiParam {Object[]} orders Array of orders
  //  * @apiParam {Object[]} orders[items] Array containing ordered items
  //  * @apiParam {String} items[itemName] Name of the item
  //  * @apiParam {Number} items[quantity] Quantity ordered of the item
  //  * @apiParam {Number} items[price] Price of item
  //  * @apiParam {Number} orders[tableNumber] Table number
  //  * @apiParam {Boolean} orders[isPrepared] Preparation status of item
  //  * @apiParam {Boolean} orders[isPreparing] Preparation commencement status
  //  * @apiParam {Boolean} orders[isServed] Service Status of the item
  //  * @apiParam {Number} orders[total] Total bill amount
  //  * @apiParam {Boolean} orders[isPaid] Payment status of order
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
};
