import React from 'react'
import '../css/menu.css';

import logoMercurio from '../images/logo_mercurio.png'
import fotoUsuario from '../images/user2.png'
import logoNg from '../images/logo2.png'


import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";


import { AdminVentas } from './AdminVentas';
import { AdminUsuarios } from './AdminUsuarios';
import { AdminProductos } from './AdminProductos';
import { FooterComponent } from './FooterComponent';


export const MenuLateralNg = ({usuario, tipo, foto}) => {

      
      
    /* $("#close-menu-lateral").click(function () {
        $(".page-wrapper").removeClass("toggled");
      });
      $("#show-menu-lateral").click(function () {
        $(".page-wrapper").addClass("toggled");
      });
 */



    return (
        <>

        <Router>
            <Switch>
            <Route path="/" exact>
                <h2> Ruta principal</h2>
            </Route>

            <Route path="/menu">
                <h2> Ruta Menú</h2>
            </Route>

            <Route path="/ventas">
                <AdminVentas/>
            </Route>
            
            <Route path="/usuarios">
                <AdminUsuarios/>
            </Route>

            <Route path="/productos">
                <AdminProductos/>
            </Route>

            </Switch>
        

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
                                <img className="img-responsive img-rounded" src={foto} alt="User picture"
                                    id="imagenUsuario" />
                            </div>
                            <div className="user-info">
                                <span className="user-name" id="nombreDeUsuario"><strong>{usuario}</strong></span>
                                <span className="user-role" id="tipoUsuario">{tipo}</span>
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
                                    <Link to="/dashboard">
                                        <i className="fa fa-chart-pie"></i>
                                        <span>Dashboard </span>
                                    </Link>
                                </li>
                                <li className="menu-lateral-dropdown">
                                    <Link to='/ventas'>
                                        <i className="fa fa-shopping-cart"></i>
                                        <span>Módulo de Ventas</span>
                                    </Link>
                                </li>
                                <li className="menu-lateral-dropdown">
                                    <Link to="/productos">
                                        <i className="fas fa-shopping-basket"></i>
                                        <span>Productos</span>
                                    </Link>
                                </li>
                                <li className="menu-lateral-dropdown">
                                    <Link to='/usuarios'>
                                        <i className="fas fa-users-cog"></i>
                                        <span>Usuarios</span>
                                    </Link>
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
        </Router>

        <FooterComponent/>

        </>
    )
}
