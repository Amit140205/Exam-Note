import express from "express"
import dotenv from "dotenv"
import { connectDb } from "./utils/connectDb.js"
import authRouter from "./routes/auth.route.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import userRouter from "./routes/user.route.js"
import notesRouter from "./routes/generate.route.js"
import pdfRouter from "./routes/pdf.route.js"
import creditRouter from "./routes/credit.route.js"
import { stripeWebHook } from "./controllers/credits.controller.js"

dotenv.config()

const app=express()
app.set("trust proxy", 1);
const port=process.env.PORT || 8000

app.use(cors({
    origin:"https://exam-note-client.onrender.com",
    credentials:true,
    methods:["GET", "POST", "PUT", "DELETE", "OPTIONS"] 
}))

app.post(
    "/api/payments/webhook", 
    express.raw({type:"application/json"}),
    stripeWebHook
)

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/notes", notesRouter)
app.use("/api/pdf", pdfRouter)
app.use("/api/credit",creditRouter)

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
    connectDb()
})
