import mongoose from "mongoose"

const notesSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"UserModel",
        required:true
    },
    topic:{
        type:String,
        required:true
    },
    classLevel:{
        type:String
    },
    examType:{
        type:String
    },
    revisionMode:{
        type:Boolean,
        default:false
    },
    includeDiagram:{
        type:Boolean,
        default:false
    },
    includeChart:{
        type:Boolean,
        deafult:false
    },
    content:{
        type:mongoose.Schema.Types.Mixed,
        required:true
    }    
}, {timestamps: true})

export const NotesModel=mongoose.model("NotesModel", notesSchema)

