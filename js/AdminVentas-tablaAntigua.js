console.log('hola')
// Funcion para crear una nueva fila he insertarla en una tabla ya creada
function nuevaFila() {
    // se crea input container el cual busca el elemento con el id="AquiVaLaFila"
    var dondeInsertar = document.getElementById("AquiVaLaFila");

    // se Crean los imputs
    // for (var i = 0; i < 10; i++) {
    var Check = document.createElement("input");
    Check.setAttribute("class", "form-check-input")
    Check.setAttribute("type", "radio");
    Check.setAttribute("name", "flexRadioDefault")
    Check.setAttribute("id", "flexRadioDefault");
    
    var Id = document.createElement("input");
    Id.setAttribute("type", "text");
    Id.setAttribute("id", "Id");
    var Articulo = document.createElement("input");
    Articulo.setAttribute("type", "text");
    Articulo.setAttribute("id", "Articulo");
    var Cliente = document.createElement("input");
    Cliente.setAttribute("type", "text");
    Cliente.setAttribute("id", "Cliente");
    var Valor = document.createElement("input");
    Valor.setAttribute("type", "text");
    Valor.setAttribute("id", "Valor");
    var FechaVenta = document.createElement("input");
    FechaVenta.setAttribute("type", "text");
    FechaVenta.setAttribute("id", "FechaVenta");
    var FechaPago = document.createElement("input");
    FechaPago.setAttribute("type", "text");
    FechaPago.setAttribute("id", "FechaPago");
    var Vendedor = document.createElement("input");
    Vendedor.setAttribute("type", "text");
    Vendedor.setAttribute("id", "Vendedor");
    var Estado = document.createElement("input");
    Estado.setAttribute("type", "text");
    Estado.setAttribute("id", "Estado");
    // no es necesario crear la tabla solo las filas
    // los estilos se le aplicaran automaticamente a esta fila cuando sean
    // insertados en la tabla
    // se crea la fila
    Fila = document.createElement("tr");
    div = document.createElement("div")
    div.setAttribute("class","form-check")
    
        // se crea la primer columnita de la fila y se le agrega el check
        col1 = document.createElement("th");
             div.appendChild(Check)
             col1.appendChild(div);
        // se crea la segunda columnita he la fila y se le agrega Id
        col2 = document.createElement("td");
             col2.appendChild(Id);
        col3 = document.createElement("td");
             col3.appendChild(Articulo);
        col4 = document.createElement("td");
             col4.appendChild(Cliente);
        col5 = document.createElement("td");
             col5.appendChild(Valor);
        col6 = document.createElement("td");
             col6.appendChild(FechaVenta);
        col7 = document.createElement("td");
             col7.appendChild(FechaPago);
        col8 = document.createElement("td");
             col8.appendChild(Vendedor);
        col9 = document.createElement("td");
             col9.appendChild(Estado);
  
    // luego agregamos cada columnita a la fila
    Fila.appendChild(col1)
    Fila.appendChild(col2)
    Fila.appendChild(col3)
    Fila.appendChild(col4)
    Fila.appendChild(col5)
    Fila.appendChild(col6)
    Fila.appendChild(col7)
    Fila.appendChild(col8)
    Fila.appendChild(col9)
  
    // por ultimo le decimos a la fila donde aparecer agregandola a dondeInsertar
    dondeInsertar.appendChild(Fila)
// }
<<<<<<< HEAD
}

/* as */
=======
}
>>>>>>> 921388469438c2a71ce96b48cad2c0fb12e579c7
