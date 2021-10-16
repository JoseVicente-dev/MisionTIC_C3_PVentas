import React, { useEffect, useState} from 'react'
import { consultarDocumentoDatabase } from '../config/firebase';
import { consultarDocumentoWhere } from './../config/firebase';

export const BusquedaBd = ({estado}) => {

    const ventana = estado
    let opciones=[]

    /* console.log(ventana) */
    switch(ventana){
        case '1'://usuarios
             opciones=[
                 {opcion: "id", value: "Id"},
                 {opcion: "nombres", value: "Nombres"},
                 {opcion: "email", value: "Email"},
                 {opcion: "rol", value: "Rol"},
                 {opcion: "estado", value: "Estado"},
             ]
            break;
        case '2'://productos
             opciones=[
                {opcion: "id", value: "Id"},
                {opcion: "descripcion", value: "Descripción"},
                {opcion: "peso", value: "Peso"},
                {opcion: "valor", value: "Valor Unit"},
                {opcion: "estado", value: "Estado"},
            ]
            break;
        case '3'://ventas
            opciones=[
                {opcion: "id", value: "Id"},
                {opcion: "cliente", value: "Cliente"},
                {opcion: "articulo", value: "Artículo"},
                {opcion: "valor", value: "Valor Unit."},
                {opcion: "vendedor", value: "Vendedor"},
                {opcion: "estadoPago", value: "Estado"},
                {opcion: "fechaVenta", value: "Fecha de Venta"},
            ]
            break;
    }

    useEffect(()=>{

    })

    const handleClickBusqueda = async  () => {
        //console.log("Pueba de boton")
        
        let terminoBusqueda = document.getElementById('busquedapor').value
        let busqueda = document.getElementById("busqueda").value;

        switch(ventana){
            case '1'://usuarios
            consultarDocumentoWhere('ng_users',terminoBusqueda, busqueda)
                break;
            case '2'://productos
            consultarDocumentoWhere('ng_productos',terminoBusqueda, busqueda)
                break;
            case '3'://ventas
            consultarDocumentoWhere('ng_ventas',terminoBusqueda, busqueda)
                break;
            }
        }

        



    /* console.log(a,b,c,d,e); */

    return (
        <>
            <div className="row align-items-center ">

                <div className="col-2 abs-center-table" style={{textAlign: "end;"}}>
                    <label className="form-label" for="form1">Buscar u Ordenar por:</label>
                </div>

                <div className="col-2">
                    <select className="form-select " id="busquedapor" placeholder="Estado">  
                        {/* <option value={A}>{a}</option>
                        <option value={B}>{b}</option>
                        <option value={C}>{c}</option>
                        <option value={D}>{d}</option>
                        <option value={E}>{e}</option>
                        <option value={F}>{f}</option>
                        <option value={G}>{g}</option> */}

                        {
                            opciones.map((opcion)=>
                                <option key= { opcion.opcion} value={opcion.opcion}>{opcion.value}</option>
                            )
                        }

                    </select>

                </div>

                <div className="col-6">
                    <input type="search" id="busqueda" className="form-control" placeholder="Inserte Búsqueda" />
                </div>

                <div className="col-2">
                    <button type="button" 
                        className="btn btn-primary" 
                        id="buscarVenta"
                        onClick={handleClickBusqueda}
                    >
                        <i className="fas fa-search"></i>
                    </button>
                </div>
            </div>
        </>
    )
}
