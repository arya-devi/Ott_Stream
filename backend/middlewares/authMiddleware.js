const jwt = require("jsonwebtoken");

// Middleware to verify token
exports.verifyToken = (req, res, next) => {
  console.log(req.headers);

  const token = req.headers?.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized - Missing token" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log(err);

      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }

    // Attach user ID and role to the request object for further use
    req.userId = decoded.userId;
    console.log(req);
    console.log(req.userId);
    req.isAdmin = decoded.isAdmin;
    console.log(req.isAdmin);

    next();
  });
};

// Middleware to check if user is an admin
exports.isAdmin = (req, res, next) => {
  // Check the user role from the token payload (set by verifyToken)
  if (req.isAdmin === false) {
    return res.status(403).json({ message: "Forbidden - Admins only" });
  }
  next();
};
