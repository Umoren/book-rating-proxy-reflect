const jwt = require("jsonwebtoken");

function authenticateJWT(req, res, next) {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided." });
  }

  // Split the 'Bearer <your_token>' format to get the token itself
  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token." });
    }

    req.user = decoded;
    next();
  });
}

module.exports = authenticateJWT;
