import React, { useEffect, useState} from 'react'
import { HeaderNg } from './HeaderNg'
import { ListaUsuarios } from './ListaUsuarios';
import { MenuLateralNg } from '../components/MenuLateralNg';
import fotoUsuario from './../images/user2.png'

export const AdminUsuarios = () => {

    useEffect( async () => {
        document.title= "Admin. Usuarios" //Cambio de titulo pestaña

    },[])

    return (
        <>
            <HeaderNg titulo='Administrador de Usuarios'/>
            <MenuLateralNg usuario='nombre de Usuario' tipo='Administrador_Prueba' foto={fotoUsuario}/>
            
            <ListaUsuarios/>
    
        </>
    )
}
