import React from 'react'
import { HeaderNg } from './HeaderNg'
import { ListaProductos } from './ListaProductos';
import { MenuLateralNg } from '../components/MenuLateralNg';
import fotoUsuario from './../images/user2.png'

export const AdminProductos = () => {
    return (
        <>
            <HeaderNg titulo='Administrador de Productos'/>
            <MenuLateralNg usuario='nombre de Usuario' tipo='Administrador_Prueba' foto={fotoUsuario}/>
            
            <ListaProductos/>
        </>
    )
}
