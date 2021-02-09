router.post("/", function (req, res) {
  User.findOne({ email: req.body.email }, function (errorFind, userData) {
    if (
      userData.token == req.body.linkDate &&
      req.body.password == req.body.confirm_password
    ) {
      bcrypt.genSalt(10, (errB, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          if (err) throw err;
          let newPassword = hash;
          let condition = { _id: userData._id };
          let dataForUpdate = {
            password: newPassword,
            updatedDate: new Date(),
          };
          User.findOneAndUpdate(
            condition,
            dataForUpdate,
            { new: true },
            function (error, updatedUser) {
              if (error) {
                if (err.name === "MongoError" && error.code === 11000) {
                  return res
                    .status(500)
                    .json({ msg: "Mongo Db Error", error: error.message });
                } else {
                  return res.status(500).json({
                    msg: "Unknown Server Error",
                    error: "Unknow server error when updating User",
                  });
                }
              } else {
                if (!updatedUser) {
                  return res.status(404).json({
                    msg: "User Not Found.",
                    success: false,
                  });
                } else {
                  return res.status(200).json({
                    success: true,
                    msg: "Your password are Successfully Updated",
                    updatedData: updatedUser,
                  });
                }
              }
            }
          );
        });
      });
    }
    if (errorFind) {
      return res.status(401).json({
        msg: "Something Went Wrong",
        success: false,
      });
    }
  });
});
