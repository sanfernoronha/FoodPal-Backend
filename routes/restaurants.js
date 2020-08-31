const router = require('express').Router();
// const restaurant = require('../models/restaurant.model');
let Restaurant = require('../models/restaurant.model');

router.route('/').get((req,res) =>{
    Restaurant.find()
    .then(restaurant => res.json(restaurant))
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
    .then(() => res.json('Restaurant added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/:id').get((req,res) => {
    Restaurant.findById(req.params.id)
    .then(restaurant => res.json(restaurant))
    .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/:id').delete((req,res) => {
    Restaurant.findByIdAndDelete(req.params.id)
    .then(() => res.json('Restaurant deleted'))
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
        .then(() => res.json('Restaurant updated!'))
        .catch(err => res.status(400).json('Error: ' + err));

    })
})




module.exports = router;