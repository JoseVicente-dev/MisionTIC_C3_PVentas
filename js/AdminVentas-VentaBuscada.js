function InsertarDatosModalVentaBuscada(id) {
    var id = id;
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
    var opciones = BusquedaEstado.options
    for (var opt, j = 0; opt = opciones[j]; j++) {
        if (opt.value == valor) {
            BusquedaEstado.selectedIndex = j;
            break;
        }
    }
<<<<<<< HEAD
}
=======
}

const btnModificarDatosModalVentaBuscada = document.getElementById("btnModificarModalModificar")
btnModificarDatosModalVentaBuscada.addEventListener('click', (e)=>{
    e.preventDefault()
    InsertarDatosModalVentaBuscada()
})
>>>>>>> 921388469438c2a71ce96b48cad2c0fb12e579c7
