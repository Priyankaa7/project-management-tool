const Collaboration = require("../models/collaboration");
const Project = require("../models/project");
const Task = require("../models/task");

const getProjectData = async (req, res) => {
    const projectId = req.params.id;
    const collab = Collaboration.findOne({ userId: req.user._id, projectId });
    if (!collab) {
        res.send({ message: "user is not allowed to view this project" })
    }
    let foundProject = await Project.findOne({ _id: projectId }).populate("admin", "firstName lastName -_id").exec();
    let foundTasks = await Task.find({ projectId }).select("-projectId").populate("assignedTo", "firstName lastName -_id").exec();
    res.send({ ...foundProject.toObject(), tasks: foundTasks })
}

const postProjectData = async (req, res) => {
    console.log("inside post project");

    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({ err: true, msg: "Missing title or description" });
    }

    const newProject = new Project({
        title: title.trim(),
        description: description.trim(),
        admin: req.user._id
    });

    const newCollab = new Collaboration({
        projectId: newProject._id,
        userId: req.user._id
    });

    try {
        await newProject.save();
        await newCollab.save();
        return res.send({
            err: false,
            msg: "Project created",
            projectId: newProject._id.toString()
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ err: true, msg: "An error occurred" });
    }
};


module.exports = { getProjectData, postProjectData }