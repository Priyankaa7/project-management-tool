const express = require("express")

const { authMiddleware } = require("../middlewares/authMiddleware.js");
const { getDashboardData } = require("../controllers/dashboardController.js");

const router = express.Router()

router.get("/dashboard", authMiddleware, getDashboardData)

module.exports = router;