// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');  

// Middleware to check if the user is authenticated
const authenticateUser = (req, res, next) => {
  const token = req.header('Authorization');  // Get token from Authorization header
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;  // Attach user info to the request object
    next();  // Proceed to the next middleware or route handler
  } catch (err) {
    console.error('Error verifying token:', err);
    return res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authenticateUser;
