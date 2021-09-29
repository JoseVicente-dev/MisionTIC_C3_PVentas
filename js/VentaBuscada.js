console.log('Ventana Buscada Presente')

function InsertarDatosModalVentaBuscada(id) {
    
    var id = id;
    console.log(id)


    const BusquedaId = document.getElementById("IdBusqueda")
    const BusquedaArticulo = document.getElementById("ArticuloBusqueda")
    const BusquedaCliente = document.getElementById("ClienteBusqueda")
    const BusquedaValor = document.getElementById("ValorBusqueda")
    const BusquedaFechaVenta = document.getElementById("FechaVentaBusqueda")
    const BusquedaFechaPago = document.getElementById("FechaPagoBusqueda")
    const BusquedaVendedor = document.getElementById("VendedorBusqueda")
    const BusquedaEstado = document.getElementById("EstadoBusqueda")

    BusquedaId.textContent = Id[id]
    BusquedaArticulo.placeholder = Articulo[id]
    BusquedaCliente.placeholder = Cliente[id]
    BusquedaValor.placeholder = Valor[id]
    BusquedaFechaVenta.placeholder = FechaVenta[id]
    BusquedaFechaPago.placeholder = FechaPago[id]
    BusquedaVendedor.placeholder = Vendedor[id]
    var valor = Estado[id]
    console.log(valor)
    var opciones= BusquedaEstado.options
    
    for (var opt, j=0; opt = opciones[j]; j++){
        console.log(opciones[j])
        console.log(opt.value)
        console.log(BusquedaEstado.selectedIndex)
        if (opt.value == valor){
            console.log(BusquedaEstado.selectedIndex)
            BusquedaEstado.selectedIndex  = j;
            console.log(BusquedaEstado.selectedIndex)
            console.log(valor)
            console.log(opt.value)
            console.log(opt)
            console.log(j)
            console.log(j.value)
            console.log(opciones[j])
           
            break;
        }
        BusquedaEstado.selectedIndex  = valor;
    }



}