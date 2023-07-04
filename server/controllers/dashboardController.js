const Collaboration = require("../models/collaboration");
const Project = require("../models/project");
const Task = require("../models/task");

const getDashboardData = async (req, res) => {
    const collaborations = await Collaboration.find({ userId: req.user._id }).populate('projectId');
    const projectData = collaborations.map(collaboration => {return { projectTitle: collaboration.projectId.title, projectDescription: collaboration.projectId.description, projectId: collaboration.projectId._id }});
    res.send({projectData});
}

module.exports = { getDashboardData }