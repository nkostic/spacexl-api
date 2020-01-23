const Router = require("express-promise-router");

const router = new Router();

router.get("/", async (req, res) => {
  res.send({ info: "RESTfull Node, Express, and Postgres API" });
});

module.exports = router;
