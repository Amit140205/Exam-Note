import { UserModel } from "../models/user.model.js"


export const getCurrentUser=async (req, res)=>{
    try {
        const userId=req.userId
        const user=await UserModel.findById(userId)

        if(!user){
            return res.status(404).json({message:"Current user is not found"})
        }

        return res.status(200).json(user)
    } catch (error) {
        console.log("error in get current user controller")
        return res.status(500).json({message: `get current user error ${error}`})
    }
}