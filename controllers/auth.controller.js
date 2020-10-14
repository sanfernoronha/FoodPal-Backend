const config = require('../config/auth.config');
const Customer = require('../models/customer.model');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

exports.signup = (req,res) => {
    
    const customer = new Customer({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password,8),
        city: req.body.city,
        phone_number: req.body.phone_number,
        orders : null
    });

    customer.save().then(() => res.status(200).json("Customer added!")).catch((err) => res.status(400).json("Error: " + err));
};

exports.signin = (req,res) => {
    Customer.findOne({
        name: req.body.name
    })
    .exec((err,customer) => {
        if(err){
            res.status(500).send({ message: err });
            return;
        }

        if(!customer){
            return res.status(404).send({ message: "User Not found." });
        }


        var passwordIsValid = bcrypt.compareSync(req.body.password,customer.password);

        if(!passwordIsValid){
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
              });
        }

        var token = jwt.sign({ id: customer.id }, config.secret,{ expiresIn: 86400});

        res.status(200).send({
            id: customer._id,
            name: customer.name,
            email: customer.email,
            accessToken: token
        });
    });
};