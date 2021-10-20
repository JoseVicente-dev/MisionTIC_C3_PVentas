import React from 'react'
import { HeaderNg } from './HeaderNg'
import { ListaVentas } from './ListaVentas';
import { MenuLateralNg } from '../components/MenuLateralNg';
import fotoUsuario from './../images/user2.png'


export const AdminVentas = () => {
    return (
        <>
            <HeaderNg titulo='Administrador de Ventas'/>
            <MenuLateralNg usuario='nombre de Usuario' tipo='Administrador_Prueba' foto={fotoUsuario}/>

            <ListaVentas/>
        </>
    )
}
