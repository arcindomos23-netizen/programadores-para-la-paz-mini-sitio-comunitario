const btnMensajes = document.getElementById("btnMensajes")
const btnCalendario = document.getElementById("btnCalendario")

const contenedorMensajes = document.getElementById("contenedorMensajes")
const contenedorCalendario = document.getElementById("contenedorCalendario")

let mensajesDisponibles = []
let calendarioDisponible = []

btnMensajes.addEventListener("click", () => {
  cargarMensajes()
})

btnCalendario.addEventListener("click", () => {
  cargarCalendario()
})

async function cargarMensajes() {
  try {
    const respuesta = await fetch("/api/mensajes")
    mensajesDisponibles = await respuesta.json()

    // 1. Mostrar y limpiar el contenedor selector de mensajes
    const selectorMensajes = document.getElementById("SelectorMensajes")
    selectorMensajes.style.display = "block"
    selectorMensajes.innerHTML = ""

    // 2. Crear la opción de "Seleccionar todos"
    const divSelectAll = document.createElement("div")
    divSelectAll.classList.add("opcion-seleccion")
    divSelectAll.innerHTML = `
      <label>
        <input type="checkbox" id="chkTodosMensajes" checked>
        <strong>Seleccionar todos</strong>
      </label>
    `
    selectorMensajes.appendChild(divSelectAll)

    // 3. Crear los checkboxes para cada uno de los mensajes
    mensajesDisponibles.forEach(mensaje => {
      const divOpcion = document.createElement("div")
      divOpcion.classList.add("opcion-seleccion")
      divOpcion.innerHTML = `
        <label>
          <input type="checkbox" class="chk-mensaje" data-id="${mensaje.id}" checked>
          ${mensaje.titulo}
        </label>
      `
      selectorMensajes.appendChild(divOpcion)
    })

    // 4. Función para renderizar únicamente los mensajes seleccionados
    const renderizarSeleccionados = () => {
      contenedorMensajes.innerHTML = ""
      const chks = document.querySelectorAll(".chk-mensaje")
      const idsSeleccionados = Array.from(chks)
        .filter(chk => chk.checked)
        .map(chk => parseInt(chk.dataset.id))

      const filtrados = mensajesDisponibles.filter(m => idsSeleccionados.includes(m.id))

      if (filtrados.length === 0) {
        contenedorMensajes.innerHTML = "<p class='texto-secundario'>Ningún mensaje seleccionado.</p>"
        return
      }

      for (const mensaje of filtrados) {
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
    }

    // 5. Configurar el evento de "Seleccionar todos"
    const chkTodos = document.getElementById("chkTodosMensajes")
    chkTodos.addEventListener("change", (e) => {
      const chks = document.querySelectorAll(".chk-mensaje")
      chks.forEach(chk => chk.checked = e.target.checked)
      renderizarSeleccionados()
    })

    // 6. Configurar el evento para cada checkbox individual
    const chks = document.querySelectorAll(".chk-mensaje")
    chks.forEach(chk => {
      chk.addEventListener("change", () => {
        const todosChecked = Array.from(chks).every(c => c.checked)
        chkTodos.checked = todosChecked
        renderizarSeleccionados()
      })
    })

    // Renderizamos por primera vez (con todos los elementos marcados)
    renderizarSeleccionados()

  } catch (error) {
    contenedorMensajes.textContent = "No fue posible cargar los mensajes. Revisa que el servidor esté funcionando."
  }
}

async function cargarCalendario() {
  try {
    const respuesta = await fetch("/api/calendario")
    calendarioDisponible = await respuesta.json()

    // 1. Mostrar y limpiar el contenedor selector de calendario
    const selectorCalendario = document.getElementById("SelectorCalendario")
    selectorCalendario.style.display = "block"
    selectorCalendario.innerHTML = ""

    // 2. Crear la opción de "Seleccionar todos"
    const divSelectAll = document.createElement("div")
    divSelectAll.classList.add("opcion-seleccion")
    divSelectAll.innerHTML = `
      <label>
        <input type="checkbox" id="chkTodosCalendario" checked>
        <strong>Seleccionar todos</strong>
      </label>
    `
    selectorCalendario.appendChild(divSelectAll)

    // 3. Crear los checkboxes para cada pieza del calendario
    calendarioDisponible.forEach(pieza => {
      const divOpcion = document.createElement("div")
      divOpcion.classList.add("opcion-seleccion")
      divOpcion.innerHTML = `
        <label>
          <input type="checkbox" class="chk-calendario" data-id="${pieza.id}" checked>
          Semana ${pieza.semana} - ${pieza.dia} (${pieza.tema})
        </label>
      `
      selectorCalendario.appendChild(divOpcion)
    })

    // 4. Función para renderizar únicamente las piezas seleccionadas
    const renderizarSeleccionados = () => {
      contenedorCalendario.innerHTML = ""
      const chks = document.querySelectorAll(".chk-calendario")
      const idsSeleccionados = Array.from(chks)
        .filter(chk => chk.checked)
        .map(chk => parseInt(chk.dataset.id))

      const filtrados = calendarioDisponible.filter(c => idsSeleccionados.includes(c.id))

      if (filtrados.length === 0) {
        contenedorCalendario.innerHTML = "<p class='texto-secundario'>Ninguna pieza seleccionada.</p>"
        return
      }

      for (const pieza of filtrados) {
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
    }

    // 5. Configurar el evento de "Seleccionar todos"
    const chkTodos = document.getElementById("chkTodosCalendario")
    chkTodos.addEventListener("change", (e) => {
      const chks = document.querySelectorAll(".chk-calendario")
      chks.forEach(chk => chk.checked = e.target.checked)
      renderizarSeleccionados()
    })

    // 6. Configurar el evento para cada checkbox individual
    const chks = document.querySelectorAll(".chk-calendario")
    chks.forEach(chk => {
      chk.addEventListener("change", () => {
        const todosChecked = Array.from(chks).every(c => c.checked)
        chkTodos.checked = todosChecked
        renderizarSeleccionados()
      })
    })

    // Renderizamos por primera vez (con todos los elementos marcados)
    renderizarSeleccionados()

  } catch (error) {
    contenedorCalendario.textContent = "No fue posible cargar el calendario editorial. Revisa que el servidor esté funcionando."
  }
}
