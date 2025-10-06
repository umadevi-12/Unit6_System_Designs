export const roleMiddleware = (roles) => {
    if(req,res.role !== "admin"){
        return res.status(403).json({message:'Admin only'})
    }
    next();
}