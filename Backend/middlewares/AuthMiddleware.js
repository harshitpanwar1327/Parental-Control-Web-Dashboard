import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();

const AuthMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.header.authorization;

        if(!authHeader || !authHeader.startsWith('Bearer')) {
            return res.status(401).json({message: "Authorization token missing or malformed"});
        }

        const token = authHeader.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        next();
    } catch (error) {
        console.log(error);
        
        if(error.name === 'TokenExpiredError') {
            return res.status(401).json({message: "Token has expired", code: "TOKEN_EXPIRED"});
        }

        return res.status(401).json({message: "Invalid token", code: "TOKEN_INVALID"});
    }
}

export default AuthMiddleware;