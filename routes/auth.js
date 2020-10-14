const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller.js");


module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });

    /**
     * @api {post} http://localhost:5000/api/auth/signup Customer signup
     * @apiName Customer Signup
     * @apiGroup Customer
     * 
     * @apiParam {String} name Name of the customer
     * @apiParam {String} email Email of the customer
     * @apiParam {String} password Password of the customer (Min Length <code>4</code>)
     * @apiParam {String} [city] City of the customer 
     * @apiParam {Number} phone_number Phone number of the customer
     * 
     * @apiSuccess {String} json-response Customer Added
     * @apiError 400 Error
     */
    app.post(
      "/api/auth/signup",
      [
        verifySignUp.checkDuplicateUsernameOrEmail
      ],
      controller.signup
    );

    /**
     * @api {post} http://localhost:5000/api/auth/signin Customer signin
     * @apiGroup Customer
     * 
     * @apiParam {String} name Name of the customer
     * @apiParam {String} password Password of the customer (Min Length <code>4</code>)
     * 
     * @apiSuccess {Object} json-response Customer
     * @apiError 404 User not found
     * @apiError 401 Password incorrect
     * @apiError 500 Error
     */
    app.post("/api/auth/signin",controller.signin);

  
    
  };