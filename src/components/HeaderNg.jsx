import React from 'react'
import '../css/menu.css';

export const HeaderNg = () => {
    return (
        <>
         <nav className="navbar navbar-expand-lg navbar-dark bg-color " id="menu">
        <div className="container-fluid">
            <div className="col-12 text-aling-end">
                <a className="navbar-brand menuNG-titulo font-size-25px">
                    Título de página&nbsp;&nbsp; <i className="fas fa-users font-size-50px"></i>
                </a>
            </div>
        </div>
    </nav>   
        </>
    )
}
