const express = require("express");
const error = require("../middleware/error");
// const req = require("../routes/users");
module.exports = function (app) {
  // app.use(express.json());
  require("../routes/users")(app);
  // app.use(error);
};
