const User = require("../../models/user.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login =
  ("/login",
  (req, res, next) => {
    let fetchedUser;
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          return res.status(401).json({
            message: "Auth failed",
          });
        }
        fetchedUser = user;
        return bcrypt.compare(req.body.password, user.password);
      })
      .then((result) => {
        if (!result) {
          return res.status(401).json({
            error: {
              message: "Invalid login credentials!",
            },
          });
        }
        const token = jwt.sign(
          {
            email: fetchedUser.email,
            userId: fetchedUser._id,
            username: fetchedUser.username,
          },
          process.env.JWT_KEY,
          { expiresIn: "1h" }
        );
        res.status(200).json({
          token: token,
          expiresIn: 3600,
          userId: fetchedUser._id,
        });
      })
      .catch((err) => {
        return res.status(401).json({
          error: {
            message: "Invalid authentication credentials!",
          },
        });
      });
  });
module.exports = login;
