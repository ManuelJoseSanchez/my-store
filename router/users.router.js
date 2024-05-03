const { Router } = require('express');

const UserService = require('../services/user.service');

const validatorHander = require("../middlewares/validator.handler");

const { createdUserSchema,getUserSchema,updateUserSchema }=require('../schemas/user.schema');

const router = Router();

const services = new UserService();

router.get("/", async (req, res,next) => {
  try {
    const user = await services.find();
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

router.get("/:id",validatorHander(getUserSchema,'params'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await services.findOne(id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

router.post("/",validatorHander(createdUserSchema,'body'), async (req, res, next) => {
  try {
    const { body } = req;
    const newUser = await services.created(body);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", validatorHander(getUserSchema,'params'),validatorHander(updateUserSchema,'body'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const user = await services.update(id, body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", validatorHander(getUserSchema, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await services.delete(id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});


module.exports = router;
