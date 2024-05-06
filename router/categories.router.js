const { Router } = require('express');

const CategoryService = require('./../services/category.service');

const validatorHander = require('./../middlewares/validator.handler');

const { getCategorySchema,createCategorySchema,updateCategorySchema }=require('./../schemas/category.schema');

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

router.get("/:categoryId", validatorHander(getCategorySchema, 'params'), async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const category = await service.findOne(categoryId);
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }

})


router.post("/", validatorHander(createCategorySchema, "body"), async (req, res, next) => {
  try {
    const { body } = req;
    const category = await service.create(body);
    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
});




module.exports = router;
