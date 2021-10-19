import React,{ useEffect, useState} from 'react'
import { consultarDatabase, consultarDocumentoWhere} from '../config/firebase';
import { BusquedaBd } from './BusquedaBd';
import { usuarioActivo, eliminarDocumentoDatabase, actualizarDocumentoDatabase } from './../config/firebase';
import {useHistory } from 'react-router'

export const ListaVentas = () => {
    const [listaVentas, setListaVentas] = useState([])
    const [counter, setCounter]=useState(0);
    /* console.log(usuarioActivo, "importado"); */

    const cargarVentas = async() =>{
        //const listaTemporal = await consultarDatabase('ng_ventas') //trae info database
        let terminoBusqueda = document.getElementById('busquedapor').value
        let busqueda = document.getElementById("busqueda").value;
        const listaTemporal = await consultarDocumentoWhere('ng_ventas',terminoBusqueda, busqueda)
        setListaVentas(listaTemporal)
    }

    const history = useHistory()
    const sinAcceso = ()=>{
        alert('Por favor realizar LogIn con Gmail')
        history.push('/')
    }

    useEffect(() => {
        usuarioActivo == undefined  ?  sinAcceso() : cargarVentas() 
    },[counter])


// modificar una venta
let idSeleccionado // idDocumento que esta oculto en la tabla para modificar posteriormente

    const handleClickModificar = async  () => {
        /* console.log("Prueba") */

        let tablaVentas = document.getElementById("tabla_ventas");
        let radios = tablaVentas.getElementsByTagName("input");
        let filas = tablaVentas.getElementsByTagName("tr");
        let totalFilas = radios.length;

        for (let i = 0; i < totalFilas; i++) {

            if (radios[i].checked) {

                document.getElementById("IdBusqueda").value = filas[i].cells[1].innerText
                document.getElementById("ArticuloBusqueda").value = filas[i].cells[3].innerText
                document.getElementById("ClienteBusqueda").value = filas[i].cells[2].innerText
                document.getElementById("ValorBusqueda").value = filas[i].cells[5].innerText
                document.getElementById("CantidadM").value = filas[i].cells[4].innerText
                document.getElementById("ValorTotalM").value = filas[i].cells[6].innerText
                document.getElementById("VendedorBusqueda").value = filas[i].cells[8].innerText
                document.getElementById("EstadoBusqueda").value = filas[i].cells[9].innerText
                document.getElementById("FechaVentaBusqueda").value = filas[i].cells[7].innerText
                document.getElementById("FechaPagoBusqueda").value = filas[i].cells[10].innerText

                idSeleccionado=filas[i].cells[11].innerText//esta linea trae el idDocuemtno oculta
            }
        }

       /*  console.log(idSeleccionado) */

    }

    const handleClickModificarBd = async  () => {
        //console.log("Prueba")
        
        const mclienteInput = document.getElementById("MinputEmail").value;
        const mcantidadInput = document.getElementById("MinputRol").value;
        const mestadoInput = document.getElementById("MinputEstado").value;
        const mfechaVentaInput = document.getElementById("MinputEstado").value;
        const mfechaPagoInput = document.getElementById("MinputEstado").value;
        

        const ventaModificada= {
            cliente:mclienteInput,
            cantidad:mcantidadInput,
            fechaVenta:mfechaVentaInput,
            fechaPago:mfechaPagoInput,
            estado:mestadoInput
        }

        actualizarDocumentoDatabase('ng_ventas', idSeleccionado, ventaModificada)
        setTimeout(cargarVentas,100)
        
        
    }

    const handleClickEliminar =async () =>{
        //console.log("Prueba");
        let tablaVentas = document.getElementById("tabla_ventas");
        let radios = tablaVentas.getElementsByTagName("input");
        let filas = tablaVentas.getElementsByTagName("tr");
        let totalFilas = radios.length;

        for (let i = 0; i < totalFilas; i++) {
            if (radios[i].checked) {
                idSeleccionado=filas[i].cells[11].innerText//esta linea trae el idDocuemtno
            }
        }

        eliminarDocumentoDatabase ('ng_ventas', idSeleccionado)
        setTimeout(cargarVentas,100)
    }
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
                                    onClick={() =>setCounter (counter +1) }
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
                                                    <div className="form-check"> 
                                                        <input 
                                                            className="form-check-input" 
                                                            type="radio" 
                                                            name="flexRadioDefault"
                                                            id="seleccionVenta"/> 
                                                    </div>
                                                </td>
                                                <td scope="row">{index+1}</td>
                                                <td>{venta.cliente}</td>
                                                <td>{venta.articulo}</td>
                                                <td>{venta.cantidad}</td>
                                                <td>{venta.valor}</td>
                                                <td>{venta.valor}</td>
                                                <td>{venta.fechaVenta}</td>
                                                <td>{venta.vendedor}</td>
                                                <td>{venta.estadoPago}</td>
                                                <td>{venta.fechaPago}</td>
                                                <td hidden>{venta.idDocumento}</td> {/* idDocumento Oculto en la tabla */}
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Botones */}
                    <div className="container text-center" >
                        <button className="btn btn-primary bg-color-azul" id="btnAdicionarPrincipal" data-bs-toggle="modal"
                        data-bs-target="#NuevaVenta">Adicionar</button>

                        <button className="btn btn-primary bg-color-azul me-3 ms-3" id="btnModificarPrincial" data-bs-toggle="modal"
                        data-bs-target="#ModificarVenta" onClick={handleClickModificar}>Modificar</button>

                        <button className="btn btn-danger bg-color-azul " id="btnEliminarPrincipal" data-bs-toggle="modal"
                        data-bs-target="#EliminarVenta">Eliminar</button>
                        </div>
                    {/* Botones */}
                    
                    {/* <!--  Modal Nueva Venta --> */}
                    <div className="modal fade" id="NuevaVenta" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1"
                        aria-labelledby="staticBackdropLabel1" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                            <div className="modal-content">
                                <div className="modal-header bg-color-azul">
                                    <h5 className="modal-title color-h5" id="staticBackdropLabel1">Nueva venta</h5>
                                    <button type="button" className="btn-close bg-color-cerrarX" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div className="container">
                                        <div className="col">  
                                            <select className="form-select modal-input-select-undisabled" id="ArticuloNuevo" >
                                                <option hidden defaultValue>Articulo</option>
                                            </select>
                                            <input type="text" className="form-control modal-input-select-undisabled" id="ClienteNuevo"
                                                placeholder="Cliente" />
                                            <input type="text" className="form-control modal-input-select-undisabled" id="ValorNuevo"
                                                placeholder="Valor unitario" disabled />
                                            <label style={{marginLeft: "20px"}} id="cantDisp">Cantidad disponible en Kg: </label>    
                                            <input type="number" className="form-control modal-input-select-undisabled" id="CantidadNueva"
                                            placeholder="cantidad en Kg" />
                                            <input type="text" className="form-control modal-input-select-undisabled" id="ValorTotal"
                                            placeholder="Valor total" disabled />
                                            <select className="form-select modal-input-select-undisabled" id="VendedorNuevo" >
                                            </select>
                                            <select className="form-select modal-input-select-undisabled" id="EstadoNuevo" >
                                                <option value="Cancelada">Cancelada</option>
                                                <option value="Pendiente">Pendiente</option>
                                            </select>
                                            <div className="col">
                                            </div>
                                            <div className="row" style={{margin: "10px 20px 10px 5px"}}>
                                                <div className='input-group date col-sm' id='startDate' >
                                                    <span className="input-group-addon input-group-text"><span className="fa fa-calendar"></span>
                                                    </span>
                                                    <input type='text' className="form-control modal-input-select-undisabled-fecha" name="startDate" id="FechaVentaNuevo"
                                                        placeholder="Fecha Venta" 
                                                        />
                                                </div>
                                                <div className='input-group date col-sm' id='pagoDate' >
                                                    <span className="input-group-addon input-group-text"><span className="fa fa-calendar"></span>
                                                    </span>
                                                    <input type='text' className="form-control modal-input-select-undisabled-fecha" name="startDate" id="FechaPagoNuevo"
                                                        placeholder="Fecha Pago" 
                                                        />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-primary bg-color-azul" id="btn_AgregarVenta"
                                        data-bs-dismiss="modal">Agregar</button>
                                    <button type="button" className="btn btn-secondary" id="btnCancelarModalNuevaVenta"
                                        data-bs-dismiss="modal">Cancelar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!--  /Modal Nueva Venta --> */}

                   {/*  <!--  Modal Modificar Venta --> */}
                    <div className="modal fade" id="ModificarVenta" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1"
                        aria-labelledby="staticBackdropLabel1" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                            <div className="modal-content">
                                <div className="modal-header bg-color-azul">
                                    <h5 className="modal-title color-h5" id="NewVenta">Venta Seleccionada</h5>
                                    <button type="button" className="btn-close bg-color-cerrarX" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div className="container">
                                        <input type="text" className="form-control modal-input-select-undisabled" id="IdBusqueda"
                                            placeholder="Id Venta" disabled></input>
                                        <input type="text" className="form-control modal-input-select-undisabled" id="ArticuloBusqueda"
                                            placeholder="Articulo" disabled ></input>
                                        <input type="text" className="form-control modal-input-select-undisabled" id="ClienteBusqueda"
                                            placeholder="Cliente" pattern="[A-Za-z]{3}"></input>
                                        <input type="number" className="form-control modal-input-select-undisabled" id="ValorBusqueda"
                                            placeholder="Valor unitario" disabled></input>
                                        <input type="text" className="form-control modal-input-select-undisabled" id="CantidadM"
                                        placeholder="Cantidad" ></input>                            
                                        <input type="text" className="form-control modal-input-select-undisabled" id="ValorTotalM"
                                        placeholder="Valor total" disabled></input>
                                        <input type="text" className="form-control modal-input-select-undisabled" id="VendedorBusqueda"
                                            placeholder="Vendedor" disabled></input>
                                        <select className="form-select modal-input-select-undisabled" id="EstadoBusqueda">
                                            <option value='Cancelada'>Cancelada</option>
                                            <option value='Pendiente'>Pendiente</option>
                                        </select>
                                        <div className="row" style={{margin: "10px 20px 10px 5px"}}>
                                            <div className='input-group date col-sm' id='startDate'>
                                                <span className="input-group-addon input-group-text"><span className="fa fa-calendar"></span>
                                                </span>
                                                <input type='text' className="form-control modal-input-select-undisabled-fecha"
                                                    name="startDate" id="FechaVentaBusqueda" placeholder="Fecha Venta" />
                                            </div>
                                            <div className='input-group date col-sm' id='pagoDate'>
                                                <span className="input-group-addon input-group-text"><span className="fa fa-calendar"></span>
                                                </span>
                                                <input type='text' className="form-control modal-input-select-undisabled-fecha"
                                                    name="startDate" id="FechaPagoBusqueda" placeholder="Fecha Pago" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-primary bg-color-azul" id="btnModificarModalModificar"
                                        data-bs-toggle="modal" data-bs-target="#AlertaModificacionVenta"
                                        data-bs-dismiss="modal">Modificar</button>
                                    <button type="button" className="btn btn-secondary" id="btnCancelarModalModificar"
                                        data-bs-dismiss="modal">Cancelar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!--  /Modal Modificar Venta --> */}

                    {/* Modal Eliminar */}
                    <div className="modal fade " id="EliminarVenta" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1"
                        aria-labelledby="staticBackdropLabel2" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable ">
                            <div className="modal-content ">
                                <div className="modal-header" style={{backgroundColor: "#26327e"}}>
                                    <h5 className="modal-title" id="staticBackdropLabel2" style={{color: "white"}}>Alerta Eliminar Producto
                                    </h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                        style={{backgroundColor: "#7a87bb"}}></button>
                                </div>
                                <div className="modal-body">
                                    <div className="modal-body">
                                        <p>Está seguro de Eliminar el Producto seleccionado, recuerde que esta acción no se puede
                                            deshacer</p>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal"
                                        style={{backgroundColor: "#26327e"}} id="btnEliminarModalEliminar" onClick={handleClickEliminar}>Eliminar</button>
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Modal Eliminar*/}
                </div>
        </>
    )
}
