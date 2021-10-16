import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, } from 'firebase/auth'
import {addDoc, collection, getDocs, query, getDoc, doc, updateDoc, deleteDoc, where} from 'firebase/firestore'//Métodos de interaccion BD


const firebaseConfig = {
    apiKey: "AIzaSyCuuC5xt_cyNbakN_gIAJ3ixHvkw8LUCk8",
    authDomain: "nightmare-mercurio.firebaseapp.com",
    projectId: "nightmare-mercurio",
    storageBucket: "nightmare-mercurio.appspot.com",
    messagingSenderId: "829384661085",
    appId: "1:829384661085:web:bddd58254813be754315b4",
    measurementId: "G-TQYRLQ0VWT"
  };

  initializeApp(firebaseConfig);

  const database = getFirestore();
  const auth = getAuth();

  /* const proveedor = getAuth().GoogleAuthProvider() */
  

  export let usuarioActivo


  //CRUD => Create Read Update Delete


  //Guardar Base de datos
  export const guardarDatabase = async (nombreColeccion, data) =>{
      
    try{
        const respuesta = await addDoc(collection(database,nombreColeccion), data)
        //console.log(respuesta);
        return respuesta
    }

    catch(e){
        throw new Error(e)
    }
  }


  //Leer Base de Datos
  export const consultarDatabase = async(nombreColeccion) =>{
    try{
        const respuesta = await getDocs(query(collection(database, nombreColeccion)))
        //console.log(respuesta)

        const coleccionDatos = respuesta.docs.map((documento)=>{
            //console.log(documento.data());
            const documentoTemporal = {
                idDocumento: documento.id,//id para actualizar
                ...documento.data()
            }
            //console.log(documentoTemporal);
            return documentoTemporal
        })
        return coleccionDatos
    }
    catch(e){
        throw new Error(e)
    }
  }


  //consultar un solo documento
  export const consultarDocumentoDatabase = async(nombreColeccion, idDocumento) =>{
    try{
        const respuesta = await getDoc(doc(database, nombreColeccion, idDocumento))
        //console.log(respuesta)

        const documentoTemporal = {
            idDocumento: respuesta.id,//id para actualizar
            ...respuesta.data()
        }
        /* console.log(documentoTemporal); */
        return documentoTemporal
    }
    catch(e){
        throw new Error(e)
    }
  }



  //consultar por where
  export const consultarDocumentoWhere = async(nombreColeccion, terminoBusqueda, busqueda) =>{
    try{

        const respuesta = await getDocs(query(collection(database, nombreColeccion), where(terminoBusqueda, '>=', busqueda), where(terminoBusqueda, '<=', busqueda+ '\uf8ff')))

        const coleccionDatos = respuesta.docs.map((documento)=>{
            //console.log(documento.data());
            const documentoTemporal = {
                idDocumento: documento.id,//id para actualizar
                ...documento.data()
            }
            console.log(documentoTemporal);
            return documentoTemporal
        })
        return coleccionDatos     
    }
    catch(e){
        throw new Error(e)
    }
  }



  //Actualizaciòn de un documento en Base de datos
  export const actualizarDocumentoDatabase = async(nombreColeccion, idDocumento, data) =>{
    try{
        const respuesta = await updateDoc(doc(database, nombreColeccion, idDocumento), data)
        /* console.log(respuesta);//todo esta bien undefine */
    }
    catch(e){
        throw new Error(e)
    }
  }


   //Eliminar de un documento en Base de datos
   export const eliminarDocumentoDatabase = async(nombreColeccion, idDocumento) =>{
    try{
        const respuesta = await deleteDoc(doc(database, nombreColeccion, idDocumento))
        /* console.log(respuesta);//todo esta bien undefine */
    }
    catch(e){
        throw new Error(e)
    }
  }




  //Crear Usuarios con FireBase
  export const crearUsuario = async(email, password) =>{
    try{
        const credencialesUsuario = await createUserWithEmailAndPassword(auth, email, password)
        
        /* console.log(credencialesUsuario)
        console.log(credencialesUsuario.user)
        console.log(credencialesUsuario.user.uid) */

        const user = {
            id: credencialesUsuario.user.uid,
            email: credencialesUsuario.user.email,
        }

        guardarDatabase('prueba_react', user)//Para llevar el usuario a la base de datos

        return user
    }
    catch(e){
        throw new Error(e)
    }
  }


    //Login de Usuarios con FireBase auth
    export const logInUsuario = async(email, password) =>{
        try{
            const credencialesUsuario = await signInWithEmailAndPassword(auth, email, password)

            /* console.log(credencialesUsuario)
            console.log(credencialesUsuario.user)
            console.log(credencialesUsuario.user.uid) */

            const user = {
                id: credencialesUsuario.user.uid,
                email: credencialesUsuario.user.email,
            }

            usuarioActivo = user

            /* console.log('Usuario Login exitoso'); */
            
            return credencialesUsuario.user
        }
        catch(e){
            throw new Error(e)
        }
      }


    //Login Pop UP google
    /* export const logInUsuarioPopup = async() =>{
        try{
            const respuesta = await firebase.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
        }
        catch(e){
            throw new Error(e)
        }
      } */


    //LogOut de Usuarios con FireBase auth
    export const logOutUsuario = async() =>{
        try{
            const respuesta = await signOut(auth)
            /* console.log('Usuario LogOut exitoso'); */
            /* console.log(respuesta); */
        }
        catch(e){
            throw new Error(e)
        }
      }



    //Datos Usuario actual auth
    export const datosUsuario = async() =>{
        try{
            const user = auth.currentUser
            /* console.log(user) */

            //validacion de usuario, recordar undefined is falsy
            if(user){
                console.log('activo: ', user)
                return user
            }else{
                console.log('no activo: ', user);
                return undefined
            }
        }
        catch(e){
            throw new Error(e)
        }
      }

      //siempre estar buscando auth
      //Usuario Activo?
      onAuthStateChanged(auth,(user)=>{
        if (user){
            /* console.log(user.email); */
            usuarioActivo = user.displayName
        }else{
            /* console.log(user); */
            usuarioActivo = undefined
        }
      })