const Joi = require("joi");
const mongoose = require("mongoose");
const socialLinks = mongoose.model(
  "socialLinks",
  new mongoose.Schema({
    name: String,
  })
);

const Carrier = mongoose.model(
  "Carriers",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
    },
    phone: {
      String,
      required: true,
      minlength: 2,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      unique: true,
    },
    address: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024,
    },
    dotNumber: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024,
    },
    socialLinks: [socialLinks],
    user_name: { String },
    designation: { String },
    website: { String },
    image: { String },
    statics: [],
  })
);

function validateCarrier(carrier) {
  const schema = {
    title: Joi.string().min(5).max(50).required(),
    genreId: Joi.objectId().required(),
    numberInStock: Joi.number().min(0).required(),
    dailyRentalRate: Joi.number().min(0).required(),
  };

  return Joi.validate(carrier, schema);
}

exports.Carrier = Carrier;
exports.validate = validateCarrier;
