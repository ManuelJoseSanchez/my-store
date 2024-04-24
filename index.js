const express = require('express');
const cors =require('cors');

const { logErros, errorHandler, boomErrorHander } = require('./middlewares/error.handler');

const routerApi = require('./router');

const app = express();

const port = 3000;

app.use(cors());

app.use(express.json());

routerApi(app);


app.use(logErros);

app.use(boomErrorHander);

app.use(errorHandler);


app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
