const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const connectDB = require("./services/connection");
connectDB();

// const restaurantRouter = require("./routes/restaurants");
const orderRouter = require("./routes/orders");
require("./routes/auth")(app);
require("./routes/customers")(app); //needs a get restaurant
require("./routes/restaurants")(app); //has the OG get restaurant
require("./routes/orders")(app);
// app.use("/customers", customerRouter);
// app.use("/orders", orderRouter); //weird one wait for it

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
