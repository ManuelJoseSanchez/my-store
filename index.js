const express = require('express');
const cors = require('cors');
const passport=require('passport');

const { logErros, errorHandler, boomErrorHander,ormErrorHandler } = require('./middlewares/error.handler');

const routerApi = require('./router');

const app = express();

const port = 3000;

const whiteList = ["http://localhost:3000","http://my-app"];
const options = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  }
};

app.use(cors(options));

require("./utils/auth");
app.use(passport.initialize({ session: false }));
app.use(express.json());

routerApi(app);


app.use(logErros);

app.use(ormErrorHandler);

app.use(boomErrorHander);

app.use(errorHandler);


app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
