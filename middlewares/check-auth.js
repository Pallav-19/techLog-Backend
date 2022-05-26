const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.decode(token, process.env.JWT_KEY);
    req.userData = {
      email: decodedToken.email,
      userId: decodedToken.userId,
      username: decodedToken.username,
    };
    next();
  } catch (err) {
    res.status(404).json({
      message: "Authentication failed - You are not authenticated.",
      error: err,
    });
  }
};
