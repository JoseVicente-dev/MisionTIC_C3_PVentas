import React from 'react'
import '../css/menu.css';

import logoMercurio from '../images/logo_mercurio.png'
import fotoUsuario from '../images/user2.png'
import logoNg from '../images/logo2.png'
import { datosUsuario } from '../config/firebase';
import { usuarioActivo } from './../config/firebase';

export const MenuLateralNg = () => {

    

        /* datosUsuario() */
        let nombreUsuario = usuarioActivo

   

    return (
        <>
            {/* <!-- menu-lateral Menú lateral--> */}
            <div className="page-wrapper mercurio-theme toggled">
                <a id="show-menu-lateral" className="btn btn-sm btn-dark " href="#">
                    <i className="fas fa-bars font-size-30px margin-left-5px"> &nbsp;
                        <img src="images/logo_mercurio.png" alt="" className="width-30px position-absolute"/>
                    </i>
                </a>
                <nav id="menu-lateral" className="menu-lateral-wrapper">
                    <div className="menu-lateral-contenido">
                        {/* <!-- encabezado menu --> */}
                        <div className="menu-lateral-brand background-color-azul">
                            <img src={logoMercurio} alt="" className="width-30"/>
                            &nbsp;
                            <a href="menu.html" className="color-blanco-humo">Mercurio </a>
                            <div id="close-menu-lateral">
                                <i className="fas fa-times color-blanco"></i>
                            </div>
                        </div>
                        {/* <!-- /encabezado menu --> */}
                        {/* <!-- Sección de usuario --> */}
                        <div className="menu-lateral-header">
                            <div className="user-pic">
                                <img className="img-responsive img-rounded" src={fotoUsuario} alt="User picture"
                                    id="imagenUsuario" />
                            </div>
                            <div className="user-info">
                                <span className="user-name" id="nombreDeUsuario"><strong>{nombreUsuario}</strong></span>
                                <span className="user-role" id="tipoUsuario">Administrador</span>
                                <span className="user-status">
                                    <i className="fa fa-circle"></i>
                                    <span>Online</span>
                                </span>
                            </div>
                        </div>
                        {/* <!-- Sección de usuario --> */}
                        {/* <!-- Opciones disponible lista de paginas --> */}
                        <div className="menu-lateral-menu">
                            <ul>
                                <li className="header-menu">
                                    <span>Opciones disponibles</span>
                                </li>
                                <li className="menu-lateral-dropdown">
                                    <a href="#">
                                        <i className="fa fa-chart-pie"></i>
                                        <span>Dashboard </span>
                                    </a>
                                </li>
                                <li className="menu-lateral-dropdown">
                                    <a href="#">
                                        <i className="fa fa-shopping-cart"></i>
                                        <span>Módulo de Ventas</span>
                                    </a>
                                </li>
                                <li className="menu-lateral-dropdown">
                                    <a href="productos.html">
                                        <i className="fas fa-shopping-basket"></i>
                                        <span>Productos</span>
                                    </a>
                                </li>
                                <li className="menu-lateral-dropdown">
                                    <a href="roles_usuarios.html">
                                        <i className="fas fa-users-cog"></i>
                                        <span>Usuarios</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        {/* <!-- /Opciones disponible lista de paginas --> */}
                    </div>
                    {/* <!-- Footer menu --> */}
                    <div className="menu-lateral-footer style-footer">
                        <img src={logoNg} alt="..." className="img-rounded width-250px"/>
                    </div>
                    <div className="menu-lateral-footer">
                        <a href="index.html">
                            <i className="fa fa-power-off"></i>
                        </a>
                    </div>
                    {/* <!-- /Footer menu --> */}
                </nav>


            </div>
        </>
    )
}
