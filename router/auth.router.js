const { Router } = require('express');

const passport = require('passport');

const AuthService =require('./../services/auth.service');
const { recoverySchema ,changePasswordSchema }=require("./../schemas/auth.schema");
const validatorHander=require("./../middlewares/validator.handler");

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


router.post("/recovery", validatorHander(recoverySchema,"body"),async (req, res, next) => {
  try {
    const { email } = req.body;
    const rest = await service.sendRecovery(email);
    res.status(201).json(rest);
  } catch (error) {
    next(error)
  }
});

router.post("/change-password", validatorHander(changePasswordSchema,"body"),async (req,res,next)=>{
  try {
    const { token, newPassword }=req.body;
    const rest= await service.changePassword(token,newPassword);
    res.status(201).json(rest);
  } catch(error) {
    next(error);
  }
});

module.exports = router;
