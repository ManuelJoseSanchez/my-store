const { Router } = require('express');
const productsRouter = require('./products.router');
const userRouter = require('./users.router');
const categoriesRouter=require('./categories.router');

function routerApi(app) {
  const router = Router();
  router.use("/products", productsRouter);
  router.use("/users", userRouter);
  router.use("/categories", categoriesRouter);
  app.use("/api/v1", router);
}
module.exports = routerApi;
