const express = require('express');
const cors =require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require("swagger-jsdoc");

const { logErros, errorHandler, boomErrorHander } = require('./middlewares/error.handler');

const routerApi = require('./router');

const app = express();

const port = 3000;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My store",
      version: "0.0.1",
      description: "a simple ejemplo"
    },
    servers: [
      {
        url:"http://localhost:3000",
      }
    ]
  },
  apis: [
    "./router/*.js"
  ]
}

const spect = swaggerJsDoc(options);

app.use("/api-docs",swaggerUi.serve , swaggerUi.setup(spect));

app.use(cors);

app.use(express.json());

routerApi(app);


app.use(logErros);

app.use(boomErrorHander);

app.use(errorHandler);


app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
