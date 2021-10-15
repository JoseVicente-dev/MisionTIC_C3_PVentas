import React from 'react'
import { HeaderNg } from './HeaderNg'
import { FooterComponent } from './FooterComponent';
import { ListaProductos } from './ListaProductos';

export const AdminProductos = () => {
    return (
        <>
            <HeaderNg titulo='Administrador de Productos'/>
            
            <ListaProductos/>

            <FooterComponent/>
        </>
    )
}
