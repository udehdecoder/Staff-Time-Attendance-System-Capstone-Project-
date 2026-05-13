const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];


    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("DECODED:", decoded);

    req.user = decoded;
    next();

  } catch (err) {
    console.log("JWT ERROR FULL:", err);

    return res.status(401).json({
      message: "Unauthorized - Invalid token",
      error: err.message
    });
  }
};