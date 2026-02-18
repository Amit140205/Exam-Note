import { UserModel } from "../models/user.model.js"
import { buildPrompt } from "../utils/promptBuilder.js"
import { generateGeminiResponse } from "../services/gemini.services.js"
import { NotesModel } from "../models/notes.model.js"


export const generateNotes=async (req, res)=>{
    try {
        const {topic,
            classLevel,
            examType,
            revisionMode=false,
            includeDiagram=false,
            includeChart=false
        }=req.body

        if(!topic){
            return res.status(400).json({message:"Topic is required"})
        }

        const userId=req.userId
        const user=await UserModel.findById(userId)

        if(!user){
            return res.status(400).json({message:"User is not found"})
        }

        if(user.credit<10){
            user.isCreditAvailable=false
            await user.save()
            return res.status(403).json({
                message:"Insufficient credits",
            })
        }

        const prompt=buildPrompt({topic, classLevel, examType, revisionMode, includeDiagram, includeChart})

        const response=await generateGeminiResponse(prompt)

        const note=await NotesModel.create({
            user:user._id,
            topic, 
            classLevel, 
            examType, 
            revisionMode, 
            includeDiagram, 
            includeChart,
            content:response
        })

        user.credit-=10
        if(user.credit<10){
            user.isCreditAvailable=false
        }

        if(!Array.isArray(user.notes)){
            user.notes=[]
        }

        user.notes.push(note._id)
        await user.save()

        return res.status(200).json({
            data:response, 
            noteId:note._id,
            creditsLeft:user.credit
        })

    } catch (error) {
        console.log(`error in gemini notes generate controller ${error}`)
        return res.status(500).json({
            error:"AI generation failed",
            message:error.message
        })
    }
}