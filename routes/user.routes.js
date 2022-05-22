const express = require("express");
const router = express.Router();
const { signup } = require("../controllers/user/index.js");
router.post("/signup",signup);
router.post("/signup")

module.exports = router;
