const { User } = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = require("express").Router();

router.post("/register", async (req, res) => {
  let { username, email, password } = req.body;
  let status = 200,
    message = "sign up successfull !";
  try {
    password = await bcrypt.hash(password, 10);
    let user = await User.create({
      username,
      email,
      password,
    });
    if (!user) {
      status = 400;
      message = "Something went wrong!";
    }
    res.json({
      status,
      message,
    });
  } catch (error) {
    res.json({
      status: 400,
      message: error.message,
    });
  }
});

router.post("/login", async (req, res) => {
  let { username, password } = req.body,
    token;
  try {
    let user = await User.findOne({ where: { username }, raw: true });
    if (!user) {
      return res.json({
        status: 401,
        message: "username not found",
      });
    }
    let passwordVerified = await bcrypt.compare(password, user.password);
    if (!passwordVerified) {
      return res.json({
        status: 401,
        message: "password mismatch!",
      });
    }
    token = await jwt.sign({ userId: user.id }, process.env.JWT_KEY, {
      expiresIn: "1h",
    });
    res.cookie("token", token).json({
      status: 200,
      message: "login successfully",
    });
  } catch (error) {
    res.json({
      status: 400,
      message: error.message,
    });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie('token');
  res.send(200)
});

module.exports = router;
