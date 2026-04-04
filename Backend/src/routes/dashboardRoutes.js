const express = require("express");
const router = express.Router();

const { getDashboard } = require("../controllers/dashboard.controller");
const verifyToken = require("../middlewares/authMiddleware");

router.get("/",verifyToken, getDashboard);

module.exports = router;