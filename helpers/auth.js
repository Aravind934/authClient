const { verifyToken } = require("./verifyToken");

const auth = async (req, res, next) => {
  let token = req.cookies["token"];
  if (!token) {
    return res.json({
      status: 401,
      message: "Please login!",
    });
  }
  let valid = await verifyToken(token);
  if (!valid) {
    return res.json({
      status: 401,
      message: "Please login!",
    });
  }
  req.body["userId"] = valid.payload.userId;
  next();
};

module.exports = {
  auth,
};
