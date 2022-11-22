var express = require("express");
var router = express.Router();
require("dotenv").config();
const bcrypt = require("bcrypt");
const { User, Application } = require("../models/user");
const { userVerify } = require("./verifyToken");
let userAuth = require("../config/AuthTokens");

/* GET home page. */
router.post("/signup", async function (req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.send({
        message: "user with same email exists",
        userExist: true,
      });
    } else {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      await new User({
        ...req.body,
        password: hashedPassword,
        timeStamp: new Date(),
      }).save();
      res.status(201).send({ message: "user created" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  let passwordValid;
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    passwordValid = await bcrypt.compare(password, user.password);
  }
  if (!user || !passwordValid) {
    return res.send({ message: "invalid username or password" });
  }

  const token = userAuth.generateAuthToken();
  res.status(200).send({ message: "Logged in", user, token });
});

router.post("/applicationForm", userVerify,  async (req, res) => {
  await Application(req.body).save();
  res.json({ msg: "form submitted successfully" });
});

module.exports = router;
