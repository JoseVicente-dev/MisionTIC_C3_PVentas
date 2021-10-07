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
const btnLogin = document.getElementById('boton-loginGmail')


//funciones
//login
async function login(){
    try{
        const respuesta = await auth.signInWithPopup(proveedor)
        /* console.log(respuesta) */
        
        usuarioActual = respuesta.user.displayName
        usuarioFoto  = respuesta.user.photoURL
        usuarioEmail = respuesta.user.email

        /* console.log(usuarioActual, usuarioFoto, usuarioEmail) */

        //usuario a guardar
        const usuario = {
            id: uuid.v4(), 
            nombres: usuarioActual,
            apellidos: '',
            rol: '',
            estado: false,
            email:usuarioEmail,
            photoUrl:usuarioFoto
        } 

        
        /* const respuesta = await guardarUsuario(usuario) */
        const respuestaUsuario = await guardarUsuario(usuario)
        console.log(respuestaUsuario)
        
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



//evento
btnLogin.addEventListener('click', (e)=>{
    e.preventDefault()
    login()
    /* adicionarUsuario()*/
}) 

