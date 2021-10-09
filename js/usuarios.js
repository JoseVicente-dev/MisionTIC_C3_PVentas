
/* --------------------------------------------------------------------------- */
function nuevaFila() {
    var table = document.getElementById("tabla_usuarios");
    var idInput = document.getElementById("inputCodigo").value;
    var nombresInput = document.getElementById("inputnombre").value;
    var apellidosInput = document.getElementById("inputApellido").value;
    var rolInput = document.getElementById("inputRol").value;
    var estadoInput = document.getElementById("inputEstado");
    var oRows = document.getElementById('tabla_usuarios').getElementsByTagName('tr');
    var iRowCount = oRows.length;
    var row = table.insertRow(iRowCount);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    cell1.innerHTML = '<div class="form-check"><input class="form-check-input" type="radio" name="flexRadioDefault"id="flexRadioDefault6"/></div>';
    cell2.innerHTML = idInput;
    cell3.innerHTML = nombresInput;
    cell4.innerHTML = apellidosInput ;
    cell5.innerHTML = rolInput;
    cell6.innerHTML = estadoInput.value;
}

/* --------------------------------------------------------------------------- */
function limpiarModal(){
    // modal adcionar usuario
    document.getElementById("inputCodigo").value ="";
    document.getElementById("inputnombre").value="";
    document.getElementById("inputnombre").value="";
    document.getElementById("inputApellido").value="";
    document.getElementById("inputEstado")=Pendiente;
    // modal resultado modificar
   

    
    // modal buscar usuarios
/*     document.getElementById("").value ="";
    document.getElementById("").value="" ; */
    
}

/* --------------------------------------------------------------------------- */


/* --------------------------------------------------------------------------- */
function actualizarUsuario() {


    filaObjetivo.cells[0].getElementsByTagName("input")[0].checked=true
    filaObjetivo.cells[2].innerText = document.getElementById("Minputnombre").value
    filaObjetivo.cells[3].innerText = document.getElementById("MinputApellido").value
    filaObjetivo.cells[4].innerText = document.getElementById("MinputRol").value
   
    if (document.getElementById("MinputEstado").value  == "Pendiente") {

        filaObjetivo.cells[5].innerText ="Pendiente";
    }
    else if (document.getElementById("MinputEstado").value == "Autorizado") {

        filaObjetivo.cells[5].innerText ="Autorizado";
    }

    else {

        filaObjetivo.cells[5].innerText ="No autorizado";
    } 
}

/* --------------------------------------------------------------------------- */
 function buscarUsuario() {  

    var Check = document.createElement("input");
    Check.setAttribute("class", "form-check-input")
    Check.setAttribute("type", "radio");
    Check.setAttribute("name", "flexRadioDefault")
    Check.setAttribute("id", (numerodeFilas + 1));


    let contenedor = document.getElementById("contenedorBuscar");

    //Busqueda usuario
    let cuerpoTabla = document.getElementById("cuerpoTablaUsuarios");   
    let filas = cuerpoTabla.getElementsByTagName("tr")
    let totalFilas = filas.length
    console.log("totalFilas " + totalFilas);
    if (document.getElementById("buscarCodigo").value!=false){

        for(i = 0; i < totalFilas; i++){
            if ((filas[i].cells[1].innerText) == (document.getElementById("buscarCodigo").value)){
                console.log (filas[i].cells[1].innerText);

            }

        }


}
}
