const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwtAuthMiddleware = (req, res, next) => {
    // check request header has authorization or not
    const authorization = req.headers.authorization
    if (!authorization) return res.status(500).json({ message: "Token is not found" })
    // extract jwt token from the request header
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        // verify the jwt token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Attach user information to the request object
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ error: 'Invalid token' })
    }

}

// Function to jenerate JWT token
const jenerateToken = (userData) => {
    // Jenerate new jwt token using user data
    const token = jwt.sign({ userData }, process.env.JWT_SECRET, { expiresIn: 300000 });
    return token;
}
module.exports = { jwtAuthMiddleware, jenerateToken };