import React,{ useEffect, useState} from 'react'
import { consultarDatabase} from '../config/firebase';
import { BusquedaBd } from './BusquedaBd';

import { BrowserRouter as Router, Link } from "react-router-dom";
import { usuarioActivo } from './../config/firebase';

import {useHistory } from 'react-router'


export const ListaVentas = () => {
    
    const [listaVentas, setListaVentas] = useState([])

    /* console.log(usuarioActivo, "importado"); */

    const cargarVentas = async() =>{
        const listaTemporal = await consultarDatabase('ng_ventas') //trae info database
        setListaVentas(listaTemporal)
    }

    const history = useHistory()

    const sinAcceso = ()=>{
        alert('Por favor realizar LogIn con Gmail')
        history.push('/')
    }


    useEffect(() => {
        usuarioActivo == undefined  ?  sinAcceso() : cargarVentas() 
    },[])

    

    return (
        <>
          
                <div className="container text-center">

                    
                    <div className="container">
                        <div className="row">
                            <div className="col-10">
                            <BusquedaBd estado='3'/>
                            </div>
                            <div className="col-2">
                                <button type="button" 
                                    className="btn btn-primary" 
                                    id="buscarVenta"
                                    /* onClick={() =>setCounter (counter +1) } */
                                >
                                    <i className="fas fa-search"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                     <section className="main">
                        <div className="container-fluid table-responsive abs-center-table">
                            <table className="table table-hover table-striped" >
                                <thead  style={{textAlign: "center"}}>
                                    <tr>
                                        <th scope="col">&nbsp;</th>
                                        <th scope="col">Id</th>
                                        <th scope="col">Cliente</th>
                                        <th scope="col">Articulo</th>
                                        <th scope="col">Cantidad</th>
                                        <th scope="col">Valor Unit.</th>
                                        <th scope="col">Valor Total</th>
                                        <th scope="col">Fecha de Venta</th>
                                        <th scope="col">Vendedor</th>
                                        <th scope="col">Estado</th>
                                        <th scope="col">Fecha de Pago</th>
                                    </tr>
                                </thead>

                                <tbody style={{textAlign: "center"}} id="tabla_ventas">
                                    {
                                        listaVentas.map((venta, index)=>(
                                            <tr key={venta.id}>
                                                <td>
                                                <Link to={`/usuarios/${venta.idDocumento}`}>
                                                    <div className="form-check"> 
                                                        <input 
                                                            className="form-check-input" 
                                                            type="radio" 
                                                            name="flexRadioDefault"
                                                            id="seleccionVenta"/> 
                                                    </div>
                                                </Link>
                                                </td>
                                                <td scope="row">{index+1}</td>
                                                <td>{venta.cliente}</td>
                                                <td>{venta.articulo}</td>
                                                <td>{venta.cantidad}</td>
                                                <td>{venta.valor}</td>
                                                <td></td>
                                                <td>{venta.fechaVenta}</td>
                                                <td>{venta.vendedor}</td>
                                                <td>{venta.estadoPago}</td>
                                                <td>{venta.fechaPago}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    
                    </section>

                </div>
          
        </>
    )
}
