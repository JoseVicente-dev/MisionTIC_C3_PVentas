const firebaseConfig = {
  apiKey: "AIzaSyCuuC5xt_cyNbakN_gIAJ3ixHvkw8LUCk8",
  authDomain: "nightmare-mercurio.firebaseapp.com",
  projectId: "nightmare-mercurio",
  storageBucket: "nightmare-mercurio.appspot.com",
  messagingSenderId: "829384661085",
  appId: "1:829384661085:web:bddd58254813be754315b4",
  measurementId: "G-TQYRLQ0VWT"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

//Declarar Variables globales  
const dataBase = firebase.firestore()

async function mostrarInformacion() {
  // Se inicia el llamado de los productos desde la BD
  const productos = []

  console.log("Inicia mostrar info")

  const respuestaProductos = await dataBase.collection('ng_productos').get()

  respuestaProductos.forEach(function (item) {

    productos.push(item.data())
  })

  //Finaliza llamado productos

  
  let insertarFila = document.getElementById("cuerpoTablaProductos")
  let i=0
  productos.forEach((p)=>{
    i++
    filaTabla = document.createElement("tr")
    filaTabla.setAttribute("id", "row" + (i))
    seleccionar = document.createElement("th")
    div = document.createElement("div")
    div.setAttribute("class", "form-check")

    radio = document.createElement("input")
    radio.setAttribute("class", "form-check-input")
    radio.setAttribute("type", "radio")
    radio.setAttribute("name", "flexRadioDefault")
    radio.setAttribute("id", "flexRadioDefault" + i)
    radio.checked=false
    div.appendChild(radio)
    seleccionar.appendChild(div)

    filaTabla.appendChild(seleccionar)

    numeroProducto = document.createElement("th")
    numeroProducto.setAttribute("scope", "row")
    numeroProducto.textContent = i

    codigo = document.createElement("td")
    codigo.textContent = p.codigo

    descripcion = document.createElement("td")
    descripcion.textContent = p.descripcion

    valorUnitario = document.createElement("td")
    valorUnitario.textContent = p.valorUnitario

    peso = document.createElement("td")
    peso.textContent = p.peso

    estado = document.createElement("td")
    p.estado ? estado.textContent = "Disponible" : estado.textContent = "No disponible"
    
    filaTabla.appendChild(numeroProducto)
    filaTabla.appendChild(codigo)
    filaTabla.appendChild(descripcion)
    filaTabla.appendChild(peso)
    filaTabla.appendChild(valorUnitario)
    filaTabla.appendChild(estado)

    insertarFila.appendChild(filaTabla)

  

  })  

}


// ------------------------------------------ Adicionar Productos--------------------------------//












mostrarInformacion()
/* ---------------------------------------------------------------------------------------------- */
//Actiualizar Productos en la tabla
async function actualizar(){
    try{
        const productos = []
        const respuestaproductos = await dataBase.collection('ng_productos').orderBy("descripcion").get()
        respuestaproductos.forEach( function(item){
            /* console.log(item.data()) */
            productos.push(item.data())
        })
        pintarproductos(productos)
    }catch(error){
        console.log(error)
    }
}
/* ------------------------------------------------------------------------------------------------------- */
//pintarproductos
function pintarProductos(productos){

    var table = document.getElementById("tabla_productos");
   
    $("#tabla_productos").empty();

    productos.forEach((t)=>{
        var oRows = document.getElementById('tabla_productos').getElementsByTagName('tr');
        var iRowCount = oRows.length;

        var row = table.insertRow(iRowCount);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        
        cell1.innerHTML = '<div class="form-check"><input class="form-check-input" type="radio" name="flexRadioDefault"id="flexRadioDefault6"/></div>';
        cell2.innerHTML = t.codigo;
        cell3.innerHTML = t.descripcion;
        cell4.innerHTML = t.peso;
        cell5.innerHTML = t.valorUnitario;
        cell6.innerHTML = t.estado;
        
})
}
/* ------------------------------------------------------------------------------------------------ */
//modificar producto
async function modificarProductofb(){

    const codigoInput = document.getElementById("MinputCodigo").value
    const descripcionInput = document.getElementById("MinputDescripcion").value;
    const pesoInput = document.getElementById("MinputPeso").value;
    const valorUInput = document.getElementById("MinputPeso").value;
    const estadoInput = document.getElementById("MinputEstado").value;

    console.log(codigoInput);
    console.log(descripcionInput);
    console.log(pesoInput);
    console.log(valorUInput);
    console.log(estadoInput);
    
    const respuestaproductos = await dataBase.collection("ng_productos").where('codigo','==',codigoInput).get();
    
    let idmod = ""
    respuestaproductos.forEach(function (item){
         idmod=item.id
    });
   /*  idmod=respuestaproductos.id() */

   console.log(idmod)

    dataBase.collection("ng_productos").doc(idmod).update({
        // codigo: codigoInput,
        descripcion: descripcionInput,
        peso: pesoInput,
        valorUnitario: valorUInput,
        estado: estadoInput,
    });
    

    
    actualizar()
    
}
/* ------------------------------------------------------------------------------------------------------------- */

//funcion del boton para que abra el modal con los datos de la fila.
function modificarProducto() {

    let cuerpoTabla = document.getElementById("cuerpoTablaProductos")
    let radios = cuerpoTabla.getElementsByTagName("input")
    let filas = cuerpoTabla.getElementsByTagName("tr")
    let totalFilas = radios.length

    for (i = 0; i < totalFilas; i++) {
        if (radios[i].checked) {

            filaSeleccionada = filas[i]
            document.getElementById("modifyCodigo").value = filaSeleccionada.cells[2].innerText
            document.getElementById("modifyDescripcion").value = filaSeleccionada.cells[3].innerText
            document.getElementById("modifyPeso").value = filaSeleccionada.cells[4].innerText
            document.getElementById("modifyValorUnitario").value = filaSeleccionada.cells[5].innerText

            if (filaSeleccionada.cells[6].innerText == "Disponible") {

                document.getElementById("modifyEstado").value = 1
            }
            else {

                document.getElementById("modifyEstado").value = 2
            }

            filaObjetivo = filaSeleccionada
        }
    }
}

