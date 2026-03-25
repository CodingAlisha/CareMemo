// protect routes with middleware

const jwt = require('jsonwebtoken');
// const User = require('../models/User')

const requireAuth = async (req, res, next ) => {
    console.log('TOKEN:', req.cookies.jwt);
    console.log('COOKIES:', req.cookies);
    console.log('HEADERS:', req.headers.cookie);
    

    // const token = req.cookies.token;
    const token = req.cookies.jwt;

    if (!token) {
        return res.status(401).json({message: 'Request is not authorized'})
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('DECODED:', decoded);
        // req.userId = decoded.userId;
        // req.userId = decoded.id;
        req.userId = decoded.userId;

        next();
    } catch (err) {
        return res.status(401).json({message: 'Authorization token required'})
    };
} 

module.exports = { requireAuth };