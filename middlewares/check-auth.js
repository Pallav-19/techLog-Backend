const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  try {
    console.log(req)
    console.log(req.headers.authorization)
    const token = req.headers.authorization.split(" ")[1]
    
    console.log(token);
    jwt.verify(token, "BOOST_IS_THE_SECRET_OF_MY_ENERGY");

    next();
  } catch (err) {
    res.status(404).json({
      message: "Auth failed",
      error: err,
    });
    console.log(err);
  }
};
