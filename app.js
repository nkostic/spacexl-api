const express = require("express");
const mountRoutes = require("./routes");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
const compression = require('compression');
require("dotenv").config();
const port = process.env.PORT;
const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(compression());
app.use(helmet());
app.use(cors());
mountRoutes(app);

app.listen(port, () =>
  console.log(`SpaceX Launches API runs on port ${port}.`)
);

module.exports = app;
