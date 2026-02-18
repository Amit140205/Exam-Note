import React, { useEffect, useRef, useState } from "react"
import mermaid from "mermaid"

mermaid.initialize({
  startOnLoad: false,
  theme: "default",
  securityLevel: "loose"
})

function sanitizeDiagram(diagram) {
  if (!diagram) return ""

  let clean = diagram.replace(/\r\n/g, "\n").trim()

  
  if (!/^graph\s/.test(clean)) {
    clean = `graph TD\n${clean}`
  }

 
  clean = clean.replace(/([A-Za-z0-9_]+)\[(.*?)\]/g, (_, id, label) => {
    return `${id}["${label.replace(/"/g, "'")}"]`
  })


  clean = clean.replace(/([A-Za-z0-9_]+)\{(.*?)\}/g, (_, id, label) => {
    return `${id}{"${label.replace(/"/g, "'")}"}`
  })

  return clean
}

function MermaidSetup({ diagram }) {
  const containerRef = useRef(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!diagram || !containerRef.current) return

    const renderDiagram = async () => {
      try {
        setError(false)
        containerRef.current.innerHTML = ""

        const uniqueId = `mermaid-${Date.now()}`

        const safeDiagram = sanitizeDiagram(diagram)

        const { svg } = await mermaid.render(uniqueId, safeDiagram)

        containerRef.current.innerHTML = svg
      } catch (err) {
        console.error("Mermaid render failed:", err)
        setError(true)
      }
    }

    renderDiagram()
  }, [diagram])

  return (
    <div className="bg-white border rounded-lg p-4 overflow-x-auto border-gray-200">
      {error ? (
        <div className="text-red-500 text-sm">
          Failed to render diagram.
        </div>
      ) : (
        <div ref={containerRef}/>
      )}
    </div>
  )
}

export default MermaidSetup
