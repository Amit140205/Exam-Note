import jwt from "jsonwebtoken"

export const isAuth=async (req, res, next)=>{
    try {
        let {token}=req.cookies
        if(!token){
            return res.status(400).json({message:"Token is not found"})
        }
        // console.log(token)
        let verifyToken=jwt.verify(token, process.env.JWT_SECRET)

        if(!verifyToken){
            return res.status(400).json({message: "User doesn't have valid token"})
        }

        req.userId=verifyToken.userId
        next()
    } catch (error) {
        return res.status(500).json({message:`isAuth error ${error}`})
    }
}