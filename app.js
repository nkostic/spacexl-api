const express = require("express");
const mountRoutes = require("./routes");
const helmet = require('helmet')
const cors = require('cors')
require('dotenv').config();

const port = process.env.PORT;

const app = express();
app.use(helmet());
app.use(cors());
mountRoutes(app);

//const bodyParser = require("body-parser");
// const seed = require("./seed-data.json");
//const pool = require("./db/");

// app.use(bodyParser.json());
// app.use(
//   bodyParser.urlencoded({
//     extended: true
//   })
// );

app.listen(port, () => console.log(`Example RESTfull api runs on port ${port}.`));
