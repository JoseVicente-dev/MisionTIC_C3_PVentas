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
const btnBuscarProducto = document.getElementById('buscarProducto')
const toastIngresoProducto = document.getElementById('liveToastIProduct')
const toastIngresoProductoNeg = document.getElementById('liveToastIProductNeg')
const toastCamposVacios = document.getElementById('toastCamposVacios')
const btnModalModificar = document.getElementById('btnModificarPrincial')
const btnModificarProducto = document.getElementById('btnModificarModalModificar')
let imgUsuario = document.getElementById('imagenUsuario')
let nombreUsuario = document.getElementById('nombreDeUsuario')
const btnEliminarProducto = document.getElementById('btnEliminarModalEliminar')


const auth = firebase.auth()
const proveedor = new firebase.auth.GoogleAuthProvider()
let usuarioActual;
let usuarioFoto;
let usuarioEmail;

setTimeout(menu,1000)


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
    radio.setAttribute("onClick","MostrarBotonesProductos()")

    radio.checked = false
    div.appendChild(radio)
    seleccionar.appendChild(div)

    filaTabla.appendChild(seleccionar)

    // numeroProducto = document.createElement("th")
    // numeroProducto.setAttribute("scope", "row")
    // numeroProducto.textContent = i

    codigo = document.createElement("td")
    codigo.textContent = p.codigo

    descripcion = document.createElement("td")
    descripcion.textContent = p.descripcion

    valorUnitario = document.createElement("td")
    valorUnitario.textContent = p.valorUnitario

    peso = document.createElement("td")
    peso.textContent = p.peso

    estado = document.createElement("td")
    p.estado === '1' ? estado.textContent = "Disponible" : estado.textContent = "No disponible";
    // filaTabla.appendChild(numeroProducto)
    filaTabla.appendChild(codigo)
    filaTabla.appendChild(descripcion)
    filaTabla.appendChild(peso)
    filaTabla.appendChild(valorUnitario)
    filaTabla.appendChild(estado)

    insertarFila.appendChild(filaTabla)



  })

}


// ------------------------------------------ Adicionar Productos--------------------------------
//Llamado de variables


const botonAgregar = document.getElementById("btnAdicionarModalAdicionar");
const botonCancelar = document.getElementById("btnCancelarModal");


function showToast(id){
  $(id).toast('show');
}
async function obtenerDatos() {

  try {
    // const inputCode = document.getElementById('inputCodigo').value;
    const inputDescription = document.getElementById("inputDescripcion").value.replace(/^\w/, (c) => c.toUpperCase());
    const inputWeigth = document.getElementById("inputPeso").value;
    const inputValue = document.getElementById("inputValorUnitario").value;
    const inputState = document.getElementById("inputEstado").value;



    const productosArray = [];
    const nuevoxd = await dataBase.collection('ng_productos').get()
    nuevoxd.forEach((t) => {
      productosArray.push(t.data())
    })

    const producto = {
      codigo: uuid.v4(),
      descripcion: inputDescription.replace(/^\w/, (c) => c.toUpperCase()),
      peso: inputWeigth,
      valorUnitario: inputValue,
      estado: inputState
    }
    //producto.descripcion == "" || producto.peso == "" || producto.valorUnitario == "" ? alert("No se pueden dejar campos vac??os") : console.log("Holi 2");//anadirProducto(producto);
    if (producto.descripcion != "" || producto.peso != "" || producto.valorUnitario != "") {
      if (productosArray.length != 0 && productosArray.find(busquedaArray => busquedaArray.descripcion == inputDescription)) {
        console.log('Holi 5');
        console.log(productosArray);
        console.log('Ya est?? en la lista');
      } else {
        console.log('Entrando no s{e a d{onde');
        console.log(typeof producto.estado);
        anadirProducto(producto)
        actualizar();
        showToast('#liveToastIProduct');
        


      }
    }else{
      console.log('Los datos est??n vac??os');
      showToast('#toastCamposVacios')

    }

    /* productosArray.forEach((item)=>{
        if(item.descripcion!=producto.descripcion){
        
          anadirProducto(producto);
          actualizar()
          
          
        }else{
          alert("No pueden haber varios productos iguales.")
          console.log(!item.descripcion===inputDescription);
          console.log(item.descripcion);
        }
    }) */




    /* console.log(producto.descripcion); */
    let contador = 0;





  } catch (error) {
    console.log(error);
  }
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
  obtenerDatos();
  actualizar()
  limpiarModalAdicionar();


})
botonCancelar.addEventListener('click', (e) => {
  e.preventDefault();
  limpiarModalAdicionar();
})








mostrarInformacion()
/* ---------------------------------------------------------------------------------------------- */
//Actiualizar Productos en la tabla
async function actualizar() {
  try {
    const productos = []
    const respuestaproductos = await dataBase.collection('ng_productos').orderBy("descripcion").get()
    respuestaproductos.forEach(function (item) {
      productos.push(item.data())
    })
    pintarProductos(productos)
  } catch (error) {
    console.log(error)
  }

  

}
/* ------------------------------------------------------------------------------------------------------- */
// pintarproductos
function pintarProductos(productos) {
  
  var table = document.getElementById("cuerpoTablaProductos");
  /* console.log(table); */

  $("#cuerpoTablaProductos").empty();

  

  productos.forEach((t) => {
    
    var oRows = document.getElementById('cuerpoTablaProductos').getElementsByTagName('tr');
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
    cell6.innerHTML = t.estado === '1' ?  "Disponible" : "No disponible";

    // filaObjetivo.cells[0].getElementsByTagName("input")[0].checked = true
    // console.log(filaObjetivo)
    // console.log(getElementsByTagName("input"))

  })

  

}
// ---------------------------------------------------------------------------
async function buscarProductos() {

  try {
    let busqueda = document.getElementById("busqueda").value.replace(/^\w/, (c) => c.toUpperCase());
    console.log(busqueda)
    let terminoBusqueda = document.getElementById("busquedapor").value;
    /* let condicionbusqueda = document.getElementById("condicion").value; */
    /* "1"Igual
    "2"Comienza por
    "3"Termina por */


    /* console.log(busqueda); */
    /* let respuestausuarios
    if(condicionbusqueda==1){
        respuestausuarios = await dataBase.collection("ng_users").where(terminoBusqueda, '==', busqueda).get()
    }else if(condicionbusqueda==2){
        respuestausuarios = await dataBase.collection("ng_users").where(terminoBusqueda, '>=', busqueda).where(terminoBusqueda, '<=', busqueda+ '\uf8ff').get()
    }else{
        respuestausuarios = await dataBase.collection("ng_users").orderBy(terminoBusqueda).startAt('~' + busqueda).endAt(busqueda).get();
    } */

    respuestaproducto = await dataBase.collection("ng_productos").where(terminoBusqueda, '>=', busqueda).where(terminoBusqueda, '<=', busqueda + '\uf8ff').get()

    const producto = []
    respuestaproducto.forEach(function (item) {
      console.log(item.data())
      producto.push(item.data())

    })
    /* console.log(usuarios); */

    setTimeout(pintarProductos(producto), 1000)



  } catch (error) {
    console.log(error)
  }

  
}

//----------------------------- Eliminar producto---------------------

// --------------------------------------------------------------------------------
btnBuscarProducto.addEventListener('click', (e) => {
  e.preventDefault()
  buscarProductos()
})


// /* ------------------------------------------------------------------------------------------------ */

let filaSeleccionada=0;

//funcion del boton para que abra el modal con los datos de la fila.
function modificarProducto() {

  let tablaProductos = document.getElementById("cuerpoTablaProductos");
  let radios = tablaProductos.getElementsByTagName("input");
  let filas = tablaProductos.getElementsByTagName("tr");
  let totalFilas = radios.length;
  console.log(radios)

  for (i = 0; i < totalFilas; i++) {
    if (radios[i].checked) {
      console.log(radios[i])
      filaSeleccionada = filas[i]
      document.getElementById("modifyCodigo").value = filaSeleccionada.cells[1].innerText
      document.getElementById("modifyDescripcion").value = filaSeleccionada.cells[2].innerText
      document.getElementById("modifyPeso").value = filaSeleccionada.cells[3].innerText
      document.getElementById("modifyValorUnitario").value = filaSeleccionada.cells[4].innerText
      document.getElementById("modifyEstado").value = filaSeleccionada.cells[5].innerText

      if (filaSeleccionada.cells[5].innerText == "Disponible") {

        document.getElementById("modifyEstado").value = "2";
      }


      document.getElementById("modifyEstado").value = "1";
    }

    filaObjetivo = filaSeleccionada
  }
}



//modificar producto
async function modificarProductofb() {



  const mCodigoInput = document.getElementById("modifyCodigo").value
  const mDescripcionInput = document.getElementById("modifyDescripcion").value.replace(/^\w/, (c) => c.toUpperCase());
  const mPesoInput = document.getElementById("modifyPeso").value;
  const mValorUnitarioInput = document.getElementById("modifyValorUnitario").value;

  const mestadoInput = document.getElementById("modifyEstado").value;
  
  const respuestaprodctos = await dataBase.collection("ng_productos").where('codigo','==',mCodigoInput).get();
  console.log(respuestaprodctos)
  let idmod = ""
  respuestaprodctos.forEach(function (item) {
    idmod = item.id
  });
  /*  idmod=respuestausuarios.id() */

  console.log(idmod)
  dataBase.collection("ng_productos").doc(idmod).update({
    descripcion: mDescripcionInput,
    peso: mPesoInput,
    valorUnitario: mValorUnitarioInput,
    estado: mestadoInput,
  });

  

  const productosArray = [];
  const nuevoxd = await dataBase.collection('ng_productos').get()
  nuevoxd.forEach((t) => {
    productosArray.push(t.data())
  })

  
    
  

  setTimeout(actualizar, 1000);

}




function limpiarModalAdicionar() {
  // document.getElementById("inputCodigo").value = "";
  document.getElementById("inputDescripcion").value = "";
  document.getElementById("inputPeso").value = "";
  document.getElementById("inputValorUnitario").value = "";
}
function limpiarModalModificar() {
  document.getElementById("modifyCodigo").value = "";
  document.getElementById("modifyDescripcion").value = "";
  document.getElementById("modifyPeso").value = "";
  document.getElementById("modifyValorUnitario").value = "";
}

function eliminarProducto() {

  let tablaProductos = document.getElementById("cuerpoTablaProductos");
  let radios = tablaProductos.getElementsByTagName("input");
  let filas = tablaProductos.getElementsByTagName("tr");
  let totalFilas = radios.length;
  let codigo = ""

  for (i = 0; i < totalFilas; i++) {
    if (radios[i].checked) {
      filaSeleccionada = filas[i]
      codigo = filaSeleccionada.cells[1].innerText

    }
  }
  console.log(codigo);

  //borrar datos
  var userborrar = dataBase.collection('ng_productos').where('codigo', '==', codigo);
  console.log(userborrar);

  userborrar.get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      doc.ref.delete();
    });
  });



}
// ---------------------------------------------------------------

//comparar sesion actual con tipo de usuario
async function compararRolUsuario(){
 
  const respuestausuarios = await dataBase.collection("ng_users").where('email','==',usuarioEmail).get();
  console.log(usuarioEmail);

  /* let rolmod = "" */
  const usuariosBD = [];
  respuestausuarios.forEach(function (item){
      usuariosBD.push(item.data());
  });

  usuariosBD.forEach((t) => {
      if (t.rol == "Vendedor") {
        console.log('soy de verdad!')
          // btnAdicionarUser.disabled = true
          document.getElementById('btnAdicionarPrincipal').disabled = true
          document.getElementById('btnModificarPrincial').disabled = true
          document.getElementById('btnEliminarPrincipal').disabled = true
          // document.getElementById('modalEliminar').disabled = true
      }
    });
}
//login
async function menu(){
  try{
      const respuesta = await auth.signInWithPopup(proveedor)
      /* console.log(respuesta) */
      usuarioActual = respuesta.user.displayName
      usuarioFoto  = respuesta.user.photoURL
      usuarioEmail = respuesta.user.email

      imgUsuario.setAttribute("src",usuarioFoto)
      nombreUsuario.textContent = usuarioActual  

      //esto en react no va tocar hacerlo
      // leer usuarios para comparar email
      const usuarios = []
      const respuestausuarios = await dataBase.collection('ng_users').get()

      

      respuestausuarios.forEach( function(item){
          /* console.log(item.data()) */
          usuarios.push(item.data())
      })

      /* pintarUsuarios(usuarios) */

      usuarios.forEach((t)=>{
          if(t.email==usuarioEmail){
              if(t.estado==true){
                  tipUsuario.textContent = t.rol
              }
          }
      })
      
setTimeout( compararRolUsuario, 1000)
      
      
      
  }catch(error){
      console.log(error)
  }

}
// ---------------------------------------------------------------------------------
// async function ocultarBotonesProductos(){
//   const BotonesAdminVentasModificar = document.getElementById("btnModificarPrincial");
//   const BotonesAdminVentasEliminar = document.getElementById("btnEliminarPrincipal");

//   BotonesAdminVentasModificar.reset();  
//   BotonesAdminVentasEliminar.reset();  
// }


btnModalModificar.addEventListener('click', (e) => {
  e.preventDefault()
  modificarProducto()
  
}) 

btnModificarProducto.addEventListener('click', (e)=>{
  e.preventDefault()
  modificarProductofb()
  // ocultarBotonesProductos()
  showToast('#toastModificacion')
  limpiarModalModificar()
}) 

btnEliminarProducto.addEventListener('click', (e)=>{
  e.preventDefault()
  eliminarProducto()
  setTimeout(actualizar,1000) 
}) 

function MostrarBotonesProductos() {
  const BotonesAdminVentasModificar = document.getElementById("btnModificarPrincial");
  const BotonesAdminVentasEliminar = document.getElementById("btnEliminarPrincipal");

  BotonesAdminVentasModificar.style.display = "inline-block";  
  BotonesAdminVentasEliminar.style.display = "inline-block";  


}