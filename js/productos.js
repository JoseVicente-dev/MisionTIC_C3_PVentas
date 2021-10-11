const firebaseConfig = {
  apiKey: "AIzaSyCuuC5xt_cyNbakN_gIAJ3ixHvkw8LUCk8",
  authDomain: "nightmare-mercurio.firebaseapp.com",
  projectId: "nightmare-mercurio",
  storageBucket: "nightmare-mercurio.appspot.com",
  messagingSenderId: "829384661085",
  appId: "1:829384661085:web:bddd58254813be754315b4",
  measurementId: "G-TQYRLQ0VWT"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

//Declarar Variables globales  
const dataBase = firebase.firestore();

async function mostrarInformacion() {
  // Se inicia el llamado de los productos desde la BD
  const productos = []

  console.log("Inicia mostrar info")
  const respuestaProductos = await dataBase.collection('ng_productos').orderBy("descripcion").get()
  // const respuestaProductos = await dataBase.collection('ng_productos').get()

  respuestaProductos.forEach(function (item) {

    productos.push(item.data())
  })

  //Finaliza llamado productos


  let insertarFila = document.getElementById("cuerpoTablaProductos")
  let i = 0
  productos.forEach((p) => {
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
    radio.checked = false
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
mostrarInformacion()

// ------------------------------------------ Adicionar Productos--------------------------------
//Llamado de variables
const botonAgregar = document.getElementById("btnAdicionarModalAdicionar");

function obtenerDatos() {
  const inputCode = document.getElementById('inputCodigo').value;
  const inputDescription = document.getElementById("inputDescripcion").value;
  const inputWeigth = document.getElementById("inputPeso").value;
  const inputValue = document.getElementById("inputValorUnitario").value;
  const inputState = document.getElementById("inputEstado").value;

  const producto = {
    codigo: inputCode,
    descripcion: inputDescription,
    peso: inputWeigth,
    valorUnitario: inputValue,
    estado: inputState
  }
  anadirProducto(producto);
  /* console.log(producto); */


  let contador = 0;
}


async function anadirProducto(product) {
  try {
    const respuesta = await dataBase.collection('ng_productos').add(product)
    return respuesta
  } catch (error) {
    console.log(error);
  }
}



botonAgregar.addEventListener('click', (e) => {

  anadirProducto();
  obtenerDatos();
  actualizar()
  // mostrarInformacion()

})


/* ---------------------------------------------------------------------------------------------- */
//Actiualizar Productos en la tabla
async function actualizar() {
  try {
    const productos = []
    const respuestaproductos = await dataBase.collection('ng_productos').orderBy("descripcion").get()
    respuestaproductos.forEach(function (item) {
      productos.push(item.data())
    })
    
  } catch (error) {
    console.log(error)
  }
  $("#cuerpoTablaProductos").empty();
  mostrarInformacion()
}
/* ------------------------------------------------------------------------------------------------------- */
//pintarproductos
// function pintarProductos(productos) {

//   var table = document.getElementById("cuerpoTablaProductos");
//   console.log(table);
  
//   $("#cuerpoTablaProductos").empty();


//   productos.forEach((t) => {
//     var oRows = document.getElementById('cuerpoTablaProductos').getElementsByTagName('tr');
//     var iRowCount = oRows.length;

//     var row = table.insertRow(iRowCount);
//     var cell1 = row.insertCell(0);
//     var cell2 = row.insertCell(1);
//     var cell3 = row.insertCell(2);
//     var cell4 = row.insertCell(3);
//     var cell5 = row.insertCell(4);
//     var cell6 = row.insertCell(5);

//     /* console.log(cell1); */

//     cell1.innerHTML = '<div class="form-check"><input class="form-check-input" type="radio" name="flexRadioDefault"id="flexRadioDefault6"/></div>';
//     cell2.innerHTML = t.codigo;
//     cell3.innerHTML = t.descripcion;
//     cell4.innerHTML = t.peso;
//     cell5.innerHTML = t.valorUnitario;
//     cell6.innerHTML = t.estado;

//   })

// }



