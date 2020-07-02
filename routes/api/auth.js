const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

const auth = require("../../middleware/auth");

//User Model
const User = require("../../models/User");

// POST api/auth
router.post("/", (req, res) => {
  const { email, password } = req.body;

  //Simple Validation
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  //Check for existing User

  User.findOne({ email }).then((user) => {
    if (!user) return res.status(400).json({ msg: "User does not exist" });

    //validate password

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

      jwt.sign(
        { id: user.id },
        config.get("jwtSecret"),
        // { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
            },
          });
          //   if all goes well then we will get the user as well as its token in response
        }
      );
    });
  });
});

//get api/auth/user
//by this route we can get the user without the password
//this shows that the id of the user is embedded in the jwt token
router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password") //the user is sent without the  password
    .then((user) => res.json(user));
});

module.exports = router;
