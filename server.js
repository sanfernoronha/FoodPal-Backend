const express = require('express');
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express') ;
const mongoose = require('mongoose');


require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

const swaggerOptions = {
    swaggerDefinition : {
      info: {
        title: "Foodpal Restaurant API",
        description: "Foodpal Restaurant API information",
        contact: {
          name: "Sanfer Noronha"
        },
        servers: ["http://localhost:5000"]
      }
    },
    apis: ['./routes/*.js']
  };
  
  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocs));


app.use(cors());
app.use(express.json());

const connectDB = require("./services/connection");
connectDB();

const restaurantRouter = require('./routes/restaurants');

app.use('/restaurants',restaurantRouter);


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});