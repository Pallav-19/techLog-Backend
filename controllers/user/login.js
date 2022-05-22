const User = require("../../models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((foundUser) => {
      if (!foundUser) {
        return res.status(404).json({
          message: "user not found Auth Failed",
        });
      }
      return bcrypt.compare(req.body.password, foundUser.password);
    })
    .then((result) => {
      if (!result) {
        return res.status(401).json({
          message: "Auth Failed",
        });
      }
      const token = jwt.sign(
        { email: foundUser.email, userId: foundUser._id },
        "BOOST_IS_THE_SECRET_OF_MY_ENERGY",
        { expiresIn:'1h',}
      );
    })
    .catch((err) => {
      return res.status(401).json({
        message: "Auth Failed",
      });
    });
};
