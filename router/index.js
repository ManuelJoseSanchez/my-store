const { Router } = require('express');
const productsRouter = require('./products.router');
const userRouter = require('./users.router');
const categoriesRouter=require('./categories.router');




function routerApi(app) {
  const router = Router();
  /**
   * @swagger
   * components:
   *  schemas:
   *   product:
   *    type: object
   *    required:
   *      - name
   *      - price
   *      - image
   *    properties:
   *      id:
   *        type: string
   *        descripcion: The auto-generated id of product
   *      name:
   *        type: string
   *        descripcion: it's name of product
   *      price:
   *        type: integer
   *        descripcion: it's price min of 10$
   *      image:
   *        type: string
   *        descripcion: it's image of product
   *    example:
   *       id: d5fe_asz
   *       name: galleta marias
   *       price: 10
   *       image: http://www.gamesa.com
   *
   */

  router.use("/products", productsRouter);


  router.use("/users", userRouter);
  router.use("/categories", categoriesRouter);
  app.use("/api/v1", router);
}

module.exports = routerApi;
