const router = require('express').Router();
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





module.exports = router;