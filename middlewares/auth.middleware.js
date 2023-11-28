const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    console.log("printing from auth.middleware", token);
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      console.log(decoded);
      next();
    } catch (err) {
      console.error('Invalid token');
      res.status(401).json({ message: 'Invalid token' });
    }
  } else {
    console.error('Authorization header is missing');
    res.status(401).json({ message: 'Authorization header is missing' });
  }
};

module.exports = authenticateUser