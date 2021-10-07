let filaObjetivo;
function modificarProducto() {

    let cuerpoTabla = document.getElementById("AquiVaLaFila")
    let radios = cuerpoTabla.getElementsByTagName("input")
    let filas = cuerpoTabla.getElementsByTagName("tr")
    let totalFilas = radios.length


    for (i = 0; i < totalFilas; i++) {
        if (radios[i].checked) {

            // console.log((i + 1) + "-ésima fila seleccionada")
            filaSeleccionada = filas[i]
            document.getElementById("IdBusqueda").textContent = filaSeleccionada.cells[1].innerText
            document.getElementById("ArticuloBusqueda").value = filaSeleccionada.cells[2].innerText
            document.getElementById("ClienteBusqueda").value = filaSeleccionada.cells[3].innerText
            document.getElementById("ValorBusqueda").value = filaSeleccionada.cells[4].innerText
            document.getElementById("FechaVentaBusqueda").value = filaSeleccionada.cells[5].innerText
            document.getElementById("FechaPagoBusqueda").value = filaSeleccionada.cells[6].innerText
            document.getElementById("VendedorBusqueda").value = filaSeleccionada.cells[7].innerText


            if (filaSeleccionada.cells[8].innerText == "Cancelada") {

                document.getElementById("EstadoBusqueda").selectedIndex = 0
            }
            else {

                document.getElementById("EstadoBusqueda").selectedIndex = 1
            }

            filaObjetivo = filaSeleccionada
        }
    }
}

function actualizarProducto() {

    // filaObjetivo.cells[2].innerText = document.getElementById("modifyCodigo").value
    filaObjetivo.cells[0].getElementsByTagName("input")[0].checked = true
    filaObjetivo.cells[2].innerText = document.getElementById("ArticuloBusqueda").value
    filaObjetivo.cells[3].innerText = document.getElementById("ClienteBusqueda").value
    filaObjetivo.cells[4].innerText = document.getElementById("ValorBusqueda").value
    filaObjetivo.cells[5].innerText = document.getElementById("FechaVentaBusqueda").value
    filaObjetivo.cells[6].innerText = document.getElementById("FechaPagoBusqueda").value
    filaObjetivo.cells[7].innerText = document.getElementById("VendedorBusqueda").value

    if (document.getElementById("EstadoBusqueda").selectedIndex == 0) {

        filaObjetivo.cells[8].innerText = "Cancelada"
    }
    else {

        filaObjetivo.cells[8].innerText = "Pendiente"
    }
}

function actualizarProductoBuscarVenta() {


    // filaSeleccionada2 = filas[IdVenta.innerText-1]
    // document.getElementById("IdResultado").textContent = filaSeleccionada2.cells[1].innerText
    // document.getElementById("ArticuloResultado").value = filaSeleccionada2.cells[2].innerText
    // document.getElementById("ClienteResultado").value = filaSeleccionada2.cells[3].innerText
    // document.getElementById("ValorResultado").value = filaSeleccionada2.cells[4].innerText
    // document.getElementById("FechaVentaResultado").value = filaSeleccionada2.cells[5].innerText
    // document.getElementById("FechaPagoResultado").value = filaSeleccionada2.cells[6].innerText
    // document.getElementById("VendedorResultado").value = filaSeleccionada2.cells[7].innerText
    

    // if (filaSeleccionada.cells[8].innerText == "Cancelada") {

    //     document.getElementById("EstadoResultado").selectedIndex = 0
    // }
    // else {

    //     document.getElementById("EstadoResultado").selectedIndex = 1
    // }

    let IdVenta = document.getElementById("IdResultado")

    console.log(IdVenta.innerText)
    let cuerpoTabla = document.getElementById("AquiVaLaFila")
    let radios = cuerpoTabla.getElementsByTagName("input")
    let filas = cuerpoTabla.getElementsByTagName("tr")
    filaSeleccionada2 = filas[IdVenta.innerText-1]

    // filaObjetivo.cells[2].innerText = document.getElementById("modifyCodigo").value
    filaSeleccionada2.cells[0].getElementsByTagName("input")[0].checked = true
    filaSeleccionada2.cells[2].innerText = document.getElementById("ArticuloResultado").value
    filaSeleccionada2.cells[3].innerText = document.getElementById("ClienteResultado").value
    filaSeleccionada2.cells[4].innerText = document.getElementById("ValorResultado").value
    filaSeleccionada2.cells[5].innerText = document.getElementById("FechaVentaResultado").value
    filaSeleccionada2.cells[6].innerText = document.getElementById("FechaPagoResultado").value
    filaSeleccionada2.cells[7].innerText = document.getElementById("VendedorResultado").value

    if (document.getElementById("EstadoResultado").selectedIndex == 0) {

        filaSeleccionada2.cells[8].innerText = "Cancelada"
    }
    else {

        filaSeleccionada2.cells[8].innerText = "Pendiente"
    }
}