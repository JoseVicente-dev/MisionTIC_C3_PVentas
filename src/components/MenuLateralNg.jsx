import React, { useEffect, useState} from 'react'
import '../css/menu.css';
import logoMercurio from '../images/logo_mercurio.png'
import fotoUsuario from '../images/user2.png'
import logoNg from '../images/logo2.png'
import {BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom";
import { logOutUsuario} from '../config/firebase';
import { usuarioActivo, usuarioActivoPhoto, usuarioActivoRol} from './../config/firebase';                                       

export const MenuLateralNg = ({usuario, tipo, foto}) => {
    const [menu, setMenu]= useState("")
    usuario=usuarioActivo
    foto=usuarioActivoPhoto
    tipo = usuarioActivoRol
    
    const handleClickMenu= () => {
        if(menu=="toggled"){
            setMenu("")
            document.getElementById('menuNg').classList.remove('toggled')
        }else{
            setMenu("toggled")
            document.getElementById('menuNg').classList.add('toggled')
        }
      }
    useEffect(()=>{
        document.getElementById('menuNg').classList.remove('toggled') 
    },[])

    const handleClickLogOut= () =>{
        logOutUsuario()
        setTimeout(() => {
            usuario="Usuario sin LogIn"
            foto= fotoUsuario
            tipo = "Sin Validar"
            // document.getElementById('menuNg').classList.remove('toggled')
        }, 1000); 
    }
    return (
        <>
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
                                        <span >Dashboard </span>
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
                        <NavLink to={`/`}>
                            <a onClick={handleClickLogOut}>
                                <i className="fa fa-power-off"></i>
                            </a>
                        </NavLink>
                    </div>
                    {/* <!-- /Footer menu --> */}
                </nav>
            </div>
        
   

        </>
    )
}
