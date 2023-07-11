const express = require("express")

const { authMiddleware } = require("../middlewares/authMiddleware.js");
const { getProjectData, postProjectData } = require("../controllers/projectController.js");

const router = express.Router()

router.post("/project", authMiddleware, postProjectData);
router.get("/project/:id", authMiddleware, getProjectData);

module.exports = router;