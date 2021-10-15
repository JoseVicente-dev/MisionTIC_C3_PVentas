import React from 'react'
import { HeaderNg } from './HeaderNg'
import { ListaVentas } from './ListaVentas';

export const AdminVentas = () => {
    return (
        <>
            <HeaderNg titulo='Administrador de Ventas'/>

            <ListaVentas/>
        </>
    )
}
