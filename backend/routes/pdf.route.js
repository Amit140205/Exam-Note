import express from "express"
import { pdfDownload } from "../controllers/pdf.controller.js"
import { isAuth } from "../middlewares/isAuth.js"


const pdfRouter=express.Router()

pdfRouter.post("/pdf-download",isAuth, pdfDownload)

export default pdfRouter