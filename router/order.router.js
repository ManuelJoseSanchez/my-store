const { Router } = require('express');
const passport=require('passport');

const validatorHander =require('./../middlewares/validator.handler');

const OrderService = require('./../services/order.service');

const { getOrderSchema,createOrderSchema,addItemSchema }=require('./../schemas/order.schema');

const service = new OrderService();

const router = Router();

router.get("/", passport.authenticate('jwt', {session:false}),async (req, res, next) => {
  try {
    const user = req.user;
    const orderlist = await service.find(user.sub);
    res.status(200).json(orderlist);
  } catch (error) {
    next(error)
  }
});

router.get("/:orderId", validatorHander(getOrderSchema, 'params'), async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const order = await service.findOne(orderId);
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
});

router.post("/", passport.authenticate('jwt', {session:false}),validatorHander(createOrderSchema, 'body'), async (req, res, next) => {
  try {
    const { body } = req;
    const newOrder = await service.create(body);
    res.status(201).json(newOrder);
  } catch (error) {
    next(error);
  }
});

router.patch("/:orderId", passport.authenticate('jwt', {session:false}),validatorHander(getOrderSchema, 'params'), validatorHander(createOrderSchema, 'body'), async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const { body } = req;
    const order = await service.update(orderId, body);
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
});

router.delete("/:orderId",passport.authenticate('jwt', {session:false}), validatorHander(getOrderSchema, 'params'), async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const order = await service.delete(orderId);
    res.status(200).json(order);
  } catch (error) {
    next(error)
  }
});

/**
 * agregando rutas del add item
 */

router.post("/add-item", validatorHander(addItemSchema, 'body'), async (req, res, next) => {
  try {
    const { body } = req;
    const newItem = await service.addItem(body);
    res.status(201).json(newItem);
  } catch (error) {
    next(error);
  }
});

module.exports=router
