const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const axios = require("axios")
const config = require("config");

const User = require("../models/user")

const authMiddleware = async (req, res, next) => {
    try {
        let token = req.headers["authorization"].split("Bearer ")[1] || null;
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }
        const decodedData = jwt.verify(token, config.get('JWT_SECRET'));
        const user = await User.findById(decodedData.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({ message: err.message });
    }
}

module.exports = { authMiddleware }