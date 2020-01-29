const Router = require("express-promise-router");

const router = new Router();

router.get("/", async (req, res) => {
  res.send({
    message: "RESTfull Node, Express, and Postgres API",
    results: true
  });
});

module.exports = router;
