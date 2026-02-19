import { UserModel } from "../models/user.model.js"
import { getToken } from "../utils/token.js"


export const googleAuth=async (req, res)=>{
    try {
        // console.log(req.body)
        const {name, email}=req.body

        let user=await UserModel.findOne({email})

        if(!user){
            user=await UserModel.create({name, email})
        }
        const token=await getToken(user._id)

        res.cookie("token", token, {
            httpOnly:true,
            secure:true,
            sameSite:"none",
            maxAge:7*24*60*60*1000
        })

        return res.status(200).json(user)
    } catch (error) {
        console.log("Error in google auth controller")
        return res.status(500).json({message: `googleSignUp error ${error}`})
    }
}

export const logOut=async (req, res)=>{
    try {
        await res.clearCookie("token")
        return res.status(200).json({message: "Logout successfully"})
    } catch (error) {
        console.log("Error in logout controller")
        return res.status(500).json({message: `logout error ${error}`})
    }
} 