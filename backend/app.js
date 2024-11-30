var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/db");
require("dotenv").config();

var indexRouter = require("./routes/index");
var moviesRouter = require("./routes/movies");
var usersRouter = require("./routes/users");
var apiRouter = require("./routes/apiRouter");
var adminRouter = require("./routes/adminRouter");
const {  isAdmin, verifyAdmin } = require("./middlewares/authMiddleware");
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
//layout setup
app.use(expressLayouts);
app.set("layout", "layouts/main-layout");
app.use("/", indexRouter);
app.use("/movies",verifyAdmin,isAdmin, moviesRouter);
app.use("/users", usersRouter);
app.use("/api", apiRouter);
app.use("/admin", adminRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
