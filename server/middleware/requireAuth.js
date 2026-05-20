
// protect routes with middleware

const jwt = require('jsonwebtoken');


const requireAuth = async (req, res, next ) => {
   
    

    
    const token = req.cookies.jwt;

    if (!token) {
        return res.status(401).json({message: 'Request is not authorized'})
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
       
       
        req.userId = decoded.userId;

        next();
    } catch (err) {
        return res.status(401).json({message: 'Authorization token required'})
    };
} 

module.exports = { requireAuth };