const jwt = require("jsonwebtoken");
const JWT_SECRET = "mi_secreto_para_sprint";

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(403).json({ message: "Acceso prohibido: no autorizado" });
  }

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : authHeader;

  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) {
      return res
        .status(403)
        .json({ message: "Acceso prohibido: token inválido" });
    }

    req.user = payload; // payload contiene _id
    next();
  });
};

module.exports = authenticate;
