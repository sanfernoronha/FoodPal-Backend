const router = require("express").Router();
let Order = require("../models/order.model");

/**
 * @api {get} http://localhost:5000/orders/ Get orders
 * @apiName GetOrders
 * @apiGroup Order
 *
 * @apiSuccess {Object[]} orders List of orders
 * @apiError 400 Error
 * @apiError 403 Unauthorized
 */
router.route("/").get((req, res) => {
  Order.find()
    .then((order) => res.status(200).json(order))
    .catch((err) => res.status(400).json("Error: " + err));
});

/**
 * @api {get} http://localhost:5000/orders/:id Get Order by id
 * @apiName GetOrderById
 * @apiGroup Order
 *
 * @apiParam {String} id Order id
 *
 * @apiSuccess {Object} Order object
 * @apiError 400 Error
 * @apiError 403 Unauthorized
 *
 */
router.route("/:id").get((req, res) => {
  Order.findById(req.params.id)
    .then((order) => res.status(200).json(order))
    .catch((err) => res.status(400).json("Error: " + err));
});

/**
 * @api {post} http://localhost:5000/orders/add Add Order
 * @apiName AddOrder
 * @apiGroup Order
 *
 * @apiParam {String} userId Id of the user making the order
 * @apiParam {String} restaurantId Id of the restaurant taking the order
 * @apiParam {String} tableNumber Table number to be served
 * @apiParam {Object[]} items Items ordered
 * @apiParam {String} items[itemName] Name of the item
 * @apiParam {String} items[quantity] Quantity of the ordered item
 * @apiParam {Number} items[price] Price of the item
 *
 * @apiSuccess {String} json-response Order placed!
 * @apiError 400 Error
 * @apiError 403 Unauthorized
 */
router.route("/add").post((req, res) => {
  const userId = req.body.userId;
  const restaurantId = req.body.restaurantId;
  const tableNumber = req.body.tableNumber;
  const isPrepared = false;
  const isPreparing = false;
  const isServed = false;
  const isPaid = false;
  var total = 0.0;
  var items = [];
  var orderedItems = req.body.items;
  orderedItems.forEach((order) => {
    total += order.quantity * order.price;
    items.push({
      itemName: order.itemName,
      quantity: order.quantity,
      price: order.price,
    });
  });

  const newOrder = new Order({
    userId,
    restaurantId,
    tableNumber,
    isPrepared,
    isPreparing,
    isServed,
    total,
    isPaid,
    items,
  });

  newOrder
    .save()
    .then(() => res.status(200).json("Order added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
