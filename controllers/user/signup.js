const User = require("../../models/user.js");
const bcrypt = require("bcryptjs");

const signup = (req, res, next) => {
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(req.body.password, salt, function (err, hash) {
      new User({
        email: req.body.email,
        password: hash,
        username: req.body.username,
      })

        .save()
        .then((response) => {
          res.status(200).json({
            message: "user saved successfully",
            response: response,
          });
          console.log(response);
        })
        .catch((err) => {
          res.status(500).json({
            error: {
              message: `Invalid auhentication credentials!!! 
                             Seems like the Email ID is already registered!`,
            },
          });
          console.log(err);
        });
    });
  });
};
module.exports = signup;
