const Router = require("express-promise-router");
const flightsController = require("../controllers/flightsController");

const router = new Router();

router.post("/", flightsController.getFlights);

module.exports = router;
