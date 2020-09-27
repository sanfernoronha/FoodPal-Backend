define({ "api": [
  {
    "type": "put",
    "url": "http://localhost:5000/customers/add",
    "title": "Add customer",
    "name": "AddCustomer",
    "group": "Customer",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the customer</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email Id of the customer</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "city",
            "description": "<p>City of the customer</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "phone_number",
            "description": "<p>Phone number of the customer</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "success_msg",
            "description": "<p>Customer added</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Error</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/customers.js",
    "groupTitle": "Customer"
  },
  {
    "type": "post",
    "url": "http://localhost:5000/restaurant/order",
    "title": "Add orders at restaurant",
    "name": "AddOrders",
    "group": "Restaurant",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "res_id",
            "description": "<p>Id of the restaurant</p>"
          },
          {
            "group": "Parameter",
            "type": "Object[]",
            "optional": false,
            "field": "orders",
            "description": "<p>Array of orders</p>"
          },
          {
            "group": "Parameter",
            "type": "Object[]",
            "optional": false,
            "field": "orders[items]",
            "description": "<p>Array containing ordered items</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "items[itemName]",
            "description": "<p>Name of the item</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "items[quantity]",
            "description": "<p>Quantity ordered of the item</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "items[price]",
            "description": "<p>Price of item</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "orders[tableNumber]",
            "description": "<p>Table number</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "orders[isPrepared]",
            "description": "<p>Preparation status of item</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "orders[isPreparing]",
            "description": "<p>Preparation commencement status</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "orders[isServed]",
            "description": "<p>Service Status of the item</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "orders[total]",
            "description": "<p>Total bill amount</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "orders[isPaid]",
            "description": "<p>Payment status of order</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "json-response",
            "description": "<p>Order placed!</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Error</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "403",
            "description": "<p>Unauthorized</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/restaurants.js",
    "groupTitle": "Restaurant"
  },
  {
    "type": "post",
    "url": "http://localhost:5000/restaurants/add",
    "title": "Add restaurants",
    "name": "AddRestaurants",
    "group": "Restaurant",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the Restaurant</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "city",
            "description": "<p>City where restaurant is located</p>"
          },
          {
            "group": "Parameter",
            "type": "Object[]",
            "optional": false,
            "field": "orders",
            "description": "<p>Array of orders</p>"
          },
          {
            "group": "Parameter",
            "type": "Object[]",
            "optional": false,
            "field": "orders[items]",
            "description": "<p>Array containing ordered items</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "items[itemName]",
            "description": "<p>Name of the item</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "items[quantity]",
            "description": "<p>Quantity ordered of the item</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "items[price]",
            "description": "<p>Price of item</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "orders[tableNumber]",
            "description": "<p>Table number</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "orders[isPrepared]",
            "description": "<p>Preparation status of item</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "orders[isPreparing]",
            "description": "<p>Preparation commencement status</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "orders[isServed]",
            "description": "<p>Service Status of the item</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "orders[total]",
            "description": "<p>Total bill amount</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "orders[isPaid]",
            "description": "<p>Payment status of order</p>"
          },
          {
            "group": "Parameter",
            "type": "Object[]",
            "optional": false,
            "field": "menu",
            "description": "<p>Array of menu objects</p>"
          },
          {
            "group": "Parameter",
            "type": "Object[]",
            "optional": false,
            "field": "menu[items]",
            "description": "<p>Array of item objects in the menu</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "items[name]",
            "description": "<p>Name of the item</p>"
          },
          {
            "group": "Parameter",
            "type": "Object[]",
            "optional": false,
            "field": "tables",
            "description": "<p>Array of table objects</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "tables[qrlink]",
            "description": "<p>Link to the url of the table</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "tables[capacity]",
            "description": "<p>Customer capacity of the table</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "json-response",
            "description": "<p>Restaurant added!</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Error</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "403",
            "description": "<p>Unauthorized</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/restaurants.js",
    "groupTitle": "Restaurant"
  },
  {
    "type": "delete",
    "url": "http://localhost:5000/restaurant/:id",
    "title": "Delete Restaurant by Id",
    "name": "DeleteRestaurantById",
    "group": "Restaurant",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "json-response",
            "description": "<p>Restaurant deleted!</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Error</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "403",
            "description": "<p>Unauthorized</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/restaurants.js",
    "groupTitle": "Restaurant"
  },
  {
    "type": "get",
    "url": "http://localhost:5000/restaurants/",
    "title": "Get restaurants",
    "name": "GetRestaurants",
    "group": "Restaurant",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "restaurants",
            "description": "<p>List of restaurants</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Error</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "403",
            "description": "<p>Unauthorized</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/restaurants.js",
    "groupTitle": "Restaurant"
  },
  {
    "type": "get",
    "url": "http://localhost:5000/restaurant/:id",
    "title": "Get Restaurant by id",
    "name": "GetUserById",
    "group": "Restaurant",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Restaurant",
            "description": "<p>object</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Error</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "403",
            "description": "<p>Unauthorized</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/restaurants.js",
    "groupTitle": "Restaurant"
  },
  {
    "type": "patch",
    "url": "http://localhost:5000/restaurant/:id",
    "title": "Update Restaurant by Id",
    "name": "UpdateRestaurantById",
    "group": "Restaurant",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the Restaurant</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "city",
            "description": "<p>City where restaurant is located</p>"
          },
          {
            "group": "Parameter",
            "type": "Object[]",
            "optional": false,
            "field": "orders",
            "description": "<p>Array of orders</p>"
          },
          {
            "group": "Parameter",
            "type": "Object[]",
            "optional": false,
            "field": "orders[items]",
            "description": "<p>Array containing ordered items</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "items[itemName]",
            "description": "<p>Name of the item</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "items[quantity]",
            "description": "<p>Quantity ordered of the item</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "items[price]",
            "description": "<p>Price of item</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "orders[tableNumber]",
            "description": "<p>Table number</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "orders[isPrepared]",
            "description": "<p>Preparation status of item</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "orders[isPreparing]",
            "description": "<p>Preparation commencement status</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "orders[isServed]",
            "description": "<p>Service Status of the item</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "orders[total]",
            "description": "<p>Total bill amount</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "orders[isPaid]",
            "description": "<p>Payment status of order</p>"
          },
          {
            "group": "Parameter",
            "type": "Object[]",
            "optional": false,
            "field": "menu",
            "description": "<p>Array of menu objects</p>"
          },
          {
            "group": "Parameter",
            "type": "Object[]",
            "optional": false,
            "field": "menu[items]",
            "description": "<p>Array of item objects in the menu</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "items[name]",
            "description": "<p>Name of the item</p>"
          },
          {
            "group": "Parameter",
            "type": "Object[]",
            "optional": false,
            "field": "tables",
            "description": "<p>Array of table objects</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "tables[qrlink]",
            "description": "<p>Link to the url of the table</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "tables[capacity]",
            "description": "<p>Customer capacity of the table</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "json-response",
            "description": "<p>Restaurant updated!</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Error</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "403",
            "description": "<p>Unauthorized</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/restaurants.js",
    "groupTitle": "Restaurant"
  }
] });
