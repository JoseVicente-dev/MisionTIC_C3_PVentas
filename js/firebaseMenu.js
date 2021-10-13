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
let usuarioEmail;

menu()


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
            /* document.getElementById('btnproducts').disabled = true */
            document.getElementById('btnusers').disabled = true
        }
      });
}

//login
async function menu(){
    try{
        const respuesta = await auth.signInWithPopup(proveedor)
        usuarioActual = respuesta.user.displayName 
        usuarioEmail = respuesta.user.email

        setTimeout( compararRolUsuario, 1000)
        
        
    }catch(error){
        console.log(error)
    }

}
