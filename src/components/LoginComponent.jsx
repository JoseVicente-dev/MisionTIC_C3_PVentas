import '../css/login.css';
import '../css/style.css';

import {useHistory } from 'react-router'

import logoMercurio from '../images/logo_mercurio.png'
import logoGmail from '../images/gmail.png'
import { consultarDocumentoWhere, logInUsuarioPopup, logOutUsuario} from '../config/firebase';



export const LoginComponent = () => {

    const history = useHistory()

    const handleClickLogin= async  () => {
        /* console.log("Pueba de boton") */
        
        //Realizar loginPopUPAUTH
        const usuario= await logInUsuarioPopup()

        if(usuario != ''){
            //validar si el usuario existe en la bd
            const respuesta = await consultarDocumentoWhere('ng_users', 'email', usuario)
            let userRol = '', userEmail = '', userEstado
            
            respuesta.forEach((user)=>{
                userEmail = user.email
                userRol= user.rol
                userEstado = user.estado
            })
            //console.log(userEmail, userRol);
            if(userEmail==usuario && userEstado=="Autorizado"){
                history.push({ pathname: '/dashboard'})
            }else{
                logOutUsuario()
                alert("Ud. no está creado en la base de datos, o no está autorizado, por favor solicite la revisión de su perfil")
            }
        }else{
            console.log('no logueado')
        }

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

        </>
    )

}