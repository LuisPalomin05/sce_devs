const tenantMiddleware = (req, res, next) => {
  const tenantId = req.tenantId;

  console.log("TENANT ID:", tenantId);

  if (!tenantId) {
    return res.status(400).json({
      message: "Tenant requerido",
    });
  }

  req.tenantId = tenantId;

  next();
};

module.exports = tenantMiddleware;
