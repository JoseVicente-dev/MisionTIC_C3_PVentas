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

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)






//Declarar Variables globales
const auth = firebase.auth()
const proveedor = new firebase.auth.GoogleAuthProvider()
const dataBase = firebase.firestore()
let usuarioActual;
let usuarioFoto;
let usuarioEmail;


//variables DOM
const btnLogin = document.getElementById('boton-loginGmail')
/* console.log(btnLogin) */


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
            /* id: idasc(), */
            nombres: usuarioActual,
            apellidos: '',
            rol: '',
            estado: 'Pendiente',
            email: usuarioEmail,
            photoUrl: usuarioFoto
        } 

        // leer usuarios para comparar email
        const usuarios = []
        const respuestausuarios = await dataBase.collection('ng_users').get()
        respuestausuarios.forEach( function(item){
            /* console.log(item.data()) */
            usuarios.push(item.data())
        })

        let contador=0
        usuarios.forEach((t)=>{
            /* console.log(t.email)
            console.log(typeof usuarioEmail) */
            if(t.email==usuarioEmail){
                /* console.log(t.email,'=',usuarioEmail) */
                contador=contador+1
                if(t.estado=="Autorizado"){
                    contador=100//registrado y aprobado
                }else{
                    contador=50//registrado pendiente de aprobaciòn
                }
            }
        })
        
        /* console.log(contador) */
        if(contador==0){
            const respuestaUsuario = await guardarUsuario(usuario)
            alert(usuarioActual+": El usuario "+usuarioEmail+" fue creado exitosamente en la base de datos y esta pendiente de aprobación por parte del administrador de la plataforma.")
        }else if(contador==100){
            /* window.location.href = "menu.html"; */
            window.location.href = "roles_usuarios.html";
        }else if(contador==50){
            alert(usuarioActual+": El usuario "+usuarioEmail+" esta pendiente de aprobación por parte del administrador de la plataforma.")
        }
        
        
        
    }catch(error){
        console.log(error)
    }
}


async function leerUsuarios(){
    try{
        const usuarios = []
        const respuesta = await dataBase.collection('ng_users').get()

        respuesta.forEach( function(item){
            /* console.log(item.data()) */
            usuarios.push(item.data())
        })
            
        console.log(usuarios)
        return usuarios

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

//id ascendente para arreglar
/* async function idasc(){
    let contUser=1
    const usuarios = []
    const respuestausuarios = await dataBase.collection('ng_users').get()
    respuestausuarios.forEach( function(item){
        contUser=contUser+1
    })
    console.log(contUser)
    return contUser
} */


//evento
btnLogin.addEventListener('click', (e)=>{
    e.preventDefault()
    login()
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
