const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator')
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  posts: { type: [mongoose.Schema.Types.ObjectId], ref: "Post" },
  username:String,
});
UserSchema.plugin(uniqueValidator);
module.exports = new mongoose.model("User", UserSchema);
