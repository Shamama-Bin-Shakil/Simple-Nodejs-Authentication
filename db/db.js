const mongoose = require("mongoose");
const mongoDBConnect = async () => {
  mongoose
    .connect(process.env.DB_URL)
    .then((data) => console.log("CONNECTION DB"));
};

module.exports = mongoDBConnect;
