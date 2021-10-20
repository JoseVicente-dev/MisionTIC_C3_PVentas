import React from 'react'
import '../css/menu.css';

export const HeaderNg = ({titulo}) => {

    if(titulo=="Administrador de Ventas"){
        var classes = 'fa fa-shopping-cart font-size-50px'
    }else if(titulo=="Administrador de Usuarios"){
        var classes = 'fas fa-users font-size-50px'
    }else if(titulo=="Administrador de Productos"){
        var classes = 'fas fa-shopping-basket font-size-50px'
    }else{
        var classes = 'fa fa-chart-pie font-size-50px'
    }
    

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-color " id="menu">
                <div className="container-fluid">
                    <div className="col-12 text-aling-end">
                        <a className="navbar-brand menuNG-titulo font-size-25px">
                            {titulo}&nbsp;&nbsp; <i id="icono" className={classes}></i>
                        </a>
                    </div>
                </div>
            </nav>   
        </>
    )
}
