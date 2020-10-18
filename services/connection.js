const mongoose = require("mongoose");

const URI = process.env.ATLAS_URI;
require("dotenv").config();

const connectDB = async () => {
  await mongoose
    .connect(URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    })
    .then(console.log("Database Connected"))
    .catch((err) => console.log(err));
};

module.exports = connectDB;
