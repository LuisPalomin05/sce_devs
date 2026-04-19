const API_KEY = process.env.JWT_SECRET;

function authMiddleware(req, res, next) {
  const key = req.headers["x-api-key"];

  if (key !== API_KEY) {
    return res.status(401).json({ error: "No autorizado" });
  }

  next();
}