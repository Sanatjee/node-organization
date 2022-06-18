const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/organization")
  .then(() => {
    console.log("Mongo DB connected");
  })
  .catch((error) => {
    console.log("Connection Error : " + error);
  });

module.exports = mongoose;
