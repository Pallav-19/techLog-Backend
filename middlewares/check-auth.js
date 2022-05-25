const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.decode(token, "BOOST_IS_THE_SECRET_OF_MY_ENERGY");
    req.userData = {
      email: decodedToken.email,
      userId: decodedToken.userId,
      username: decodedToken.username,
    };
    next();
  } catch (err) {
    res.status(404).json({
      message: "Auth failed imvalid token",
      error: err,
    });
  }
};
