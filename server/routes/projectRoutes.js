const express = require("express")

const { authMiddleware } = require("../middlewares/authMiddleware.js");
const { getProjectData } = require("../controllers/projectController.js");

const router = express.Router()

router.get("/project/:id", authMiddleware, getProjectData);

module.exports = router;