const express = require("express")
const { postTaskData } = require("../controllers/taskController.js")
const { authMiddleware } = require("../middlewares/authMiddleware.js");

const router = express.Router()

router.post("/task", authMiddleware, postTaskData);

module.exports = router;