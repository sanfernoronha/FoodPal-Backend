const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
const connectDB = require("./services/connection");
connectDB();

// const restaurantRouter = require("./routes/restaurants");
const orderRouter = require("./routes/orders");
require("./routes/auth")(app);
require("./routes/customers")(app);
require("./routes/restaurants")(app);
// app.use("/customers", customerRouter);
app.use("/orders", orderRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
