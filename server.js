const express = require("express")
const fs = require("fs")

const app = express()
const puerto = 3000

app.use(express.json())
app.use(express.static("public"))

function leerJson(ruta) {
  const contenido = fs.readFileSync(ruta, "utf-8")
  return JSON.parse(contenido)
}

app.get("/api/mensajes", (req, res) => {
  try {
    const mensajes = leerJson("data/mensajes.json")
    res.json(mensajes)
  } catch (error) {
    res.status(500).json({
      mensaje: "No fue posible cargar los mensajes comunitarios.",
      detalle: error.message
    })
  }
})

app.get("/api/calendario", (req, res) => {
  try {
    const calendario = leerJson("data/calendario-editorial.json")
    res.json(calendario)
  } catch (error) {
    res.status(500).json({
      mensaje: "No fue posible cargar el calendario editorial.",
      detalle: error.message
    })
  }
})

app.use((req, res) => {
  res.status(404).json({
    mensaje: "Ruta no encontrada. Revisa la dirección solicitada."
  })
})

app.listen(puerto, () => {
  console.log("Mini-sitio comunitario funcionando en http://localhost:3000")
  console.log("Proyecto único de Semana 5")
  console.log("Rutas disponibles:")
  console.log("GET /api/mensajes")
  console.log("GET /api/calendario")
})
