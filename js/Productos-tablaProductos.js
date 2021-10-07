let filaObjetivo;

const btnInsertarProducto = document.getElementById('btnAdicionarModalAdicionar')
const btnModificarProducto = document.getElementById('btnModificarModalModificar')
const btnBuscarProducto = document.getElementById('btnBuscarModalBuscar')

const btnAdicionarPrincipal = document.getElementById('btnAdicionarPrincipal')
const btnModificarPrincipal = document.getElementById('btnModificarPrincial')
const btnBuscarPrincipal = document.getElementById('btnBuscarPrincipal')



function insertarProducto() {

    let insertarFila = document.getElementById("cuerpoTablaProductos")
    console.log(insertarFila);

    // .getElementsByTagName("tbody")

    let i = insertarFila.getElementsByTagName("tr").length

    filaTabla = document.createElement("tr")
    filaTabla.setAttribute("id", "row" + (i + 1))
    seleccionar = document.createElement("th")

    div = document.createElement("div")
    div.setAttribute("class", "form-check")

    radio = document.createElement("input")
    radio.setAttribute("class", "form-check-input")
    radio.setAttribute("type", "radio")
    radio.setAttribute("name", "flexRadioDefault")
    radio.setAttribute("id", "flexRadioDefault" + i + 1)
    radio.checked = true
    div.appendChild(radio)
    seleccionar.appendChild(div)

    filaTabla.appendChild(seleccionar)

    numeroProducto = document.createElement("th")
    numeroProducto.setAttribute("scope", "row")
    numeroProducto.textContent = i + 1

    codigo = document.createElement("td")
    codigo.textContent = document.getElementById("inputCodigo").value

    descripcion = document.createElement("td")
    descripcion.textContent = document.getElementById("inputDescripcion").value

    valorUnitario = document.createElement("td")
    valorUnitario.textContent = document.getElementById("inputValorUnitario").value

    estado = document.createElement("td")
    let e = document.getElementById("inputEstado")
    estado.textContent = e.options[e.selectedIndex].text

    filaTabla.appendChild(numeroProducto)
    filaTabla.appendChild(codigo)
    filaTabla.appendChild(descripcion)
    filaTabla.appendChild(valorUnitario)
    filaTabla.appendChild(estado)

    insertarFila.appendChild(filaTabla)
}

function modificarProducto() {

    let cuerpoTabla = document.getElementById("cuerpoTablaProductos")
    let radios = cuerpoTabla.getElementsByTagName("input")
    let filas = cuerpoTabla.getElementsByTagName("tr")
    let totalFilas = radios.length

    for (i = 0; i < totalFilas; i++) {
        if (radios[i].checked) {


            filaSeleccionada = filas[i]
            document.getElementById("modifyCodigo").value = filaSeleccionada.cells[2].innerText
            document.getElementById("modifyDescripcion").value = filaSeleccionada.cells[3].innerText
            document.getElementById("modifyValorUnitario").value = filaSeleccionada.cells[4].innerText

            if (filaSeleccionada.cells[5].innerText == "Disponible") {

                document.getElementById("modifyEstado").value = 1
            }
            else {

                document.getElementById("modifyEstado").value = 2
            }

            filaObjetivo = filaSeleccionada
        }
    }
}

function actualizarProducto() {

    // filaObjetivo.cells[2].innerText = document.getElementById("modifyCodigo").value
    filaObjetivo.cells[0].getElementsByTagName("input")[0].checked = true
    filaObjetivo.cells[3].innerText = document.getElementById("modifyDescripcion").value
    filaObjetivo.cells[4].innerText = document.getElementById("modifyValorUnitario").value

    if (document.getElementById("modifyEstado").value == 1) {

        filaObjetivo.cells[5].innerText = "Disponible"
    }
    else {

        filaObjetivo.cells[5].innerText = "No disponible"
    }
}

function buscarProducto() {

    //Busqueda del producto deseado
    let cuerpoTabla = document.getElementById("cuerpoTablaProductos")
    let filas = cuerpoTabla.getElementsByTagName("tr")
    let totalFilas = filas.length

    let codigoBuscado;
    let descripcionBuscado;
    let valorUnitarioBuscado;
    let estadoBuscado;

    if (document.getElementById("buscarCodigo").value != false) {



        for (i = 0; i < totalFilas; i++) {



            if ((filas[i].cells[2].innerText) == (document.getElementById("buscarCodigo").value)) {



                filaObjetivo = filas[i]
                filas[i].cells[0].getElementsByTagName("input")[0].checked = true

                codigoBuscado = filas[i].cells[2].innerText
                descripcionBuscado = filas[i].cells[3].innerText
                valorUnitarioBuscado = filas[i].cells[4].innerText
                if (filas[i].cells[5].innerText == "Disponible") {

                    estadoBuscado = 1
                }
                else {

                    estadoBuscado = 2
                }



                break
            }
        }
    }

    else if (document.getElementById("buscarDescripcion").value != false && (document.getElementById("buscarCodigo").value) == false) {

        for (i = 0; i < totalFilas; i++) {

            if ((filas[i].cells[3].innerText) == (document.getElementById("buscarDescripcion").value)) {

                filaObjetivo = filas[i]
                filas[i].cells[0].getElementsByTagName("input")[0].checked = true
                codigoBuscado = filas[i].cells[2].innerText
                descripcionBuscado = filas[i].cells[3].innerText
                valorUnitarioBuscado = filas[i].cells[4].innerText
                if (filas[i].cells[5].innerText == "Disponible") {

                    estadoBuscado = 1
                }
                else {

                    estadoBuscado = 2
                }

                break
            }
        }
    }

    // Modificacion del modal con los atributos del producto buscado
    let contenedor = document.getElementById("contenedorBuscar")
    let divValorUnitario = document.createElement("div")
    divValorUnitario.setAttribute("class", "col")

    let valorUnitario = document.createElement("input")
    valorUnitario.setAttribute("type", "text")
    valorUnitario.setAttribute("class", "form-control")
    valorUnitario.setAttribute("id", "buscarValorUnitario")
    valorUnitario.setAttribute("placeholder", "Valor Unitario ($)")
    valorUnitario.setAttribute("style", "margin: 10px; max-width: 90%; border-color: #7a87bb; margin-left: 15px; background-color: gainsboro; text-align: center;")
    valorUnitario.value = valorUnitarioBuscado
    valorUnitario.setAttribute("disabled", "")

    divValorUnitario.appendChild(valorUnitario)

    let divEstado = document.createElement("div")
    divEstado.setAttribute("class", "col")

    let estado = document.createElement("select")
    estado.setAttribute("class", "form-select")
    estado.setAttribute("id", "buscarEstado")
    estado.setAttribute("style", "margin: 10px; max-width: 90%; border-color: #7a87bb; margin-left: 15px; background-color: gainsboro; text-align: center;")
    estado.setAttribute("aria-label", "Default select example")

    let opcion1 = document.createElement("option")
    opcion1.setAttribute("value", "1")
    opcion1.textContent = "Disponible"
    let opcion2 = document.createElement("option")
    opcion2.setAttribute("value", "2")
    opcion2.textContent = "No disponible"

    estado.appendChild(opcion1)
    estado.appendChild(opcion2)
    estado.value = estadoBuscado
    estado.setAttribute("disabled", "")

    divEstado.appendChild(estado)

    contenedor.appendChild(divValorUnitario)
    contenedor.appendChild(divEstado)

    document.getElementById("buscarCodigo").setAttribute("style", "margin: 10px; max-width: 90%; border-color: #7a87bb; margin-left: 15px; background-color: gainsboro; text-align: center;")
    document.getElementById("buscarDescripcion").setAttribute("style", "margin: 10px; max-width: 90%; border-color: #7a87bb; margin-left: 15px; background-color: gainsboro; text-align: center;")

    document.getElementById("buscarCodigo").value = codigoBuscado
    document.getElementById("buscarDescripcion").value = descripcionBuscado
    document.getElementById("buscarCodigo").setAttribute("disabled", "")
    document.getElementById("buscarDescripcion").setAttribute("disabled", "")

    document.getElementById("btnBuscarModalBuscar").setAttribute("onClick", " modificarProducto()")
    document.getElementById("btnBuscarModalBuscar").setAttribute("data-bs-toggle", "modal")
    document.getElementById("btnBuscarModalBuscar").setAttribute("data-bs-target", "#Modificar")
    document.getElementById("btnBuscarModalBuscar").setAttribute("data-bs-dismiss", "modal")
    document.getElementById("btnBuscarModalBuscar").textContent = "Modificar"

    document.getElementById("modifyCodigo").value = codigoBuscado
    document.getElementById("modifyDescripcion").value = descripcionBuscado
    document.getElementById("modifyValorUnitario").value = valorUnitarioBuscado
    document.getElementById("modifyEstado").value = estadoBuscado

}

function limpiarBusqueda() {

    document.getElementById("inputCodigo").value = ""
    document.getElementById("inputDescripcion").value = ""
    document.getElementById("inputValorUnitario").value = ""
    document.getElementById("inputEstado").value = 1

    try {
        document.getElementById("buscarEstado").parentNode.removeChild(document.getElementById("buscarEstado"))
        document.getElementById("buscarValorUnitario").parentNode.removeChild(document.getElementById("buscarValorUnitario"))
        document.getElementById("buscarCodigo").value = ""
        document.getElementById("buscarDescripcion").value = ""
        document.getElementById("buscarCodigo").removeAttribute("disabled", "")
        document.getElementById("buscarDescripcion").removeAttribute("disabled", "")
        document.getElementById("buscarCodigo").setAttribute("style", "margin: 10px; max-width: 90%; border-color: #7a87bb; margin-left: 15px; background-color: #d8e5fe; text-align: center;")
        document.getElementById("buscarDescripcion").setAttribute("style", "margin: 10px; max-width: 90%; border-color: #7a87bb; margin-left: 15px; background-color: #d8e5fe; text-align: center;")

    } catch (error) {
        console.log(error);
    }


    // document.getElementById("btnBuscarModalBuscar").setAttribute("onClick"," buscarProducto()")
    document.getElementById("btnBuscarModalBuscar").removeAttribute("data-bs-toggle", "modal")
    document.getElementById("btnBuscarModalBuscar").removeAttribute("data-bs-target", "#Modificar")
    document.getElementById("btnBuscarModalBuscar").removeAttribute("data-bs-dismiss", "modal")
    document.getElementById("btnBuscarModalBuscar").textContent = "Buscar"

}


btnInsertarProducto.addEventListener('click', (e) => {
    e.preventDefault()
    insertarProducto()
})

btnModificarProducto.addEventListener('click', (e) => {
    e.preventDefault()
    actualizarProducto()
})

btnBuscarProducto.addEventListener('click', (e) => {
    e.preventDefault()
    buscarProducto()
})

btnAdicionarPrincipal.addEventListener('click', (e) => {
    e.preventDefault()
    limpiarBusqueda()
})

btnBuscarPrincipal.addEventListener('click', (e) => {
    e.preventDefault()
    limpiarBusqueda()
})

btnModificarPrincipal.addEventListener('click', (e) => {
    e.preventDefault()
    modificarProducto()
})

