const { Router }=require('express');

const passport = require('passport');
const OrderService = require('./../services/order.service');

const router = Router();

const service = new OrderService();

router.get(
  "/my-order",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      const orders = new service.findByUser(user.sub);
      res.status(201).json(orders);
    } catch (error) {
      next(error);
    }
  }
);



module.exports = router;
