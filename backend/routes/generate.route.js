import express from "express"
import { isAuth } from "../middlewares/isAuth.js"
import { generateNotes } from "../controllers/generate.controller.js"
import { getAllNotes, getSingleNote } from "../controllers/notes.controller.js"


const notesRouter=express.Router()

notesRouter.post("/generate-notes", isAuth, generateNotes)

notesRouter.get("/get-all-notes", isAuth, getAllNotes)

notesRouter.get("/:id", isAuth, getSingleNote)

export default notesRouter