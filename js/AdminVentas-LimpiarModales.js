function limpiarBusqueda() {
    // modal nueva venta
    document.getElementById("IdNuevo").value = ""
    document.getElementById("ArticuloNuevo").value = ""
    document.getElementById("ClienteNuevo").value = ""
    document.getElementById("ValorNuevo").value = ""
    document.getElementById("FechaVentaNuevo").value = ""
    document.getElementById("FechaPagoNuevo").value = ""
    document.getElementById("VendedorNuevo").value = ""
    // document.getElementById("EstadoNuevo").value= 1
    // modal modificar venta
    // document.getElementById("IdBusqueda").value =""
    // document.getElementById("ArticuloBusqueda").value=""
    // document.getElementById("ClienteBusqueda").value=""
    // document.getElementById("ValorBusqueda").value =""
    // document.getElementById("FechaVentaBusqueda").value=""
    // document.getElementById("FechaPagoBusqueda").value=""
    // document.getElementById("VendedorBusqueda").value =""
    // document.getElementById("EstadoBusqueda").value= 1
    // modal resultado busqueda
    document.getElementById("IdResultado").value = ""
    document.getElementById("ArticuloResultado").value = ""
    document.getElementById("ClienteResultado").value = ""
    document.getElementById("ValorResultado").value = ""
    document.getElementById("FechaVentaResultado").value = ""
    document.getElementById("FechaPagoResultado").value = ""
    document.getElementById("VendedorResultado").value = ""
    // document.getElementById("EstadoResultado").value= 1
    // modal buscar ventas
    document.getElementById("IdVentaBuscada").value = ""
    document.getElementById("NombreVentaBuscada").value = ""
}
const btnAgregarNuevaVentaL = document.getElementById("btnAgregarModalNuevaVenta")
btnAgregarNuevaVentaL.addEventListener('click', (e)=>{
    e.preventDefault()
    limpiarBusqueda()
})