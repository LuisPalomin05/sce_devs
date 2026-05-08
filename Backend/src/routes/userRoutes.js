const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const tenantMiddleware = require("../middlewares/tenantMiddleware");
const verifyToken = require("../middlewares/authMiddleware");

router.use(verifyToken);

router.get("/me", authController.findUserById);

router.use(tenantMiddleware);
router.post("/set-tenant", userController.setTenantActiva);
router.put("/update-password", userController.updatePassword);

module.exports = router;
