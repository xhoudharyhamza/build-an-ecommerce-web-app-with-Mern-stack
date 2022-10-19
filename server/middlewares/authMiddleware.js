let jwt = require("jsonwebtoken");
let User = require("../models/usersModel");
//create a middleware function to authenticate the user
let authenticateUser = async (req, res, next) => {
  let token = req.cookies.jwt;
  if (token) {
    let verifyToken = await jwt.verify(token, process.env.SECRET_KEY);
    if (verifyToken) {
      let _id = verifyToken.id;
      let user = await User.findOne({ _id });
      if (user) {
        res.status(200).json({ user });
        next();
      } else {
        res.status(401).json({ error: "invalid token" });
        next();
      }
    } else {
      res.status(401).json({ error: "invalid token" });
      next();
    }
  } else {
    res.status(404).json({ error: "user is not logged in" });
    next();
  }
};
module.exports = authenticateUser;
