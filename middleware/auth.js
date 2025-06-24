const jwt = require('jsonwebtoken');

exports.protect = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token yo‘q" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // {_id, role, email}
    next();
  } catch (err) {
    res.status(401).json({ message: "Token yaroqsiz" });
  }
};
