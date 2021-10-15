import React from 'react'
import { HeaderNg } from './HeaderNg'
import { ListaProductos } from './ListaProductos';

export const AdminProductos = () => {
    return (
        <>
            <HeaderNg titulo='Administrador de Productos'/>
            
            <ListaProductos/>
        </>
    )
}
