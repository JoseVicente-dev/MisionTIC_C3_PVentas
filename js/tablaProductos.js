let filaObjetivo;

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

            // console.log((i + 1) + "-ésima fila seleccionada")
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

    
    let contenedor = document.getElementById("contenedorBuscar")

    console.log(contenedor);

    

    let divValorUnitario = document.createElement("div")
    divValorUnitario.setAttribute("class", "col")

    let valorUnitario = document.createElement("input")
    valorUnitario.setAttribute("type", "text")
    valorUnitario.setAttribute("class", "form-control")
    valorUnitario.setAttribute("id", "buscarValorUnitario")
    valorUnitario.setAttribute("placeholder", "Valor Unitario ($)")
    valorUnitario.setAttribute("style", "margin: 10px; max-width: 90%; border-color: #7a87bb; margin-left: 15px; background-color: gainsboro; text-align: center;")
    valorUnitario.setAttribute("disabled","")

    divValorUnitario.appendChild(valorUnitario)

    let divEstado = document.createElement("div")
    divEstado.setAttribute("class", "col")

    let estado = document.createElement("select")    
    estado.setAttribute("class", "form-select")
    estado.setAttribute("id", "buscarEstado")    
    estado.setAttribute("style", "margin: 10px; max-width: 90%; border-color: #7a87bb; margin-left: 15px; background-color: gainsboro; text-align: center;")
    estado.setAttribute("aria-label","Default select example")
    estado.setAttribute("disabled","")
    

    let opcion1=document.createElement("option")
    opcion1.setAttribute("value","1")
    opcion1.textContent="Disponible"
    let opcion2=document.createElement("option")
    opcion2.setAttribute("value","2")
    opcion2.textContent="No disponible"

    estado.appendChild(opcion1)
    estado.appendChild(opcion2)

    divEstado.appendChild(estado)

    contenedor.appendChild(divValorUnitario)
    contenedor.appendChild(divEstado)

    document.getElementById("buscarCodigo").setAttribute("style", "margin: 10px; max-width: 90%; border-color: #7a87bb; margin-left: 15px; background-color: gainsboro; text-align: center;")
    document.getElementById("buscarDescripcion").setAttribute("style", "margin: 10px; max-width: 90%; border-color: #7a87bb; margin-left: 15px; background-color: gainsboro; text-align: center;")
    document.getElementById("buscarCodigo").setAttribute("disabled","")
    document.getElementById("buscarDescripcion").setAttribute("disabled","")   

}