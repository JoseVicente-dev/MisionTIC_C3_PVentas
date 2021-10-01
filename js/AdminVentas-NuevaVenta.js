

function NuevaVenta() {
 

    console.log(UltimoIdVenta)
   
    const NuevoId = document.getElementById("IdNuevo")
    const NuevoArticulo = document.getElementById("ArticuloNuevo")
    const NuevoCliente = document.getElementById("ClienteNuevo")
    const NuevoValor = document.getElementById("ValorNuevo")
    const NuevoFechaVenta = document.getElementById("FechaVentaNuevo")
    const NuevoFechaPago = document.getElementById("FechaPagoNuevo")
    const NuevoVendedor = document.getElementById("VendedorNuevo")
    const NuevoEstado = document.getElementById("EstadoNuevo")
    
    Id.push(UltimoIdVenta+1)
    console.log(Id.at(-2))
    console.log(Id.at(-1))
    Articulo.push(NuevoArticulo.value)
    console.log(Articulo.at(-2))
    console.log(Articulo.at(-1))
    Cliente.push(NuevoCliente.value)
    console.log(Cliente.at(-2))
    console.log(Cliente.at(-1))
    Valor.push(NuevoValor.value)
    console.log(Valor.at(-2))
    console.log(Valor.at(-1))
    FechaVenta.push(NuevoFechaVenta.value)
    console.log(FechaVenta.at(-2))
    console.log(FechaVenta.at(-1))
    FechaPago.push(NuevoFechaVenta.value)
    console.log(FechaPago.at(-2))
    console.log(FechaPago.at(-1))
    Vendedor.push(NuevoVendedor.value)
    console.log(Vendedor.at(-2))
    console.log(Vendedor.at(-1))
    Estado.push(NuevoEstado.value)
    console.log(Estado.at(-2))
    console.log(Estado.at(-1))


}