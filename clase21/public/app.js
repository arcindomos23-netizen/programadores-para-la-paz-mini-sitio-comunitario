const btnMensajes = document.getElementById("btnMensajes")
const btnCalendario = document.getElementById("btnCalendario")

const contenedorMensajes = document.getElementById("contenedorMensajes")
const contenedorCalendario = document.getElementById("contenedorCalendario")

btnMensajes.addEventListener("click", () => {
  cargarMensajes()
})

btnCalendario.addEventListener("click", () => {
  cargarCalendario()
})

async function cargarMensajes() {
  try {
    const respuesta = await fetch("/api/mensajes")
    const mensajes = await respuesta.json()

    contenedorMensajes.innerHTML = ""

    for (const mensaje of mensajes) {
      const bloque = document.createElement("div")

      bloque.innerHTML = `
        <h3>${mensaje.titulo}</h3>
        <p>${mensaje.mensaje}</p>
        <p>Categoría: ${mensaje.categoria}</p>
        <p>Audiencia: ${mensaje.audiencia}</p>
        <p>Tono: ${mensaje.tono}</p>
        <p>Llamado a la acción: ${mensaje.llamadoAccion}</p>
        <p>Fuente: ${mensaje.fuente}</p>
        <p>Revisión editorial: ${mensaje.revisionEditorial}</p>
        <hr>
      `

      contenedorMensajes.appendChild(bloque)
    }
  } catch (error) {
    contenedorMensajes.textContent = "No fue posible cargar los mensajes. Revisa que el servidor esté funcionando."
  }
}

async function cargarCalendario() {
  try {
    const respuesta = await fetch("/api/calendario")
    const calendario = await respuesta.json()

    contenedorCalendario.innerHTML = ""

    for (const pieza of calendario) {
      const bloque = document.createElement("div")

      bloque.innerHTML = `
        <h3>Semana ${pieza.semana} - ${pieza.dia}</h3>
        <p>Fecha: ${pieza.fecha}</p>
        <p>Tema: ${pieza.tema}</p>
        <p>Tipo de pieza: ${pieza.tipoPieza}</p>
        <p>Pieza: ${pieza.pieza}</p>
        <p>Canal: ${pieza.canal}</p>
        <p>Público objetivo: ${pieza.publicoObjetivo}</p>
        <p>Propósito: ${pieza.proposito}</p>
        <p>Tono: ${pieza.tono}</p>
        <p>Llamado a la acción: ${pieza.llamadoAccion}</p>
        <p>Fuente: ${pieza.fuente}</p>
        <p>Responsable: ${pieza.responsable}</p>
        <p>Observaciones: ${pieza.observaciones}</p>
        <hr>
      `

      contenedorCalendario.appendChild(bloque)
    }
  } catch (error) {
    contenedorCalendario.textContent = "No fue posible cargar el calendario editorial. Revisa que el servidor esté funcionando."
  }
}
