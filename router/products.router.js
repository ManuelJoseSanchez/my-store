const { Router }=require('express');

const ProductsService = require('./../services/product.service');

const validatorHander = require("./../middlewares/validator.handler");

const { createProductSchema, getProductSchema, updateProductSchema,queryProductSchema } = require('./../schemas/product.schema');

const router = Router();

const service = new ProductsService();



router.get('/',validatorHander(queryProductSchema,'query'), async (req, res,next) => {
  try {
    const products = await service.find(req.query);
    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.get("/filter", async (req, res) => {
  res.send('Yo soy un filter');
});

router.get("/:productId",
  validatorHander(getProductSchema,'params'),
  async (req, res, next) => {
  try {
    const { productId } = req.params;
    const product = await service.findOne(productId);
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
    const newProduct = await service.create(body);
    res.status(201).json(newProduct);

  } catch (error) {
    next(error)
  }
});

router.patch("/:productId",
  validatorHander(getProductSchema, "params"),
  validatorHander(updateProductSchema,"body"),
  async (req, res, next) => {
    try {
      const { body } = req;
      const { productId } = req.params;
      const product = await service.update(productId, body);
      res.json(product);
    } catch (error) {
      next(error)
    }
});

router.delete("/:productId", async(req, res) => {
  try {
    const { productId } = req.params;
    const product = service.delete(productId);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
