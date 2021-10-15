import React, { useEffect, useState} from 'react'
import { HeaderNg } from './HeaderNg'
import { ListaUsuarios } from './ListaUsuarios';

export const AdminUsuarios = () => {

    useEffect( async () => {
        document.title= "Admin. Usuarios" //Cambio de titulo pestaña

    },[])

    return (
        <>
            <HeaderNg titulo='Administrador de Usuarios'/>
            
            <ListaUsuarios/>
    
        </>
    )
}
