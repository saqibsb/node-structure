const winston = require("winston");
const mongoose = require("mongoose");
const config = require("config");
const { seedUsers } = require("../seed");

module.exports = async function () {
  const db = config.get("db");
  try {
    await mongoose.connect(db);
    // .then(() => winston.info(`Connected to ${db}...`));
    winston.info(`Connected to ${db}...`);
    seedUsers();
  } catch (e) {
    console.log("e", e);
  }
};
