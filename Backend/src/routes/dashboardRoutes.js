const express = require("express");
const router = express.Router();

const { getDashboard } = require("../controllers/dashboard.controller");
const verifyToken = require("../middlewares/authMiddleware");
const tenantMiddleware = require("../middlewares/tenantMiddleware");

router.use(verifyToken);
router.use(tenantMiddleware);

router.get("/", getDashboard);

module.exports = router;
