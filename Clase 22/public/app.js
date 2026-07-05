const btnMensajes = document.getElementById("btnMensajes")
const btnCalendario = document.getElementById("btnCalendario")
const btnResumen = document.getElementById("btnResumen")

const contenedorMensajes = document.getElementById("contenedorMensajes")
const contenedorCalendario = document.getElementById("contenedorCalendario")
const contenedorResumen = document.getElementById("contenedorResumen")

let mensajesDisponibles = []
let calendarioDisponible = []

btnMensajes.addEventListener("click", () => {
  cargarMensajes()
})

btnCalendario.addEventListener("click", () => {
  cargarCalendario()
})

btnResumen.addEventListener("click", () => {
  cargarResumen()
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
          <p class="texto-secundario"><strong>Revisión editorial:</strong> ${mensaje.revisionEditorial}</p>
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

async function cargarResumen() {
  try {
    // Asegurar que tenemos la lista de mensajes y calendario
    if (mensajesDisponibles.length === 0) {
      const respMensajes = await fetch("/api/mensajes")
      mensajesDisponibles = await respMensajes.json()
    }
    if (calendarioDisponible.length === 0) {
      const respCalendario = await fetch("/api/calendario")
      calendarioDisponible = await respCalendario.json()
    }

    // 1. Mostrar y limpiar el contenedor selector de resumen
    const selectorResumen = document.getElementById("SelectorResumen")
    selectorResumen.style.display = "block"
    selectorResumen.innerHTML = ""

    // 2. Crear la opción de "Seleccionar todos"
    const divSelectAll = document.createElement("div")
    divSelectAll.classList.add("opcion-seleccion")
    divSelectAll.innerHTML = `
      <label>
        <input type="checkbox" id="chkTodosResumen" checked>
        <strong>Seleccionar todos</strong>
      </label>
    `
    selectorResumen.appendChild(divSelectAll)

    // 3. Crear los checkboxes para cada mensaje en el resumen
    mensajesDisponibles.forEach(mensaje => {
      const divOpcion = document.createElement("div")
      divOpcion.classList.add("opcion-seleccion")
      divOpcion.innerHTML = `
        <label>
          <input type="checkbox" class="chk-resumen-mensaje" data-id="${mensaje.id}" checked>
          ${mensaje.titulo}
        </label>
      `
      selectorResumen.appendChild(divOpcion)
    })

    // 4. Función para renderizar el resumen basado en la selección
    const renderizarResumenSeleccionado = () => {
      contenedorResumen.innerHTML = ""
      const chks = document.querySelectorAll(".chk-resumen-mensaje")
      const idsSeleccionados = Array.from(chks)
        .filter(chk => chk.checked)
        .map(chk => parseInt(chk.dataset.id))

      const mensajesFiltrados = mensajesDisponibles.filter(m => idsSeleccionados.includes(m.id))

      if (mensajesFiltrados.length === 0) {
        contenedorResumen.innerHTML = "<p class='texto-secundario'>Ningún mensaje seleccionado para el resumen.</p>"
        return
      }

      // Obtener categorías únicas de los mensajes seleccionados
      const categoriasUnicas = Array.from(new Set(mensajesFiltrados.map(m => m.categoria)))

      // 1. Mostrar tarjeta de estadísticas generales (Resumen global)
      const tarjetaGlobal = document.createElement("article")
      tarjetaGlobal.classList.add("tarjeta-mensaje")
      tarjetaGlobal.style.borderLeftColor = "#007acc" // Color distintivo para la cabecera del resumen
      tarjetaGlobal.innerHTML = `
        <h3>Estadísticas del Resumen</h3>
        <p><strong>Total de mensajes seleccionados:</strong> ${mensajesFiltrados.length}</p>
        <p><strong>Total de piezas del calendario:</strong> ${calendarioDisponible.length}</p>
        <p><strong>Categorías representadas:</strong> ${categoriasUnicas.length > 0 ? categoriasUnicas.join(", ") : "Ninguna"}</p>
        <p class="texto-secundario">Resumen generado desde la API del proyecto comunitario en tiempo real.</p>
      `
      contenedorResumen.appendChild(tarjetaGlobal)

      // 2. Mostrar cada mensaje seleccionado de forma individual
      mensajesFiltrados.forEach(mensaje => {
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
          <p class="texto-secundario"><strong>Revisión editorial:</strong> ${mensaje.revisionEditorial}</p>
        `
        contenedorResumen.appendChild(tarjeta)
      })
    }

    // 5. Configurar el evento de "Seleccionar todos"
    const chkTodos = document.getElementById("chkTodosResumen")
    chkTodos.addEventListener("change", (e) => {
      const chks = document.querySelectorAll(".chk-resumen-mensaje")
      chks.forEach(chk => chk.checked = e.target.checked)
      renderizarResumenSeleccionado()
    })

    // 6. Configurar el evento para cada checkbox individual
    const chks = document.querySelectorAll(".chk-resumen-mensaje")
    chks.forEach(chk => {
      chk.addEventListener("change", () => {
        const todosChecked = Array.from(chks).every(c => c.checked)
        chkTodos.checked = todosChecked
        renderizarResumenSeleccionado()
      })
    })

    // Renderizamos por primera vez
    renderizarResumenSeleccionado()

  } catch (error) {
    contenedorResumen.textContent = "No fue posible cargar el resumen. Revisa que el servidor esté funcionando."
  }
}
