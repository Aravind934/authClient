const { auth } = require("../helpers/auth");
const { User } = require("../models/User");

const router = require("express").Router();

router.get("/profile", auth, async (req, res) => {
  let { userId } = req.body;
  try {
    let userDetail = await User.findOne({ where: { id: userId }, raw: true });
    res.json({
      status: 200,
      data: userDetail,
    });
  } catch (error) {
    res.json({
      status: 400,
      message: error.message,
    });
  }
});

module.exports = router;
