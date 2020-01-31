const home = require("./home");
const flights = require("./flights");

module.exports = app => {
  app.use("/", home);
  app.use("/api/get/flights", flights);
};
