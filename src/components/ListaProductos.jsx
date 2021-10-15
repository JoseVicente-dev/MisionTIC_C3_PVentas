import React,{ useEffect, useState} from 'react'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

import { consultarDatabase } from '../config/firebase';


export const ListaProductos = () => {

    const [listaProductos, setListaProductos] = useState([])

    useEffect( async () => {
        const listaTemporal = await consultarDatabase('ng_productos') //trae info database
        /* console.log(listaTemporal) */
        setListaProductos(listaTemporal)
    },[])

    return (
        <>
         <Router>
                <div className="container text-center">
                     <section className="main">
                        <div className="container-fluid table-responsive abs-center-table">
                            <table className="table table-hover table-striped" >
                                <thead  style={{textAlign: "center"}}>
                                    <tr>
                                    <th scope="col"></th>
                                    <th scope="col">Id</th>
                                    <th scope="col">Descripciçon</th>
                                    <th scope="col">Peso</th>
                                    <th scope="col">Valor Unit.</th>
                                    <th scope="col">Estado</th>
                                    </tr>
                                </thead>
                                <tbody style={{textAlign: "center"}} id="tabla_productos">
                                    {
                                    listaProductos.map((producto, index)=>(
                                        <tr key={producto.codigo}>
                                            <th>
                                            <Link to={`/productos/${producto.idDocumento}`}>
                                                <div className="form-check"> 
                                                    <input 
                                                        className="form-check-input" 
                                                        type="radio" 
                                                        name="flexRadioDefault"
                                                        id="seleccionProducto"/> 
                                                </div>
                                            </Link>
                                            </th>
                                            <th scope="row">{index+1}</th>
                                            <th>{producto.descripcion}</th>
                                            <th>{producto.peso}</th>
                                            <th>{producto.valorUnitario}</th>
                                            <th>{producto.estado}</th>
                                        </tr> 
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    
                    </section>

                </div>
            </Router>   
        </>
    )
}
