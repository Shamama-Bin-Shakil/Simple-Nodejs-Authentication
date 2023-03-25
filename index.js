const express = require("express");
const path = require("path");
const morgan = require("morgan");
const mongoDBConnect = require("./db/db");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const app = express();
require('dotenv').config()
const port = process.env.PORT || 5000;

app.use(session({
  secret: process.env.SECRET_ID,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
}))

mongoDBConnect();
app.use(flash());

app.use(morgan("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "./public")));

app.set("views", path.join(__dirname, "./views"));

app.set("view engine", "ejs");

app.use("/", require("./routes/routes"));
app.use("/auth", require("./routes/auth"));

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error", { title: "Session Example - Error" });
  
});

app.listen(port, () =>
  console.log("> Server is listening http://localhost:" + port)
);
