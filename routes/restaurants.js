const router = require('express').Router();
// const restaurant = require('../models/restaurant.model');
let Restaurant = require('../models/restaurant.model');


/**
 * @swagger
 * /restaurant:
 *  get:
 *      description: Used to get restaurants
 *      responses:
 *          '200':
 *              description: All restaurants in JSON format
 *          '400':
 *              description: Error
 */
router.route('/').get((req,res) =>{
    Restaurant.find()
    .then(restaurant => res.status(200).json(restaurant))
    .catch(err => res.status(400).json('Error: '+ err));
});

/**
 * @swagger
 * /restaurant/add:
 *  post:
 *      description: Used to add a new restaurant
 *      parameters:
 *          -   name: name
 *              description: Name of the restaurant
 *              required: true,
 *              type: string 
 *          -   name: city
 *              description: Name of the city
 *              required: true,
 *              type: string
 *          -   name: orders
 *              description: List of orders
 *              type: list
 *          -   name: menu
 *              description: List of menu sections
 *              type: list
 *          -   name: tables
 *              description: List of tables
 *              type: list
 *      responses:
 *          '200':
 *              description: Success message
 *          '400':
 *              description: Error
 *              
 *                  
 */
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


/**
 * @swagger
 * /restaurant/:id:
 *  get:
 *      description: Used to get one restaurant by id
 *      parameters:
 *          -   name: id
 *              description: Restaurant id
 *              required: true
 *              type: string
 *      responses:
 *          '200':
 *              description: Restaurant in JSON format
 *          '400':
 *              description: Error
 */
router.route('/:id').get((req,res) => {
    Restaurant.findById(req.params.id)
    .then(restaurant => res.status(200).json(restaurant))
    .catch(err => res.status(400).json('Error: '+ err));
});

/**
 * @swagger
 * /restaurant/:id:
 *  delete:
 *      description: Used to delete one restaurant by id
 *      parameters:
 *          -   name: id
 *              description: Restaurant id
 *              required: true
 *              type: string
 *      responses:
 *          '200':
 *              description: Delete message
 *          '400':
 *              description: Error
 */
router.route('/:id').delete((req,res) => {
    Restaurant.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).json('Restaurant deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
});


/**
 * @swagger
 * /restaurant/:id:
 *  patch:
 *      description: Used to update a restaurant by id
 *      parameters:
 *          -   name: id
 *              description: Restaurant id
 *              required: true
 *              type: string
 *          -   name: name
 *              description: Name of the restaurant
 *              required: true,
 *              type: string 
 *          -   name: city
 *              description: Name of the city
 *              required: true,
 *              type: string
 *          -   name: orders
 *              description: List of orders
 *              type: list
 *          -   name: menu
 *              description: List of menu sections
 *              type: list
 *          -   name: tables
 *              description: List of tables
 *              type: list
 *      responses:
 *          '200':
 *              description: Success message
 *          '400':
 *              description: Error
 *              
 *                  
 */
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




module.exports = router;