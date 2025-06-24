const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || authHeader.startsWith("Bearer: ")) {
        return res.status(401).json({
            error: "Unauthorized: No token provided."
        });
    }
    const token = authHeader.split(" ")[1];

    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        next();
    }
    catch(err){
        return res.status(403).json({
            error: "Invalid token"
        });
    }
};

module.exports = authMiddleware;