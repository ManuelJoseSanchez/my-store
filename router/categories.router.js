const { Router } = require('express');
const passport = require('passport');

const CategoryService = require('./../services/category.service');

const validatorHander = require('./../middlewares/validator.handler');
const { checkRoles }=require('./../middlewares/auth.handler');

const { getCategorySchema, createCategorySchema, updateCategorySchema } = require('./../schemas/category.schema');


const service = new CategoryService();

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const categories = await service.find();
    res.status(200).json(categories);
  } catch (error) {
    next(error)
  }
});

router.get("/:categoryId",passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'seller', 'customer'), validatorHander(getCategorySchema, 'params'), async (req, res, next) => {
    try {
      const { categoryId } = req.params;
      const category = await service.findOne(categoryId);
      res.status(200).json(category);
    } catch (error) {
      next(error);
    }

});

router.post("/", passport.authenticate('jwt', { session: false }),
  checkRoles('admin','seller'),
  validatorHander(createCategorySchema, "body"),
  async (req, res, next) => {
    try {
      const { body } = req;
      const category = await service.create(body);
      res.status(201).json(category);
    } catch (error) {
      next(error);
    }
});

router.patch("/:categoryId", passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'seller', 'customer'),
  validatorHander(getCategorySchema, 'params'), validatorHander(updateCategorySchema, 'body'), async (req, res, next) => {
    try {
      const { categoryId } = req.params;
      const { body } = req;
      const category = await service.update(categoryId,body);
      res.status(200).json(category);
    } catch (error) {
      next(error);
    }
});

router.delete("/:categoryId", passport.authenticate('jwt', { session: false }),
  checkRoles('admin','seller','customer'),
    validatorHander(getCategorySchema, 'params'), async (req, res, next) => {
      try {
        const { categoryId } = req.params;
        const category = await service.delete(categoryId);
        res.status(200).json(category);
      } catch (error) {
        next(error);
      }
});




module.exports = router;
