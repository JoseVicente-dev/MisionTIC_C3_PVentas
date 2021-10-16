import React, { useEffect, useState} from 'react'
/* import $ from 'jquery'; */

import '../css/menu.css';

import logoMercurio from '../images/logo_mercurio.png'
import fotoUsuario from '../images/user2.png'
import logoNg from '../images/logo2.png'



import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    NavLink
  } from "react-router-dom";


import { AdminVentas } from './AdminVentas';
import { AdminUsuarios } from './AdminUsuarios';
import { AdminProductos } from './AdminProductos';
import { FooterComponent } from './FooterComponent';



export const MenuLateralNg = ({usuario, tipo, foto}) => {

    const [menu, setMenu]= useState("")
    
    const handleClickMenu= () => {
       /*  console.log("Pueba de Menu") */

        if(menu=="toggled"){
            setMenu("")
            document.getElementById('menuNg').classList.remove('toggled')
        }else{
            setMenu("toggled")
            document.getElementById('menuNg').classList.add('toggled')
        }
        /* console.log(menu); */
         
      }

    useEffect(()=>{
        document.getElementById('menuNg').classList.remove('toggled')
    },[])



    return (
        <>

        <Router>
            <Switch>
                <Route path="/" exact><h2> Ruta principal</h2></Route>
                <Route path="/menu"><h2> Ruta Menú</h2></Route>
                <Route path="/ventas" component={AdminVentas}/>         
                <Route path="/usuarios" component={AdminUsuarios}/>
                <Route path="/productos" component={AdminProductos}/>
            </Switch>
        

            {/* <!-- menu-lateral Menú lateral--> */}
            <div className="page-wrapper mercurio-theme toggled " id="menuNg">
                <button 
                    id="show-menu-lateral" 
                    className="btn btn-sm btn-dark " 
                    onClick={handleClickMenu}>
                    <i className="fas fa-bars font-size-30px margin-left-5px"> &nbsp;
                        <img src={logoMercurio} alt="" className="width-30px position-absolute"/>
                    </i>
                </button>
                <nav id="menu-lateral" className="menu-lateral-wrapper">
                    <div className="menu-lateral-contenido">
                        {/* <!-- encabezado menu --> */}
                        <div className="menu-lateral-brand background-color-azul">
                            <img src={logoMercurio} alt="" className="width-30"/>
                            &nbsp;
                            <a href="#" className="color-blanco-humo">Mercurio </a>
                                <div id="close-menu-lateral">
                                    <a onClick={handleClickMenu}><i className="fas fa-times color-blanco"></i></a>
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
                                    <NavLink to="/dashboard" activeClassName="color-blanco">
                                        <i className="fa fa-chart-pie"></i>
                                        <span>Dashboard </span>
                                    </NavLink>
                                </li>
                                <li className="menu-lateral-dropdown">
                                    <NavLink to='/ventas' activeClassName="color-blanco">
                                        <i className="fa fa-shopping-cart"></i>
                                        <span>Módulo de Ventas</span>
                                    </NavLink>
                                </li>
                                <li className="menu-lateral-dropdown">
                                    <NavLink to="/productos" activeClassName="color-blanco">
                                        <i className="fas fa-shopping-basket"></i>
                                        <span>Productos</span>
                                    </NavLink>
                                </li>
                                <li className="menu-lateral-dropdown" >
                                    <NavLink to='/usuarios' activeClassName="color-blanco">
                                        <i className="fas fa-users-cog"></i>
                                        <span>Usuarios</span>
                                    </NavLink>
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
                        <a href="#">
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
