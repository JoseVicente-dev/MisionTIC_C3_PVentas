console.log('Buscar Venta Funcional')
function InsertarDatosModalResultadoBusquedaId() {
    var num = document.getElementById("IdVentaBuscada");
    const ResultadoId = document.getElementById("IdResultado")
    const ResultadoArticulo = document.getElementById("ArticuloResultado")
    const ResultadoCliente = document.getElementById("ClienteResultado")
    const ResultadoValor = document.getElementById("ValorResultado")
    const ResultadoFechaVenta = document.getElementById("FechaVentaResultado")
    const ResultadoFechaPago = document.getElementById("FechaPagoResultado")
    const ResultadoVendedor = document.getElementById("VendedorResultado")
    const ResultadoEstado = document.getElementById("EstadoResultado")
    ResultadoId.textContent = Id[num.value-1]
    ResultadoArticulo.placeholder = Articulo[num.value-1]
    ResultadoCliente.placeholder = Cliente[num.value-1]
    ResultadoValor.placeholder = Valor[num.value-1]
    ResultadoFechaVenta.placeholder = FechaVenta[num.value-1]
    ResultadoFechaPago.placeholder = FechaPago[num.value-1]
    ResultadoVendedor.placeholder = Vendedor[num.value-1]
    var valor = Estado[num.value-1]
    var opciones = ResultadoEstado.options
    for (var opt, j = 0; opt = opciones[j]; j++) {
        if (opt.value == valor) {
            ResultadoEstado.selectedIndex = j;
            break;
        }
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