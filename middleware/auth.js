//here we are setting up the middleware for when the private route is needed
//here we shall do all the token related tasks for authentication

const config = require("config");
const jwt = require("jsonwebtoken");

//whenever you create a middleware make sure you pass on three things req , res , next
function auth(req, res, next) {
  const token = req.header("x-auth-token");

  //Check for token
  if (!token)
    return res.status(401).json({ msg: "No token, authorisation denied" });

  try {
    // Verify token (if present)
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    //Add user from payload
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ msg: "Token is not valid " });
  }
}

module.exports = auth;
