const User = require("../../models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = (req, res, next) => {
  User.findOne({ email: req.body.email })

    .then((foundUser) => {
      console.log(foundUser);
      if (!foundUser) {
        return res.status(404).json({
          message: "user not found Auth Failed",
        });
      }
      const result = {
        resultUser: foundUser,
        bcryptAuth:bcrypt.compare(req.body.password, foundUser.password)
      };
      return result
      
    })
    .then((result) => {
       
      if (!(result.bcryptAuth)) {
        return res.status(401).json({
          message: "Auth Failed",
        });
      }
      const token = jwt.sign(
        { email: result.resultUser.email, userId: result.resultUser._id },
        "BOOST_IS_THE_SECRET_OF_MY_ENERGY",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        message: "auth successfull",
        token: token,
      });
    })
    .catch((err) => {
      console.log(err);

      return res.status(401).json({
        message: "Auth Failed error occured",
        error: err,
      });
    });
};
module.exports = login;
