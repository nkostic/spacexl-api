const home = require("./home");
const flights = require("./flights");
const seed = require("./seed");

module.exports = app => {
  app.use("/", home);
  app.use("/api/get/flights", flights);
  app.use("/api/insert/seed", seed);
};
