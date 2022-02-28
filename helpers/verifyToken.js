const jwt = require("jsonwebtoken");

const verifyToken = async (token) => {
  try {
    let isValid = await jwt.verify(token, process.env.JWT_KEY);
    if (!isValid) return false;
    return { valid: true, payload: isValid };
  } catch (error) {
    return false;
  }
};

module.exports = {
  verifyToken,
};
