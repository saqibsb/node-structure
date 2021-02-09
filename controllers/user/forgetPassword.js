var nodemailer = require("nodemailer");
const express = require("express");
const router = express.Router();

// const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const Joi = require("joi");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User } = require("../../models/user");
const mongoose = require("mongoose");
var crypto = require("crypto");
// const hbs = require("nodemailer-express-handlebars");
var smtpTransport = require("nodemailer-smtp-transport");

router.post("/", async (req, res) => {
  //   const { error } = validate(req.body);
  //   console.log("Login.");
  //   if (error) return res.status(400).send(error.details[0].message);

  console.log("Reset ", req.body);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email");

  // User.findOne({ email: req.body.email }, function (error, userData) {
  //     if(userData==null)
  //     {
  //         return res.status(404).json({
  //             success: false,
  //             msg: "Email is not register",
  //         });
  //     }

  var transporter = nodemailer.createTransport({
    // service: "gmail", //smtp.gmail.com  //in place of service use host...

    // host: "smtp.mailtrap.io",
    // port: 2525,
    // secure: true,
    // auth: {
    //   // user: "xxx@gmail.com",
    //   // pass: "xxx",
    //   user: "b3b235f452f137",
    //   pass: "4070626b73b159",
    // },

    // name: "example.com",

    // host: "smtp.mailtrap.io",
    // port: 2525,
    // auth: {
    //   user: "b3b235f452f137",
    //   pass: "4070626b73b159",
    // },

    service: "hotmail",
    auth: {
      user: "msaqibmehmood@outlook.com",
      pass: "mehmood1965",
    },
  });
  var currentDateTime = new Date();

  const options = {
    from: "BuyFans <msaqibmehmood@outlook.com>", // Sender Address
    to: req.body.email,
    // to: "msqbmehmood@gmail.com",
    subject: "Password Reset",
    // text: 'That was easy!',
    html:
      "<h1>Welcome To Daily Task Report ! </h1><p>\
    <h3>Hello " +
      user.name +
      "</h3>\
    If You are requested to reset your password then click on below link<br/>\
    <a href='http://localhost:3000/change-password/" +
      currentDateTime +
      "+++" +
      user.email +
      "'>Click On This Link</a>\
    </p>",
  };

  var mailOptions = {
    from: "BuyFans <sender@gordiansol.com>", // Sender Address
    to: req.body.email,
    // to: "msqbmehmood@gmail.com",
    subject: "Password Reset",
    // text: 'That was easy!',
    html:
      "<h1>Welcome To Daily Task Report ! </h1><p>\
    <h3>Hello " +
      user.name +
      "</h3>\
    If You are requested to reset your password then click on below link<br/>\
    <a href='http://localhost:3000/change-password/" +
      currentDateTime +
      "+++" +
      user.email +
      "'>Click On This Link</a>\
    </p>",
  };

  // let transporter1 = nodemailer.createTransport({
  //   jsonTransport: true,
  // });
  // transporter1.sendMail(
  //   {
  //     from: "sender@example.com",
  //     to: "ssbsbsb160@gmail.com",
  //     subject: "Message",
  //     text: "I hope this message gets buffered!",
  //   },
  //   (err, info) => {
  //     console.log("111");
  //     console.log(info.envelope);
  //     console.log(info.messageId);
  //     console.log(info.message); // JSON string
  //   }
  // );

  transporter.sendMail(options, function (error, info) {
    if (error) {
      console.log("2222", error);
    } else {
      console.log("Email sent: " + info.response, mailOptions);

      User.updateOne(
        { email: user.email },
        {
          token: currentDateTime,
        },
        { multi: true },
        function (err, affected, resp) {
          console.log("Resp", resp);
          return res.status(200).json({
            success: false,
            msg: info.response,
            userlist: resp,
          });
        }
      );
    }
  });
});

module.exports = router;

// router.post("/", async (req, res) => {
//   //   const { error } = validate(req.body);
//   //   console.log("Login.");
//   //   if (error) return res.status(400).send(error.details[0].message);

//   console.log("Reset ", req.body);

//   let user = await User.findOne({ email: req.body.email });
//   if (!user) return res.status(400).send("Invalid email");
//   var token = crypto.randomBytes(32).toString("hex"); //this token would be sent in the link to reset forgot password
//   //   user = new User(_.pick(req.body, ["name", "email", "password"]));
//   const salt = await bcrypt.genSalt(10);
//   //   user.password = await bcrypt.hash(token,user.password, salt);
//   //   await user.save();
//   bcrypt.hash(token, salt, function (err, hash) {
//     // User.findByIdAndUpdate({ _id: user._id, password: hash });
//     let password = new User({
//       _id: user._id,
//       email: "emasdklf@asjdf",
//       name: "name",
//       password: hash,
//       //   expire: moment.utc().add(config.tokenExpiry, "seconds"),
//     });
//     password.save(function (err) {
//       if (err) throw err;
//     });
//   });
//   let mailOptions = {
//     // from: config.senderEmail,
//     from: "ssbsbsb160@gmail.com",
//     to: user.email,
//     subject: "Reset your account password",
//     html:
//       "<h4><b>Reset Password</b></h4>" +
//       "<p>To reset your password, complete this form:</p>" +
//       "<a href=" +
//       //   config.clientUrl +
//       "http://localhost:3001/" +
//       "reset/" +
//       user._id +
//       "/" +
//       token +
//       '">' +
//       //   config.clientUrl +
//       "http://localhost:3001/" +
//       "reset/" +
//       user._id +
//       "/" +
//       token +
//       "</a>" +
//       "<br><br>" +
//       "<p>--Team</p>",
//   };
//   // send mail with defined transport object
//   const transporter = nodemailer.createTransport({
//     host: "smtp.mailtrap.io",
//     port: 587,
//     secure: false,
//     auth: {
//       user: "e7576da5354454",
//       pass: "d55782b6ac17a1",
//     },
//   });
//   //   transporter.sendMail(mailOptions, (error, info));
//   transporter.sendMail(mailOptions, function (error, response) {
//     if (error) {
//       console.log("Email Error", error);
//     } else {
//       console.log("Message sent: ok"); //response.message
//     }
//     transporter.close(); // 如果没用，关闭连接池
//   });

//   //   const token = user.generateAuthToken();
//   //   res.send(token);
// });

// function validate(req) {
//   const schema = {
//     email: Joi.string().min(5).max(255).required().email(),
//   };

//   return Joi.validate(req, schema);
// }

// module.exports = router;

// userRoutes.post('/reset-password', function (req, res) {
//     const email = req.body.email
//     User.findOne({ email: email })
//     .exec()
//     .then(function (user) {
//     if (!user) {
//     return throwFailed(res, 'No user found with that email address.')
//     }
