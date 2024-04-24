const { Router }=require('express');

const ProductsService = require('./../services/product.service');
const validatorHander = require("./../middlewares/validator.handler");
const { createProductSchema,getProductSchema,updateProductSchema }=require('./../schemas/product.schema');

const router = Router();

const service = new ProductsService();



router.get('/', async (req, res,next) => {
  try {
    const products = await service.find();
    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.get("/filter", async (req, res) => {
  res.send('Yo soy un filter');
});

router.get("/:id",
  validatorHander(getProductSchema,'params'),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await service.findOne(id);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.post("/",
  validatorHander(createProductSchema, 'body')
  ,async (req, res, next) => {
  try {
    const { body } = req;
    const newProduct = service.create(body);
    res.json(newProduct);

  } catch (error) {
    next(error)
  }
});

router.patch("/:id",
  validatorHander(getProductSchema, "params"),
  validatorHander(updateProductSchema,"body"),
  async (req, res, next) => {
    try {
      const { body } = req;
      const { id } = req.params;
      const product = await service.update(id, body);
      res.json(product);
    } catch (error) {
      next(error)
    }
});

router.delete("/:id", async(req, res) => {
  try {
    const { id } = req.params;
    const product = service.delete(id);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
