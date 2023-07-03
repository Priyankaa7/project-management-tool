const mongoose = require('mongoose');

const collaborationSchema = new mongoose.Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
}, { timestamps: true });

const Collaboration = mongoose.model('Collaboration', collaborationSchema);

module.exports = Collaboration;