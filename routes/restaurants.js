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
   * @api {get} http://localhost:5000/restaurant/ Get restaurants
   * @apiName GetRestaurants
   * @apiGroup Restaurant
   *
   * @apiSuccess {Object[]} restaurants List of restaurants
   * @apiError 400 Error
   * @apiError 403 Unauthorized
   */
  app.get("/restaurant/", [authJwt.verifyToken], controller.getAllRestaurants);

  /**
   * @api {get} http://localhost:5000/restaurant/:id Get Restaurant by Id
   * @apiName GetUserById
   * @apiGroup Restaurant
   *
   * @apiParam {String} id Restaurant id
   *
   * @apiSuccess {Object} Restaurant object
   * @apiError 400 Error
   * @apiError 403 Unauthorized
   *
   */
  app.get("/restaurant/:id", [
    authJwt.verifyToken,
    controller.getRestaurantById,
  ]);

  /**
   * @api {delete} http://localhost:5000/restaurant/:id Delete Restaurant by Id
   * @apiName DeleteRestaurantById
   * @apiGroup Restaurant
   *
   * @apiParam {String} id Restaurant id
   *
   * @apiSuccess {String} json-response Restaurant deleted!
   * @apiError 400 Error
   * @apiError 403 Unauthorized
   */
  app.delete("/restaurant/:id", [
    authJwt.verifyToken,
    controller.deleteRestaurantById,
  ]);

  /**
   * @api {patch} http://localhost:5000/restaurant/:id Update Restaurant by Id
   * @apiName UpdateRestaurantById
   * @apiGroup Restaurant
   *
   * @apiParam {String} id Restaurant id
   *
   * @apiParam {String} name Name of the Restaurant
   * @apiParam {String} city City where restaurant is located
   * @apiParam {Object[]} orders Array of orders
   * @apiParam {Object[]} orders[items] Array containing ordered items
   * @apiParam {String} items[itemName] Name of the item
   * @apiParam {Number} items[quantity] Quantity ordered of the item
   * @apiParam {Number} items[price] Price of item
   * @apiParam {Number} orders[tableNumber] Table number
   * @apiParam {Boolean} orders[isPrepared] Preparation status of item
   * @apiParam {Boolean} orders[isPreparing] Preparation commencement status
   * @apiParam {Boolean} orders[isServed] Service Status of the item
   * @apiParam {Number} orders[total] Total bill amount
   * @apiParam {Boolean} orders[isPaid] Payment status of order
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
    "/restaurant/:id",
    [authJwt.verifyToken],
    controller.updateRestaurantById
  );

  /**
   * @api {post} http://localhost:5000/restaurant/order Add orders at restaurant
   * @apiName AddOrders
   * @apiGroup Restaurant
   *
   * @apiParam {String} res_id Id of the restaurant
   * @apiParam {Object[]} orders Array of orders
   * @apiParam {Object[]} orders[items] Array containing ordered items
   * @apiParam {String} items[itemName] Name of the item
   * @apiParam {Number} items[quantity] Quantity ordered of the item
   * @apiParam {Number} items[price] Price of item
   * @apiParam {Number} orders[tableNumber] Table number
   * @apiParam {Boolean} orders[isPrepared] Preparation status of item
   * @apiParam {Boolean} orders[isPreparing] Preparation commencement status
   * @apiParam {Boolean} orders[isServed] Service Status of the item
   * @apiParam {Number} orders[total] Total bill amount
   * @apiParam {Boolean} orders[isPaid] Payment status of order
   *
   * @apiSuccess {String} json-response Order placed!
   * @apiError 400 Error
   * @apiError 403 Unauthorized
   */
  app.post("/restaurant/order", [authJwt.verifyToken], controller.addOrders);
};
