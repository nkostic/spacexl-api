const Router = require("express-promise-router");
const seedRouter = require("../controllers/seedController");
const router = new Router();

router.get("/", seedRouter.seed);

module.exports = router;
