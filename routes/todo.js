var express = require("express");
const logger = require("../logger/logger");
var router = express.Router();
const Task = require("../models/todo.model");
const jwt = require("jsonwebtoken");
const authSecret = String(process.env.AUTH_SECRET_KEY);
const payload = String(process.env.AUTH_APP_USER);
const token = jwt.sign(payload, authSecret);
const fileName = __filename;

router.delete("/tasks/delete/:id", async (req, res, next) => {
  try {
    logger.info(`Filename: ${fileName} : inside /tasks/delete/:id route handler`);
    await Task.deleteOne({_id: req.params.id});
    res.status(200).send("Task Deleted");
  }catch (error){
    logger.error('error occured while updating task in DB', error);
    res.status(400).send({
      status: 400,
      message: error.message
    });
  }
  
});

router.put("/tasks/update/:id", async (req, res, next) => {
  try {
    logger.info(`Filename: ${fileName} : inside /tasks/update/:id route handler`);
    const task = await Task.findOneAndUpdate({_id: req.params.id}, req.body);
    res.status(200).send(task);
  }catch (error){
    logger.error('error occured while updating task in DB', error);
    res.status(400).send({
      status: 400,
      message: error.message
    });
  }
  
});


router.post("/tasks/create", async (req, res, next) => {
  try {
    logger.info(`Filename: ${fileName} : inside /tasks/create route handler`);
    const task = new Task({ task: req.body.task, date: req.body.date, status: req.body.status});
    await task.save();
    res.status(200).send(task);
  }catch (error){
    logger.error('error occured while saving task in DB', error);
    res.status(400).send({
      status: 400,
      message: error.message
    });
  }
  
});

router.get("/tasks", async function (req, res, next) {
  try {
    logger.info(`Filename: ${fileName} : inside /tasks route handler`);
    const tasks = await Task.find();
    res.status(200).send(tasks);
  } catch (error) {
    logger.error("Error occured while fetching tasks from DB", error);
    res.status(400).send({
      status: 400,
      message: error.message
    });
  }
});

router.get("/token", (req, res, next) => {
  res.status(200).send({ token });
});

module.exports = router;
