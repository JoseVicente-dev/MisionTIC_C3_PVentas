console.log('Nueva Venta')

function NuevaVenta() {
    
    const NuevoId = document.getElementById("IdNuevo")
    const NuevoArticulo = document.getElementById("ArticuloNuevo")
    const NuevoCliente = document.getElementById("ClienteNuevo")
    const NuevoValor = document.getElementById("ValorNuevo")
    const NuevoFechaVenta = document.getElementById("FechaVentaNuevo")
    const NuevoFechaPago = document.getElementById("FechaPagoNuevo")
    const NuevoVendedor = document.getElementById("VendedorNuevo")
    const NuevoEstado = document.getElementById("EstadoNuevo")

    let insertarFila = document.getElementById("AquiVaLaFila")
    let numerodeFilas = insertarFila.getElementsByTagName("tr").length

    filaTabla = document.createElement("tr")
    filaTabla.setAttribute("id", "row" + (numerodeFilas + 1))
    seleccionar = document.createElement("th")

    var Check = document.createElement("input");
    Check.setAttribute("class", "form-check-input")
    Check.setAttribute("type", "radio");
    Check.setAttribute("name", "flexRadioDefault")
    Check.setAttribute("id", (numerodeFilas + 1));
    // con estas dos funciones cuando presionamos un checkbox apareceran los botones
    // y se enviará la información para rellenar los modales necesarios
    Check.setAttribute("onClick","MostrarBotones();InsertarDatosModalVentaBuscada(id)")
    var IdInsertado = document.createElement("label");
    IdInsertado.setAttribute("id", "Id" + (numerodeFilas + 1));
    IdInsertado.textContent = (numerodeFilas + 1)

    console.log(IdInsertado.value)

    var ArticuloInsertado = document.createElement("label");
    ArticuloInsertado.setAttribute("id", "Articulo" + (numerodeFilas + 1));
    ArticuloInsertado.textContent = NuevoArticulo.value

    var ClienteInsertado = document.createElement("label");
    ClienteInsertado.setAttribute("id", "Cliente" + (numerodeFilas + 1));
    ClienteInsertado.textContent = NuevoCliente.value

    var ValorInsertado = document.createElement("label");
    ValorInsertado.setAttribute("id", "Valor" + (numerodeFilas + 1));
    ValorInsertado.textContent = NuevoValor.value

    var FechaVentaInsertado = document.createElement("label");
    FechaVentaInsertado.setAttribute("id", "FechaVenta" + (numerodeFilas + 1));
    FechaVentaInsertado.textContent = NuevoFechaVenta.value

    var FechaPagoInsertado = document.createElement("label");
    FechaPagoInsertado.setAttribute("id", "FechaPago" + (numerodeFilas + 1));
    FechaPagoInsertado.textContent = NuevoFechaPago.value

    var VendedorInsertado = document.createElement("label");
    VendedorInsertado.setAttribute("id", "Vendedor" + (numerodeFilas + 1));
    VendedorInsertado.textContent = NuevoVendedor.value

    var EstadoInsertado = document.createElement("label");
    EstadoInsertado.setAttribute("id", "Estado" + (numerodeFilas + 1));
    EstadoInsertado.textContent = NuevoEstado.value

    Fila = document.createElement("tr");
    div = document.createElement("div")
    div.setAttribute("class", "form-check")
    col1 = document.createElement("th");
    div.appendChild(Check)
    col1.appendChild(div);
    col2 = document.createElement("td");
    col2.appendChild(IdInsertado);
    col3 = document.createElement("td");
    col3.appendChild(ArticuloInsertado);
    col4 = document.createElement("td");
    col4.appendChild(ClienteInsertado);
    col5 = document.createElement("td");
    col5.appendChild(ValorInsertado);
    col6 = document.createElement("td");
    col6.appendChild(FechaVentaInsertado);
    col7 = document.createElement("td");
    col7.appendChild(FechaPagoInsertado);
    col8 = document.createElement("td");
    col8.appendChild(VendedorInsertado);
    col9 = document.createElement("td");
    col9.appendChild(EstadoInsertado);
    Fila.appendChild(col1)
    Fila.appendChild(col2)
    Fila.appendChild(col3)
    Fila.appendChild(col4)
    Fila.appendChild(col5)
    Fila.appendChild(col6)
    Fila.appendChild(col7)
    Fila.appendChild(col8)
    Fila.appendChild(col9)
    insertarFila.appendChild(Fila)

    // se ingresa la info de las nuevas ventas en los vectores 
    // Id.push(UltimoIdVenta+1)
    // console.log(Id.at(-2))
    // console.log(Id.at(-1))
    // Articulo.push(NuevoArticulo.value)
    // console.log(Articulo.at(-2))
    // console.log(Articulo.at(-1))
    // Cliente.push(NuevoCliente.value)
    // console.log(Cliente.at(-2))
    // console.log(Cliente.at(-1))
    // Valor.push(NuevoValor.value)
    // console.log(Valor.at(-2))
    // console.log(Valor.at(-1))
    // FechaVenta.push(NuevoFechaVenta.value)
    // console.log(FechaVenta.at(-2))
    // console.log(FechaVenta.at(-1))
    // FechaPago.push(NuevoFechaPago.value)
    // console.log(FechaPago.at(-2))
    // console.log(FechaPago.at(-1))
    // Vendedor.push(NuevoVendedor.value)
    // console.log(Vendedor.at(-2))
    // console.log(Vendedor.at(-1))
    // Estado.push(NuevoEstado.value)
    // console.log(Estado.at(-2))
    // console.log(Estado.at(-1))


}