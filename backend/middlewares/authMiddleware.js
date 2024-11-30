const jwt = require("jsonwebtoken");

// for verifying token for protected route

exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token, "hai");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized - Missing token" });
  }

  jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }

    req.userId = decoded.userId;
    req.isAdmin = decoded.isAdmin;
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
exports.verifyAdmin = (req, res, next) => {
  const token = req.cookies.authToken;
console.log("token middleware",token);

  if (!token) return res.status(401).json({ error: 'Unauthorized access' });

  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.id;
      console.log(req.userId);
      
      console.log('hai jwt');
      next();
  } catch (error) {
      res.status(403).json({ error: 'Invalid or expired token' });
  }
};
