let mongoose = require("mongoose");
let userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  token:{
    type:String
  },
});
let User = mongoose.model("User", userSchema);
module.exports = User;
