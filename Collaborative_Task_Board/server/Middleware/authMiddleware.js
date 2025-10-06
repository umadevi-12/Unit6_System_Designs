import jwt from 'jsonwebtoken';
import User from '../Models/User';


export const authMiddleware = async (req,res,next) =>{
    const token = req.headers.Authorization
    if(!token) return res.status(401).json({message:"Unauthorized"})
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decoded.id)
        next()
    } catch (error) {
        return res.status(401).json({message:"Unauthorized"})
    }


}