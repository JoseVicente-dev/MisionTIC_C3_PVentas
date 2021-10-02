console.log('Buscar Venta Funcional')
function InsertarDatosModalResultadoBusquedaId() {
    // var num = document.getElementById("IdVentaBuscada");
    // const ResultadoId = document.getElementById("IdResultado")
    // const ResultadoArticulo = document.getElementById("ArticuloResultado")
    // const ResultadoCliente = document.getElementById("ClienteResultado")
    // const ResultadoValor = document.getElementById("ValorResultado")
    // const ResultadoFechaVenta = document.getElementById("FechaVentaResultado")
    // const ResultadoFechaPago = document.getElementById("FechaPagoResultado")
    // const ResultadoVendedor = document.getElementById("VendedorResultado")
    // const ResultadoEstado = document.getElementById("EstadoResultado")
    // ResultadoId.textContent = Id[num.value-1]
    // ResultadoArticulo.placeholder = Articulo[num.value-1]
    // ResultadoCliente.placeholder = Cliente[num.value-1]
    // ResultadoValor.placeholder = Valor[num.value-1]
    // ResultadoFechaVenta.placeholder = FechaVenta[num.value-1]
    // ResultadoFechaPago.placeholder = FechaPago[num.value-1]
    // ResultadoVendedor.placeholder = Vendedor[num.value-1]
    // var valor = Estado[num.value-1]
    // var opciones = ResultadoEstado.options
    // for (var opt, j = 0; opt = opciones[j]; j++) {
    //     if (opt.value == valor) {
    //         ResultadoEstado.selectedIndex = j;
    //         break;
    //     }
    // }
    let cuerpoTabla = document.getElementById("AquiVaLaFila")
    let radios = cuerpoTabla.getElementsByTagName("input")
    let filas = cuerpoTabla.getElementsByTagName("tr")

    let filaSeleccionada3 = document.getElementById("IdVentaBuscada")
    let IdVenta = document.getElementById("Id"+(filaSeleccionada3.value-1))
    console.log(IdVenta.innerText)
    filaSeleccionada2 = filas[IdVenta.innerText-1]
    console.log(filaSeleccionada2.value)
    document.getElementById("IdResultado").textContent = filaSeleccionada2.cells[1].innerText
    document.getElementById("ArticuloResultado").value = filaSeleccionada2.cells[2].innerText
    document.getElementById("ClienteResultado").value = filaSeleccionada2.cells[3].innerText
    document.getElementById("ValorResultado").value = filaSeleccionada2.cells[4].innerText
    document.getElementById("FechaVentaResultado").value = filaSeleccionada2.cells[5].innerText
    document.getElementById("FechaPagoResultado").value = filaSeleccionada2.cells[6].innerText
    document.getElementById("VendedorResultado").value = filaSeleccionada2.cells[7].innerText
    

    if (filaSeleccionada.cells[8].innerText == "Cancelada") {

        document.getElementById("EstadoResultado").selectedIndex = 0
    }
    else {

        document.getElementById("EstadoResultado").selectedIndex = 1
    }

}
function InsertarDatosModalResultadoBusquedaNombre() {
    var nombreCliente = document.getElementById("NombreVentaBuscada")
    console.log(nombreCliente)
    console.log(nombreCliente.value)
    const posicion = Cliente.indexOf(nombreCliente.value)
    console.log(posicion)
    var num = document.getElementById("IdVentaBuscada");
    const ResultadoId = document.getElementById("IdResultado")
    const ResultadoArticulo = document.getElementById("ArticuloResultado")
    const ResultadoCliente = document.getElementById("ClienteResultado")
    const ResultadoValor = document.getElementById("ValorResultado")
    const ResultadoFechaVenta = document.getElementById("FechaVentaResultado")
    const ResultadoFechaPago = document.getElementById("FechaPagoResultado")
    const ResultadoVendedor = document.getElementById("VendedorResultado")
    const ResultadoEstado = document.getElementById("EstadoResultado")
    ResultadoId.textContent = Id[posicion]
    ResultadoArticulo.placeholder = Articulo[posicion]
    ResultadoCliente.placeholder = Cliente[posicion]
    ResultadoValor.placeholder = Valor[posicion]
    ResultadoFechaVenta.placeholder = FechaVenta[posicion]
    ResultadoFechaPago.placeholder = FechaPago[posicion]
    ResultadoVendedor.placeholder = Vendedor[posicion]
    var valor = Estado[posicion]
    var opciones = ResultadoEstado.options
    for (var opt, j = 0; opt = opciones[j]; j++) {
        if (opt.value == valor) {
            ResultadoEstado.selectedIndex = j;
            break;
        }
    }
}