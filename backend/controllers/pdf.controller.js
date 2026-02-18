import PDFDocument from "pdfkit"

export const pdfDownload=async (req, res)=>{
    
    const {result}=req.body

    const labels = {
        1: "Low",
        2: "Moderate",
        3: "High",
        4: "Very High",
        5: "Extremely High"
    }
    const importanceNumber = result?.importance?.length || 0

    try {
        
        if(!result){
            return res.status(400).json({error:"No content provided"})
        }

        const doc=new PDFDocument({margin:50})
        
        res.setHeader("Content-Type", "application/pdf")
        res.setHeader("Content-Disposition", 'attachment; filename="ExamNotes AI.pdf"')

        doc.pipe(res) 

        // title
        doc.fontSize(20).text("ExamNotes AI", {align: "center"})
        doc.moveDown()
        doc.fontSize(14).text(
        `Exam Importance: ${labels[importanceNumber]} (${importanceNumber}/5)`
        )
        doc.moveDown()

        // Sub Topics
        doc.fontSize(16).text("Sub Topics")
        doc.moveDown(0.5)
        Object.entries(result?.subTopics)?.forEach(([star, topics])=>{
            doc.moveDown(0.5)
            doc.fontSize(13).text(`${star.length}-Star Important Topics:`)

            topics.forEach((topic)=>{
                doc.fontSize(12).text(`• ${topic}`)
            })
        })

        doc.moveDown()

        // notes
        doc.fontSize(16).text("Notes")
        doc.moveDown(0.5)
        doc.fontSize(12).text(result?.notes?.replace(/[#*]/g,""))

        doc.moveDown()

        // revision points
        doc.fontSize(16).text("Revision Points")
        doc.moveDown(0.5)
        result?.revisionPoints?.forEach((rev)=>{
            doc.fontSize(12).text(`• ${rev}`)
        })

        doc.moveDown()

        // questions
        doc.fontSize(16).text("Important Questions")
        doc.moveDown(0.5)

        doc.fontSize(13).text("Short Questions:")
        result?.questions?.short?.forEach((q)=>{
            doc.fontSize(12).text(`• ${q}`)
        })

        doc.moveDown(0.5)
        doc.fontSize(13).text("Long Questions:")
        result?.questions?.long?.forEach((q)=>{
            doc.fontSize(12).text(`• ${q}`)
        })

        doc.moveDown(0.5)
        doc.fontSize(13).text("Diagram Questions:")
        doc.fontSize(12).text(result?.questions?.diagram)

        doc.end()

    } catch (error) {
        console.log("error in pdf controller")
        return res.status(500).json({error:"PDF generation failed", message:error.message})
    }
}