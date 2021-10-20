import React, { useEffect, useState} from 'react'
import { HeaderNg } from './HeaderNg'
import { ListaUsuarios } from './ListaUsuarios';
import { MenuLateralNg } from '../components/MenuLateralNg';
import fotoUsuario from './../images/user2.png'
import '../css/contenido.css';
import { FooterComponent } from '../components/FooterComponent';

export const AdminUsuarios = () => {

    useEffect( async () => {
        document.title= "Admin. Usuarios" //Cambio de titulo pestaña

    },[])

    return (
        <>
            <div className="contenedorFlex">
            <HeaderNg titulo='Administrador de Usuarios'/>
                <main>
                <ListaUsuarios/>
                </main>
                <FooterComponent />
            </div>         
            
            
            <MenuLateralNg usuario='nombre de Usuario' tipo='Administrador_Prueba' foto={fotoUsuario}/>
            
            
    
        </>
    )
}
