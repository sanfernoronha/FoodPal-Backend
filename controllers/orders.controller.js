let Order = require("../models/order.model");

exports.getAllOrders = (req, res) => {
  Order.find().then((orders) => {
    if (orders) {
      return res.status(200).json(orders);
    } else {
      return res.status(404).json("Orders Not Found");
    }
  });
};

exports.getOrderById = (req, res) => {
  Order.findById(req.params.id)
    .then((order) => {
      if (order) {
        return res.status(200).json(order);
      } else {
        return res.status(404).json("Order Not Found");
      }
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.getOrderByRestaurantId = (req, res) => {
  Order.find({ "restaurantId": req.userId }).then((orders) => {
    if (orders) {
      return res.status(200).json(orders)
    } else {
      return res.status(404).json("No orders found for this restaurant")
    }
  })
}

exports.getOrderByCustomerId = (req, res) => {
  Order.find({ "userId": req.userId }).then((orders) => {
    if (orders) {
      return res.status(200).json(orders)
    } else {
      return res.status(404).json("No orders found for this customer")
    }
  })
}

exports.addOrder = (req, res) => {
  const userId = req.userId; //from token
  const restaurantId = req.body.restaurantId; //from body
  const tableNumber = req.body.tableNumber;
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
      itemId: order.itemId,
      isPrepared: false,
      isPreparing: false,
      isServed: false,
    });
  });

  const newOrder = new Order({
    userId,
    restaurantId,
    tableNumber,
    total,
    isPaid,
    items,
  });

  newOrder
    .save()
    .then(() => res.status(200).json("Order added!"))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.updateOrder = (req, res) => {
  //restaurant id from token
  //order id from param
  //item id from body
  //update code from body

  //update codes
  //1 - isPrepared
  //2 - isPreparing
  //3 - isServed

  //step 1 get the order
  Order.findById(req.params.id).then((order) => {
    if (order) {
      //got order
      var items = order.items;
      var found_item_index = items.findIndex(
        (item) => item._id.toString() === req.body._id
      ); //find item index from items array with status to be updated
      console.log(found_item_index);

      if (req.body.update_code === 1) {
        // set isPrepared of this item to true

        order.items[found_item_index].isPrepared = true;
      } else if (req.body.update_code === 2) {
        order.items[found_item_index].isPrepared = true;
        order.items[found_item_index].isPreparing = true;
      } else if (req.body.update_code === 3) {
        order.items[found_item_index].isPrepared = true;
        order.items[found_item_index].isPreparing = true;
        order.items[found_item_index].isServed = true;

        //check all order items to see if all order items are served (isServed === true)
        var flag = true; //if it remains true after looping, all items served
        order.items.forEach((item) => {
          if (item.isServed === false) {
            //if any false encounted, set flag to false; if true then keep going
            flag = false;
          }
        });
        if (flag == true) {
          //flag remained true; order completely served
          order.isPaid = true;
        }
      }

      order
        .save()
        .then(() => res.status(200).json("Order updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    } else {
      return res.status(404).json("Order Not Found");
    }
  });
};
