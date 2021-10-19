import './App.css';
import './css/login.css';
import './css/style.css';

import logoMercurio from './images/logo_mercurio.png'

import { consultarDatabase, guardarDatabase, consultarDocumentoDatabase, actualizarDocumentoDatabase, eliminarDocumentoDatabase, crearUsuario, logInUsuario, logOutUsuario, usuarioActivo, datosUsuario } from './config/firebase';


function App() {

  const handleClick= async  () => {
    /* console.log("probando") */

    //guardar en base de datos
    /* const usuario={
      nombre : 'Steven',
      apellido: 'Tavera'
    }
    guardarDatabase('prueba_react', usuario) */

    //obtener todos los documentos de una coleccion
    /* console.log(await consultarDatabase('ng_users')) */

    //obtener solo los campos de un documento con un idDocumento especifico
    /* consultarDocumentoDatabase('ng_users', "OvldPW1VUwJd9nyKltTe") */

    //Actualizacion Documento por idDocumento
    /* const usuario={
      apellidos: 'Tavera Jaramillo'
    }
    actualizarDocumentoDatabase('ng_users', "OvldPW1VUwJd9nyKltTe", usuario)//modifica
    consultarDocumentoDatabase('ng_users', "OvldPW1VUwJd9nyKltTe")//Visualiza */

    //Eliminar documento
    //console.log(await consultarDatabase('prueba_react'))
    /* eliminarDocumentoDatabase('prueba_react',"VNaulorBGQzqPO3VfqQu") */

    //Crear Usuario en la autenticacion de firebase AUTH
    /* crearUsuario ('steven.tavera@gmail.com', '123456') */

    //Realizar loginAUTH
    /* await logInUsuario ('steven.tavera@gmail.com', '123456') */
    //console.log('Usuario Activo: ', usuarioActivo)

    //Realizar LogOut AUTH
    logOutUsuario()

    //obtener usuario activo si no se tiene el listener
    /* datosUsuario() */

  }

  /* const logo = require('./images/logo_mercurio.png') */

  return (
    <div className="App container mt-5">

      <div className="container">

        <div className="row justify-content-med-center abs-center">
            <div className="col-auto">
                <div className="row text-align-center align-items-center">
                    <div className="col-4">
                        <img 
                          src={logoMercurio}
                          className="img-fluid" 
                          alt="Logo Mercury" 
                          width="80px"/>
                    </div>
                    <div className="col-8">
                        <h1>Mercurio</h1>
                    </div>
                </div>

                <div className="row text-center">
                    <h6>Sistema de gestión de ventas</h6>
                </div>

                <br />

                <div className="row">
          
                        <div className="mb-3">
                          <button 
                            className="btn btn-primary" 
                            id="boton-loginGmail" 
                            onClick={handleClick}
                            > Login with Gmail </button>    
                        </div>
                </div>

            </div>

          </div>
        </div>
        

    </div>
  );
}

export default App;
