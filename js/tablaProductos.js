let filaObjetivo;

function insertarProducto() {

    let insertarFila = document.getElementById("cuerpoTablaProductos")

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
    
    if (document.getElementById("modifyEstado").value==1){
        
        filaObjetivo.cells[5].innerText = "Disponible"
    }
    else{
        
        filaObjetivo.cells[5].innerText = "No disponible"
    }
}