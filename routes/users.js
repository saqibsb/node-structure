const express = require("express");
const users = require("../controllers/user/users");
const auth = require("../controllers/user/auth");
const resetPassword = require("../controllers/user/forgetPassword");
const updatePassword = require("../controllers/user/forgetPassword");

module.exports = function (app) {
  app.use(express.json());

  //users or customer
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use("/api/reset-password", resetPassword);
  app.use("/api/updatePassword", updatePassword);

  // app.use(error);
};
