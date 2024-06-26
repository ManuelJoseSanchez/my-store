const { Router } = require('express');
const passport=require('passport');

const CustomerService = require('./../services/customers.service');

const { createCustomerSchema, getCustomerSchema,updateCustomerSchema } = require('./../schemas/customer.schema');

const validatorHander = require('./../middlewares/validator.handler');

const router = Router();

const service = new CustomerService();

router.get("/", async (req, res, next) => {
  try {
    const customers = await service.find();
    res.status(200).json(customers);
  } catch (error) {
    next(error);
  }
});

router.get("/:customerid",validatorHander(getCustomerSchema,'params'), async (req, res, next) => {
  try {
    const { customerid } = req.params;
    const customer = await service.findOne(customerid);
    res.status(200).json(customer);
  } catch (error) {
    next(error);
  }
});

router.post("/", validatorHander(createCustomerSchema,'body'), async (req, res, next) => {
  try {
    const { body } = req;
    const newCostumer = await service.created(body);
    res.status(201).json(newCostumer)
  } catch (error) {
    next(error);
  }
});

router.patch("/:customerid", passport.authenticate('jwt', {session:false}),validatorHander(getCustomerSchema, 'params'),
validatorHander(updateCustomerSchema,'body'),async (req, res, next) => {
  try {
    const { customerid } = req.params;
    const { body } = req;
    const customer = await service.update(customerid, body);
    res.status(200).json(customer);
  } catch (error) {
    next(error);
  }
});


router.delete("/:customerid", passport.authenticate('jwt', {session:false}),validatorHander(getCustomerSchema, 'params'),async (req, res, next) => {
  try {
    const { customerid } = req.params;
    const customer = await service.delete(customerid);
    res.status(201).json(customer);
  } catch (error) {
    next(error);
  }
});




module.exports = router;
