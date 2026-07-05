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
      const tarjeta = document.createElement("article")
      tarjeta.classList.add("tarjeta-mensaje")

      tarjeta.innerHTML = `
        <h3>${mensaje.titulo}</h3>
        <p>${mensaje.mensaje}</p>

        <p>
          <span class="etiqueta">Categoría: ${mensaje.categoria}</span>
          <span class="etiqueta">Audiencia: ${mensaje.audiencia}</span>
          <span class="etiqueta">Tono: ${mensaje.tono}</span>
        </p>

        <p><strong>Llamado a la acción:</strong> ${mensaje.llamadoAccion}</p>
        <p class="texto-secundario"><strong>Fuente:</strong> ${mensaje.fuente}</p>
      `

      contenedorMensajes.appendChild(tarjeta)
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
      const tarjeta = document.createElement("article")
      tarjeta.classList.add("tarjeta-mensaje")

      tarjeta.innerHTML = `
        <h3>Semana ${pieza.semana} - ${pieza.dia}</h3>
        <p><strong>Tema:</strong> ${pieza.tema}</p>
        <p><strong>Pieza:</strong> ${pieza.pieza}</p>
        <p><strong>Canal:</strong> ${pieza.canal}</p>
        <p><strong>Público objetivo:</strong> ${pieza.publicoObjetivo}</p>
        <p><strong>Propósito:</strong> ${pieza.proposito}</p>
        <p><strong>Llamado a la acción:</strong> ${pieza.llamadoAccion}</p>
        <p class="texto-secundario"><strong>Fuente:</strong> ${pieza.fuente}</p>
      `

      contenedorCalendario.appendChild(tarjeta)
    }
  } catch (error) {
    contenedorCalendario.textContent = "No fue posible cargar el calendario editorial. Revisa que el servidor esté funcionando."
  }
}
