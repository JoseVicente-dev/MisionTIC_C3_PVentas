function nuevaFila() {

    var table = document.getElementById("tabla_usuarios");
    var idInput = document.getElementById("ID_input").value;
    var nombresInput = document.getElementById("Nombres_input").value;
    var apellidosInput = document.getElementById("Apellidos_input").value;
    var rolInput = document.getElementById("Rol_input").value;
    var estadoInput = document.getElementById("Estado_input").value;


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
    cell6.innerHTML = estadoInput;

}


