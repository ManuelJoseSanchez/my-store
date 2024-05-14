const { Router } = require('express');

const passport = require('passport');

const AuthService =require('./../services/auth.service');

const router = Router();

const service = new AuthService();

router.post("/login", passport.authenticate('local', {session:false}),
  async (req, res, next) => {
    try {
      const { user } = req;
      res.status(200).json(service.signToken(user));
    } catch (error) {
      next(error)
    }
});


router.post("/recovery", async (req, res, next) => {
  try {
    const { email } = req.body;
    const rest = await service.sendMail(email);
    res.status(201).json(rest);
  } catch (error) {
    next(error)
  }
});
module.exports = router;
