const tenantMiddleware = (req, res, next) => {
  const tenantId = req.tenantId;

  if (!tenantId) {
    return res.status(400).json({
      message: "Tenant requerido",
    });
  }

  req.tenantId = tenantId;

  next();
};

module.exports = tenantMiddleware;
