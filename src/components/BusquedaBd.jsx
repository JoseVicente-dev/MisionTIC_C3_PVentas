import React, { useEffect, useState} from 'react'
import { consultarDocumentoWhere } from './../config/firebase';





export const BusquedaBd = ({estado}) => {

    const ventana = estado
    let opciones=[]
    let usuarios

    /* console.log(useParams()); */

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


    /* const handleClickBusqueda = async  () => {
        //console.log("Pueba de boton")

        
        
        let terminoBusqueda = document.getElementById('busquedapor').value
        let busqueda = document.getElementById("busqueda").value;

        switch(ventana){
            case '1'://usuarios
            usuarios = await consultarDocumentoWhere('ng_users',terminoBusqueda, busqueda)

                break;
            case '2'://productos
            usuarios = await consultarDocumentoWhere('ng_productos',terminoBusqueda, busqueda)
                break;
            case '3'://ventas
            usuarios = await consultarDocumentoWhere('ng_ventas',terminoBusqueda, busqueda)
                break;
        }
    } */


    return (
        <>
            <div className="row align-items-center ">

                <div className="col-3" style={{textAlign: "end"},{color:"white"}}>
                    <label className="form-label" htmlFor="form1">Buscar u Ordenar por:</label>
                </div>

                <div className="col-3">
                    <select className="form-select " id="busquedapor" placeholder="Estado">  

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

                {/* <div className="col-2">
                    <button type="button" 
                        className="btn btn-primary" 
                        id="buscarVenta"
                        onClick={handleClickBusqueda}
                    >
                        <i className="fas fa-search"></i>
                    </button>
                </div> */}
            </div>
        </>
    )
}
