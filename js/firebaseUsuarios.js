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
/* firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
 */
//Declarar Variables globales
const auth = firebase.auth()
const proveedor = new firebase.auth.GoogleAuthProvider()
const dataBase = firebase.firestore()
let usuarioActual;
let usuarioFoto;
let usuarioEmail;

//variables DOM

/* const btnPrueba = document.getElementById('prueba') */
const btnActualizar = document.getElementById('cargarDatos')
const btnAdicionarUser = document.getElementById('btnAdicionarUsuario')
const btnModificarUser = document.getElementById('btnModificarUsuario')
const btnModalModificar = document.getElementById('modalModificar')
const btnEliminarUser = document.getElementById('btnEliminarUsuarios')
const btnBuscarUser = document.getElementById('buscarUsuario')


let imgUsuario = document.getElementById('imagenUsuario')
let tipUsuario = document.getElementById('tipoUsuario')
let nombreUsuario = document.getElementById('nombreDeUsuario')
let tablaUsers = document.getElementById('tabla-usuarios')


actualizar()
setTimeout( menu,1000);





//funciones


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
            btnAdicionarUser.disabled = true
            document.getElementById('modaladicionar').disabled = true
            document.getElementById('modalModificar').disabled = true
            document.getElementById('modalEliminar').disabled = true
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

//Actiualizar Usuarios en la tabla
async function actualizar(){
    try{
        const usuarios = []
        const respuestausuarios = await dataBase.collection('ng_users').orderBy("email").get()


        respuestausuarios.forEach( function(item){
            /* console.log(item.data()) */
            usuarios.push(item.data())
 
        })


        pintarUsuarios(usuarios)

    }catch(error){
        console.log(error)
    }
}


//guardar usuarios
async function guardarUsuario(usuario){
    try{
        const respuesta = await dataBase.collection('ng_users').add(usuario)
        return respuesta

    }catch(error){
        console.log(error)
    }
}

//pintarusuarios
function pintarUsuarios(usuarios){

    var table = document.getElementById("tabla_usuarios");
   
    $("#tabla_usuarios").empty();

    usuarios.forEach((t)=>{
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
        cell2.innerHTML = t.id;
        cell3.innerHTML = t.nombres;
        cell4.innerHTML = t.email ;
        cell5.innerHTML = t.rol;
        cell6.innerHTML = t.estado;

})
}


//Agregar Usuario
async function agregarUsuario(){
    const nombresInput = document.getElementById("inputnombre").value;
    /* const apellidosInput = document.getElementById("inputApellido").value; */
    const emailInput = document.getElementById("inputEmail").value;
    const rolInput = document.getElementById("inputRol").value;
    const estadoInput = document.getElementById("inputEstado").value;

    const usuarios = {
        id: uuid.v4(), 
        nombres: nombresInput,
        /* apellidos: apellidosInput, */
        rol: rolInput,
        estado: estadoInput,
        email: emailInput,
        photoUrl: ""
    } 


    const usuariosBD = [];
    const respuestausuarios = await dataBase.collection("ng_users").get();
    
    respuestausuarios.forEach(function (item) {
      usuariosBD.push(item.data());
    });

    let k = 0;
    usuariosBD.forEach((t) => {
        
      if (t.email == emailInput) {
        k=1
      }else if(emailInput==""||nombresInput==""||rolInput==""){
        k=2
      }
    });

    /* console.log(contador) */
    if (k == 0) {
      guardarUsuario(usuarios);
      actualizar();
      limpiarModalAdicionar();
      alert("El usuario fue creado exitosamente");
    } else if(k == 2){
        alert("hay campos vacíos por favor ingrese toda la información")
    }else{
      alert("Ya existe un usuario con el email que está intentanto usar.");
    }
    

    
}

//modificar usuario
async function modificarUsuariofb(){

    /* const mnombresInput = document.getElementById("Minputnombre").value */
    /* const apellidosInput = document.getElementById("MinputApellido").value */
    const memailInput = document.getElementById("MinputEmail").value;
    const mrolInput = document.getElementById("MinputRol").value;
    const mestadoInput = document.getElementById("MinputEstado").value;
    
    const respuestausuarios = await dataBase.collection("ng_users").where('email','==',memailInput).get();
    
    let idmod = ""
    respuestausuarios.forEach(function (item){
         idmod=item.id
    });
   /*  idmod=respuestausuarios.id() */

   /* console.log(idmod) */

    dataBase.collection("ng_users").doc(idmod).update({
        /* nombres: mnombresInput, */
        rol: mrolInput,
        estado: mestadoInput,
        /* email: memailInput, */
    });
    
    setTimeout( actualizar,1000);
    
}

//funcion del boton para que abra el modal con los datos de la fila.
function modificarUsuario() {

    let tablaUsuarios = document.getElementById("tabla_usuarios");
    let radios = tablaUsuarios.getElementsByTagName("input");
    let filas = tablaUsuarios.getElementsByTagName("tr");
    let totalFilas = radios.length;


    for (i = 0; i < totalFilas; i++) {
        if (radios[i].checked) {

            filaSeleccionada = filas[i]
            document.getElementById("MinputCodigo").value = filaSeleccionada.cells[1].innerText
            document.getElementById("Minputnombre").value = filaSeleccionada.cells[2].innerText
            /* document.getElementById("MinputApellido").value = filaSeleccionada.cells[3].innerText */
            document.getElementById("MinputEmail").value = filaSeleccionada.cells[3].innerText
            document.getElementById("MinputRol").value = filaSeleccionada.cells[4].innerText
            document.getElementById("MinputEstado").value = filaSeleccionada.cells[5].innerText

            if (filaSeleccionada.cells[5].innerText == "Pendiente") {

                document.getElementById("MinputEstado").value ="Pendiente";
            }
            else if (filaSeleccionada.cells[5].innerText == "Autorizado") {

                document.getElementById("MinputEstado").value = "Autorizado";
            }

            else {

                document.getElementById("MinputEstado").value = "No autorizado";
            } 

            filaObjetivo = filaSeleccionada
        }
    }
}


function limpiarModalAdicionar(){
    /* document.getElementById("inputCodigo").value =""; */
    document.getElementById("inputnombre").value="";
    /* document.getElementById("inputApellido").value=""; */
    document.getElementById("inputEstado").value="Pendiente";
    document.getElementById("inputEmail").value="";
    document.getElementById("inputRol").value="";
}

function eliminarUsuario(){

    let tablaUsuarios = document.getElementById("tabla_usuarios");
    let radios = tablaUsuarios.getElementsByTagName("input");
    let filas = tablaUsuarios.getElementsByTagName("tr");
    let totalFilas = radios.length;
    let email =""

    for (i = 0; i < totalFilas; i++) {
        if (radios[i].checked) {
            filaSeleccionada = filas[i]
            email = filaSeleccionada.cells[3].innerText
            console.log(email);
            console.log(filaSeleccionada);
            
        }
    }
    /* console.log(email); */

    //borrar datos
    var userborrar = dataBase.collection('ng_users').where('email','==',email);
    /* console.log(userborrar); */
    
    userborrar.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
                doc.ref.delete();
        });
    });

   

}

async function buscarUsusario() {
   
    try{
        let busqueda = document.getElementById("busqueda").value;
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
        
        respuestausuarios = await dataBase.collection("ng_users").where(terminoBusqueda, '>=', busqueda).where(terminoBusqueda, '<=', busqueda+ '\uf8ff').get()

        const usuarios = []
        respuestausuarios.forEach( function(item){
            /* console.log(item.data()) */
            usuarios.push(item.data())
 
        })
         /* console.log(usuarios); */

         setTimeout( pintarUsuarios(usuarios),1000)
         
        

    }catch(error){
        console.log(error)
    }


}

//evento
/* btnPrueba.addEventListener('click', (e)=>{
    e.preventDefault()
    menu()
})  */
btnActualizar.addEventListener('click', (e)=>{
    e.preventDefault()
    actualizar()
}) 

btnAdicionarUser.addEventListener('click', (e)=>{
    e.preventDefault()
    agregarUsuario()
}) 

btnModificarUser.addEventListener('click', (e)=>{
    e.preventDefault()
    modificarUsuariofb()
}) 

btnModalModificar.addEventListener('click', (e)=>{
    e.preventDefault()
    modificarUsuario()
}) 

btnEliminarUser.addEventListener('click', (e)=>{
    e.preventDefault()
    eliminarUsuario()
    setTimeout( actualizar,1000);
   
}) 

btnBuscarUser.addEventListener('click', (e)=>{
    e.preventDefault()
    buscarUsusario() 
}) 




/* document.getElementById('inputEmail').addEventListener('input', function() {
    campo = event.target;
    valido = document.getElementById('input');
        
    emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    //Se muestra un texto a modo de ejemplo, luego va a ser un icono
    if (emailRegex.test(campo.value)) {
    valido.style.backgroundColor = "red"
    } else {
        valido.style.backgroundColor = "green"
    }
}); */





