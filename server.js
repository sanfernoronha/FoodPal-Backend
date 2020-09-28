const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const connectDB = require("./services/connection");
connectDB();

const restaurantRouter = require("./routes/restaurants");
const customerRouter = require("./routes/customers");
const orderRouter = require("./routes/orders");

app.use("/restaurants", restaurantRouter);
app.use("/customers", customerRouter);
app.use("/orders", orderRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
