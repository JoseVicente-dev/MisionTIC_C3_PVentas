import React from 'react'
import { HeaderNg } from './HeaderNg'
import { ListaVentas } from './ListaVentas';
import { MenuLateralNg } from '../components/MenuLateralNg';
import fotoUsuario from './../images/user2.png'
import '../css/contenido.css';
import '../css/style.css';
import { FooterComponent } from '../components/FooterComponent';

export const AdminVentas = () => {
    return (
        <>
            <div className="contenedorFlex">
                <HeaderNg titulo='Administrador de Ventas' />
                <main>
                    <ListaVentas />
                </main>
                <FooterComponent />
            </div>

            <MenuLateralNg usuario='nombre de Usuario' tipo='Administrador_Prueba' foto={fotoUsuario} />


        </>
    )
}
