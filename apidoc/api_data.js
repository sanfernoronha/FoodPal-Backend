define({ "api": [
  {
    "type": "get",
    "url": "http://localhost:5000/restaurant/",
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
  }
] });
