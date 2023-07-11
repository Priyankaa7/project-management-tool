const task = require("../models/task.js")
const postTaskData = async (req, res) => {
    let {title, description, deadline, projectId} = req.body;
    if (!title || !description || !deadline || !projectId){
        return res.send({ err: false, msg: "Send all fields" })
    }
    const newTask = new task({
        title, description, status: "To Do", deadline, assignedTo: req.user._id, projectId
    });
    await newTask.save();
    res.send({ err: false, msg: "Task created" })
}
module.exports = { postTaskData }