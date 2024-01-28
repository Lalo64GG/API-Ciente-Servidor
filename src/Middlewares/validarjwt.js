const jwt = require("jsonwebtoken");
function authMiddleware(req, res, next) {
  // Obtener el token del encabezado de la solicitud
  const token = req.headers["authorization"];
  // Verificar si el token existe
  if (!token) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }
  // Verificar el token
  jwt.verify(token, "tu_secreto_secreto", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token inválido" });
    } else {
      // Si el token es válido, adjunta el ID del usuario al objeto de solicitud
      req.userId = decoded.id;
      next();
    }
  });
}
module.exports = { authMiddleware };
