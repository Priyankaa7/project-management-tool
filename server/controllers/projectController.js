const Collaboration = require("../models/collaboration");
const Project = require("../models/project");
const Task = require("../models/task");

const getProjectData = async (req, res) => {
    const projectId = req.params.id;
    const collab = Collaboration.findOne({ userId: req.user._id, projectId });
    if (!collab){
        res.send({message: "user is not allowed to view this project"})
    }
    let foundProject = await Project.findOne({ _id: projectId }).populate("admin", "firstName lastName -_id").exec();
    let foundTasks = await Task.find({ projectId }).select("-projectId").populate("assignedTo", "firstName lastName -_id").exec();
    res.send({ ...foundProject.toObject(), tasks: foundTasks })
}

module.exports = { getProjectData }