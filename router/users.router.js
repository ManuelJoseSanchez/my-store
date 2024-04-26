const { Router } = require('express');

const UserService =require('../services/user.service');

const router = Router();

const services = new UserService();

router.get("/", async (req, res,next) => {
  const { limit, offset } = req.query;
  const user = await services.find();
  res.status(200).json(user);
});

module.exports = router;
