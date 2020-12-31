const express = require("express");
const cors = require("cors");

// const config = require("./config/auth.config");

const bodyParser = require("body-parser");
// const jsonwebtoken = require("jsonwebtoken");

require("dotenv").config();

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const connectDB = require("./services/connection");
connectDB();

const restaurantRouter = require("./routes/restaurants");
// const customerRouter = require("./routes/customers");
const orderRouter = require("./routes/orders");

require("./routes/auth")(app);
require("./routes/customers")(app);
app.use("/restaurants", restaurantRouter);
// app.use("/customers", customerRouter);
app.use("/orders", orderRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
