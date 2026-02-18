import { NotesModel } from "../models/notes.model.js"


export const getAllNotes=async (req, res)=>{
    try {
        const userId=req.userId
        const notes=await NotesModel.find({user: userId}).select("topic classLevel examType revisionMode includeDiagram includeChart createdAt").sort({createdAt:-1})

        if(!notes){
            return res.state(404).json({
                error:"Notes not found"
            })
        }

        return res.status(200).json(notes)
    } catch (error) {
        console.log("error in all notes controller")
        return res.status(500).json({error:"notes error", message:error.message})
    }
}

export const getSingleNote=async (req, res)=>{
    try {
        const note=await NotesModel.findOne({
            _id:req.params.id,
            user:req.userId
        })

        if(!note){
            return res.state(404).json({
                error:"Note not found"
            })
        }

        return res.status(200).json({
            content:note.content,
            topic:note.topic,
            createdAt:note.createdAt
        })
    } catch (error) {
        console.log("error in single note controller")
        return res.status(500).json({error:"notes error", message:error.message})
    }
}