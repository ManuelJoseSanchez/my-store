const { Router } = require('express');

const passport = require('passport');

const { singToken }=require('./../helper/jwt.helper');

const router = Router();

router.post("/login", passport.authenticate('local', {session:false}),
  async (req, res, next) => {
    try {
      const { user } = req;
      const { id, role } = user;
      const payload = { sub:id, role };
      const jwt = singToken(payload);
      res.status(200).json({
        user,
        token:jwt
      });
    } catch (error) {
      next(error)
    }
});

module.exports = router;
