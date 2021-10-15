import '../css/login.css';
import '../css/style.css';

import logoMercurio from '../images/logo_mercurio.png'
import logoGmail from '../images/gmail.png'

import { FooterComponent } from './FooterComponent';
import { crearUsuario, logInUsuario, logOutUsuario } from '../config/firebase';

export const LoginComponent = () => {

    const handleClickLogin= async  () => {
        console.log("Pueba de boton")
        

        //Crear Usuario en la autenticacion de firebase AUTH
        //crearUsuario ('steven.tavera@gmail.com', '123456')
        
        //Realizar loginAUTH
        const usuarioActivo = await logInUsuario ('steven.tavera@gmail.com', '123456')
        console.log('Usuario Activo: ', usuarioActivo.email)
        
      }

    return (
        <>
            <div className="container abs-center" >

                <div className="row rounded justify-content-med-center paddingcentro">
                    <div className="col">
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
                            <div className="col-9">
                                <div className="mb-3">
                                <button 
                                    className="btn btn-primary btnLogin" 
                                    id="boton-loginGmail" 
                                    onClick={handleClickLogin}
                                    > Login with Gmail </button>    
                                </div>
                            </div>
                            <div className="col-3 align-items-center mt-2">
                                <img 
                                src={logoGmail} 
                                className="img-fluid" 
                                alt="Logo Mercury"
                                width="40px" height="40px" />
                            </div>

                        </div>

                    </div>

                </div>

            </div>

            {/* <FooterComponent/> */}
        </>
    )

}