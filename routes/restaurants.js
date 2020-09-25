const router = require('express').Router();
// const restaurant = require('../models/restaurant.model');
let Restaurant = require('../models/restaurant.model');


/**
 * @api {get} http://localhost:5000/restaurant/ Get restaurants
 * @apiName GetRestaurants
 * @apiGroup Restaurant
 * 
 * @apiSuccess {Object[]} restaurants List of restaurants
 * @apiError 400 Error
 * @apiError 403 Unauthorized
 * 
 * 
 */
router.route('/').get((req,res) =>{
    Restaurant.find()
    .then(restaurant => res.status(200).json(restaurant))
    .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/add').post((req,res) => {
    const name = req.body.name;
    const city = req.body.city;
    const orders = null
    const menu = req.body.menu;
    const tables = req.body.tables;

    const newRestaurant = new Restaurant({
        name,
        city,
        orders,
        menu,
        tables,
    });


    newRestaurant.save()
    .then(() => res.status(200).json('Restaurant added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/:id').get((req,res) => {
    Restaurant.findById(req.params.id)
    .then(restaurant => res.status(200).json(restaurant))
    .catch(err => res.status(400).json('Error: '+ err));
});


router.route('/:id').delete((req,res) => {
    Restaurant.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).json('Restaurant deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').patch((req,res) => {
    Restaurant.findById(req.params.id)
    .then(restaurant => {
        restaurant.name = req.body.name;
        restaurant.city = req.body.city;
        restaurant.orders = req.body.orders;
        restaurant.menu = req.body.menu;
        restaurant.tables = req.body.tables;

        restaurant.save()
        .then(() => res.status(200).json('Restaurant updated!'))
        .catch(err => res.status(400).json('Error: ' + err));

    })
});

router.route('/order').post((req,res) => {
    Restaurant.findById(req.body.res_id)
    .then(restaurant => {
        var total_price = 0.0;
        var final_orders = [];

        var orders = req.body.items;
        orders.forEach( order => {
            total_price += order.quantity * order.price;
            final_orders.push({
                itemName: order.name,
                quantity: order.quantity,
                price: order.price
            });
        });

        

        
        if(restaurant.orders == null){
            restaurant.orders = [];
        }
        

        restaurant.orders.push({
            tableNumber: req.body.table_no,
            isPrepared: false,
            isPreparing: false,
            isServed: false,
            total: total_price,
            isPaid: false,
            items: final_orders
        });

        restaurant.save()
        .then(() => res.status(200).json('Order placed'))
        .catch(err => res.status(400).json('Error: ' + err));
    });
});




module.exports = router;