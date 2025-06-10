const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Brak tokena lub nieprawidłowy format." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded._id }; // dodajemy dane użytkownika do req
    next();
  } catch (error) {
    return res.status(401).json({ message: "Nieprawidłowy lub wygasły token." });
  }
};

module.exports = verifyToken;
