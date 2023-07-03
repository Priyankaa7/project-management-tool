const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        enum: ['To Do', 'In Progress', 'Done'],
        default: 'To Do',
    },
    deadline: {
        type: String,
        required: true,
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project"
    }
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema)