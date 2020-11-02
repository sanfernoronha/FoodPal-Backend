const router = require("express").Router();
// const restaurant = require('../models/restaurant.model');
let Restaurant = require("../models/restaurant.model");

/**
 * @api {get} http://localhost:5000/restaurants/ Get restaurants
 * @apiName GetRestaurants
 * @apiGroup Restaurant
 *
 * @apiSuccess {Object[]} restaurants List of restaurants
 * @apiError 400 Error
 * @apiError 403 Unauthorized
 */
router.route("/").get((req, res) => {
  Restaurant.find()
    .then((restaurant) => res.status(200).json(restaurant))
    .catch((err) => res.status(400).json("Error: " + err));
});

/**
 * @api {post} http://localhost:5000/restaurants/add Add restaurants
 * @apiName AddRestaurants
 * @apiGroup Restaurant
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
 * @apiSuccess {String} json-response Restaurant added!
 * @apiError 400 Error
 * @apiError 403 Unauthorized
 */
router.route("/add").post((req, res) => {
  const name = req.body.name;
  const city = req.body.city;
  const orders = null;
  const menu = req.body.menu;
  const tables = req.body.tables;

  const newRestaurant = new Restaurant({
    name,
    city,
    orders,
    menu,
    tables,
  });

  newRestaurant
    .save()
    .then(() => res.status(200).json("Restaurant added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

/**
 * @api {get} http://localhost:5000/restaurants/:id Get Restaurant by id
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
router.route("/:id").get((req, res) => {
  Restaurant.findById(req.params.id)
    .then((restaurant) => res.status(200).json(restaurant))
    .catch((err) => res.status(400).json("Error: " + err));
});

/**
 * @api {delete} http://localhost:5000/restaurants/:id Delete Restaurant by Id
 * @apiName DeleteRestaurantById
 * @apiGroup Restaurant
 *
 * @apiParam {String} id Restaurant id
 *
 * @apiSuccess {String} json-response Restaurant deleted!
 * @apiError 400 Error
 * @apiError 403 Unauthorized
 */
router.route("/:id").delete((req, res) => {
  Restaurant.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).json("Restaurant deleted"))
    .catch((err) => res.status(400).json("Error: " + err));
});

/**
 * @api {patch} http://localhost:5000/restaurants/:id Update Restaurant by Id
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
router.route("/:id").patch((req, res) => {
  Restaurant.findById(req.params.id).then((restaurant) => {
    restaurant.name = req.body.name;
    restaurant.city = req.body.city;
    restaurant.orders = req.body.orders;
    restaurant.menu = req.body.menu;
    restaurant.tables = req.body.tables;

    restaurant
      .save()
      .then(() => res.status(200).json("Restaurant updated!"))
      .catch((err) => res.status(400).json("Error: " + err));
  });
});

/**
 * @api {post} http://localhost:5000/restaurants/order Add orders at restaurant
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
router.route("/order").post((req, res) => {
  Restaurant.findById(req.body.res_id).then((restaurant) => {
    var total_price = 0.0;
    var final_orders = [];

    var orders = req.body.items;
    orders.forEach((order) => {
      total_price += order.quantity * order.price;
      final_orders.push({
        itemName: order.name,
        quantity: order.quantity,
        price: order.price,
      });
    });

    if (restaurant.orders == null) {
      restaurant.orders = [];
    }

    restaurant.orders.push({
      tableNumber: req.body.table_no,
      
      total: total_price,
      isPaid: false,
      items: final_orders,
    });

    restaurant
      .save()
      .then(() => res.status(200).json("Order placed!"))
      .catch((err) => res.status(400).json("Error: " + err));
  });
});

module.exports = router;
