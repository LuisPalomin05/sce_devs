const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const verifyToken = require("../middlewares/authMiddleware");

router.get("/me", verifyToken, authController.findUserById);
router.post("/set-tenant", verifyToken, userController.setTenantActiva);
router.put('/update-password', verifyToken, userController.updatePassword);

module.exports = router;
