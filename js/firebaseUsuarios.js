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


//Declarar Variables globales
const auth = firebase.auth()
const proveedor = new firebase.auth.GoogleAuthProvider()
const dataBase = firebase.firestore()
let usuarioActual;
let usuarioFoto;
let usuarioEmail;


//variables DOM
const btnLogin = document.getElementById('cargarDatos')
const btnPrueba = document.getElementById('prueba')
const btnAdicionarUser = document.getElementById('btnAdicionarUsuario')

let imgUsuario = document.getElementById('imagenUsuario')
let tipUsuario = document.getElementById('tipoUsuario')
let nombreUsuario = document.getElementById('nombreDeUsuario')
let tablaUsers = document.getElementById('tabla-usuarios')


//funciones
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
        
        
        
        
    }catch(error){
        console.log(error)
    }
}


//Actiualizar
async function actualizar(){
    try{
        const usuarios = []
        const respuestausuarios = await dataBase.collection('ng_users').get()


        respuestausuarios.forEach( function(item){
            /* console.log(item.data()) */
            usuarios.push(item.data())
 
        })


        pintarUsuarios(usuarios)

    }catch(error){
        console.log(error)
    }
}



async function guardarUsuario(usuario){
    try{
        const respuesta = await dataBase.collection('ng_users').add(usuario)
        return respuesta

    }catch(error){
        console.log(error)
    }
}


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

async function agregarUsuario(){
    var table = document.getElementById("tabla_usuarios");
   
    var nombresInput = document.getElementById("inputnombre").value;
    var apellidosInput = document.getElementById("inputApellido").value;
    var rolInput = document.getElementById("inputRol").value;
    var estadoInput = document.getElementById("inputEstado");
    
    const usuarios = {
        id: uuid.v4(), 
        nombres: nombresInput,
        apellidos: apellidosInput,
        rol: rolInput,
        estado: false,
        email: "",
        photoUrl: ""
    } 

    const respuestaUsuario = await guardarUsuario(usuarios)

    actualizar()

    
}


//evento
btnPrueba.addEventListener('click', (e)=>{
    e.preventDefault()
    menu()
}) 
btnLogin.addEventListener('click', (e)=>{
    e.preventDefault()
    actualizar()
}) 

btnAdicionarUser.addEventListener('click', (e)=>{
    e.preventDefault()
    agregarUsuario()
}) 



//borrar datos
/* const user = auth.currentUser;
var emailborrar = dataBase.collection('ng_users').where('email','==',user.email,'and','estado','==',true);
console.log(emailborrar);
emailborrar.get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
            doc.ref.delete();
    });
}); */



