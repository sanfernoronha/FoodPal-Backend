// const router = require("express").Router();

const { authJwt } = require("../middlewares");
const controller = require("../controllers/orders.controller");
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  /**
   * @api {get} http://localhost:5000/orders/all Get all orders
   * @apiName Get all orders
   * @apiGroup Order
   * @apiHeader {String} x-access-token= <code>Token</code> JWT Token as "Token"
   *
   * @apiSuccess {Object[]} orders List of orders
   * @apiError 400 Error
   * @apiError 403 Unauthorized
   */
  app.get("/orders/all", [authJwt.verifyToken], controller.getAllOrders);

  /**
   * @api {get} http://localhost:5000/orders/:id Get Order by Id
   * @apiName Get order by id
   * @apiGroup Order
   *
   * @apiParam {String} id Order id
   * @apiHeader {String} x-access-token= <code>Token</code> JWT Token as "Token"
   *
   * @apiSuccess {Object} Order object
   * @apiError 400 Error
   * @apiError 403 Unauthorized
   *
   */
  app.get("/orders/get/:id", [authJwt.verifyToken], controller.getOrderById);

  /**
   * @api {post} http://localhost:5000/orders/add Add Order
   * @apiName Add order
   * @apiGroup Order
   *
   * @apiHeader {String} x-access-token= <code>Token</code> JWT Token as "Token"
   *
   *
   * @apiParam {String} restaurantId Id of the restaurant taking the order
   * @apiParam {Number} tableNumber Table number to be served
   * @apiParam {Object[]} items Items ordered
   * @apiParam {String} items[itemName] Name of the item
   * @apiParam {String} items[itemId] Id of item in restaurant menu
   * @apiParam {Number} items[quantity] Quantity of the ordered item
   * @apiParam {Number} items[price] Price of the item
   *
   * @apiSuccess {String} json-response Order placed!
   * @apiError 400 Error
   * @apiError 403 Unauthorized
   */
  app.post("/orders/add", [authJwt.verifyToken], controller.addOrder);

  /**
   * @api {patch} http://localhost:5000/orders/update/:id Update order
   * @apiName Update order
   * @apiGroup Restaurant
   *
   * @apiHeader {String} x-access-token= <code>Token</code> JWT Token as "Token"
   *
   * @apiParam {String} id Id of order passed in url
   * @apiParam {String} _id Item id of item in an order
   * @apiParam {Number} update_code Update code <code>1 - isPrepared; 2 - isPreparing; 3 - isServed;</code>
   *
   * @apiSuccess {String} json-response Order updated!
   * @apiError 400 Error
   * @apiError 403 Unauthorized
   */
  app.patch(
    "/orders/update/:id",
    [authJwt.verifyToken],
    controller.updateOrder
  );

  /**
   * @api {get} http://localhost:5000/orders/restaurant Get orders by restuarant id 
   * @apiName Get restaurant by id
   * @apiGroup Order
   * 
   * @apiHeader {String} x-access-token= <code>Token</code> JWT Token as "Token"
   * 
   * @apiSuccess {Object[]} orders List of orders by restaurant id
   * @apiError 400 Error
   * @apiError 403 Unauthorized
   * 
   * */
  app.get("/orders/restaurant", [authJwt.verifyToken], controller.getOrderByRestaurantId)
  /**
     * @api {get} http://localhost:5000/orders/restaurant Get orders by customer id
     * @apiName Get customer by id
     * @apiGroup Order
     *
     * @apiHeader {String} x-access-token= <code>Token</code> JWT Token as "Token"
     *
     * @apiSuccess {Object[]} orders List of orders by customer id
     * @apiError 400 Error
     * @apiError 403 Unauthorized
     *
     * */
  app.get("/orders/customer", [authJwt.verifyToken], controller.getOrderByCustomerId)
};



//ignore for now

// router.route("/").get((req, res) => {
//   Order.find()
//     .then((order) => res.status(200).json(order))
//     .catch((err) => res.status(400).json("Error: " + err));
// });

// router.route("/:id").get((req, res) => {
//   Order.findById(req.params.id)
//     .then((order) => res.status(200).json(order))
//     .catch((err) => res.status(400).json("Error: " + err));
// });

// router.route("/add").post((req, res) => {
//   const userId = req.body.userId;
//   const restaurantId = req.body.restaurantId;
//   const tableNumber = req.body.tableNumber; //table number sounds better
//   const isPaid = false;
//   var total = 0.0;
//   var items = [];
//   var orderedItems = req.body.items;
//   orderedItems.forEach((order) => {
//     total += order.quantity * order.price;
//     items.push({
//       itemName: order.itemName,
//       quantity: order.quantity,
//       price: order.price,
//       isPrepared: false,
//       isPreparing: false,
//       isServed: false,
//     });
//   });

//   const newOrder = new Order({
//     userId,
//     restaurantId,
//     tableNumber,
//     total,
//     isPaid,
//     items,
//   });

//   newOrder
//     .save()
//     .then(() => res.status(200).json("Order added!"))
//     .catch((err) => res.status(400).json("Error: " + err));
// });

// router.route("/updateStatus/:id/:Iid").patch(async (req, res) => {
//   Order.findById(req.params.id).then(async (order) => {
//     console.log("Milaa");
//     const item = await order.findOne({ _id: req.params.Iid });
//     item.specials.update({
//       isPreparing: req.body.isPreparing,
//     });

//     const updated = await item
//       .save()
//       .then(() => res.status(200), json("Item Updated"))
//       .catch((err) => res.status(400).json("Error: " + err));
//     console.log(updated);
//   });
// });
// Article.update({'comments._id': comment_id},
//       {'$set': {
//              'comments.$.post': "this is Update comment",
// 	   }},
//           function(err,model) {
// 	   	if(err){
//         	console.log(err);
//         	return res.send(err);
//         }
//         return res.json(model);
//  });

// module.exports = router;

//http://localhost:5000/orders/updateSt/5f717e1fb7f85037e80ce555
