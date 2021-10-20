import '../css/contenido.css';
import { FooterComponent } from '../components/FooterComponent';
import React from 'react'
import { HeaderNg } from './HeaderNg'
import { ListaProductos } from './ListaProductos';
import { MenuLateralNg } from '../components/MenuLateralNg';
import fotoUsuario from './../images/user2.png'

export const AdminProductos = () => {
    return (
        <>
            <div className="contenedorFlex">
                <HeaderNg titulo='Administrador de Productos' />
                <main>
                    <ListaProductos />
                </main>
                <FooterComponent />
            </div>
            <MenuLateralNg usuario='nombre de Usuario' tipo='Administrador_Prueba' foto={fotoUsuario} />
        </>
    )
}
