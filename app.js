var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const validateRequest = require('./utils/validateRequest');
const log = require("./logger/logger");
const fileName = __filename;

var todoRouter = require("./routes/todo");
const mongoose = require("mongoose");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use((req,res,next) => validateRequest(req,res,next));

app.use("/todo", todoRouter);

mongoose
  .connect(String(process.env.MONGO_CONNECTION_URI))
  .then(() => {
    app.listen(Number(process.env.PORT) || 3000, () => {
      log.info(`Filename: ${fileName} - App started at port = ${process.env.PORT}`);
    });
  })
  .catch((error) => log.error(`Filename: ${fileName} : error occured while connecting to db`, error));
