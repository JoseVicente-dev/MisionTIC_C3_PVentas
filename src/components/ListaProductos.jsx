import React,{ useEffect, useState} from 'react'
import '../css/tablas_modales.css';
import { uuid } from 'uuidv4'
import { BusquedaBd } from './BusquedaBd';
import { consultarDocumentoWhere, guardarDatabase, actualizarDocumentoDatabase, eliminarDocumentoDatabase} from './../config/firebase';

import { usuarioActivo } from './../config/firebase';
import {useHistory } from 'react-router'

export const ListaProductos = () => {

    const [listaProductos, setListaProductos] = useState([])
    const [counter, setCounter]=useState(0);
    
    const cargarProductos = async () =>{
       /*  const listaTemporal = await consultarDatabase('ng_productos') //trae info database */
        let terminoBusqueda = document.getElementById('busquedapor').value
        let busqueda = document.getElementById("busqueda").value;

        const listaTemporal = await consultarDocumentoWhere('ng_productos',terminoBusqueda, busqueda) 
        console.log("Esta es la lista de productos segun busqueda: ", listaTemporal)
        setListaProductos(listaTemporal)
    }

    const history = useHistory()

    const sinAcceso = ()=>{
        alert('Por favor realizar LogIn con Gmail')
        history.push('/')
    }

    useEffect(() => {
        usuarioActivo == undefined  ?  sinAcceso() : cargarProductos()
    },[counter])

    
    const handleClickAdicionar = async  () => {
        console.log("prueba adicionar");
        
        const inputDescription = document.getElementById("inputDescripcion").value.replace(/^\w/, (c) => c.toUpperCase());
        const inputWeigth = document.getElementById("inputPeso").value;
        const inputValue = document.getElementById("inputValorUnitario").value;
        const inputState = document.getElementById("inputEstado").value;

        const producto = {
            codigo: uuid(),
            descripcion: inputDescription.replace(/^\w/, (c) => c.toUpperCase()),
            peso: inputWeigth,
            valorUnitario: inputValue,
            estado: inputState
          }

        guardarDatabase('ng_productos', producto)
        setTimeout(cargarProductos,100)

    }

    let idSeleccionado // idDocumento que esta oculto en la tabla para modificar posteriormente

    const handleClickModificar = async  () => {

        let tablaProductos = document.getElementById("tabla_productos");
        let radios = tablaProductos.getElementsByTagName("input");
        let filas = tablaProductos.getElementsByTagName("tr");
        let totalFilas = radios.length;

        for (let i = 0; i < totalFilas; i++) {
            if (radios[i].checked) {
            //console.log(radios[i])
            let filaSeleccionada = filas[i]
            document.getElementById("modifyCodigo").value = filaSeleccionada.cells[1].innerText
            document.getElementById("modifyDescripcion").value = filaSeleccionada.cells[2].innerText
            document.getElementById("modifyPeso").value = filaSeleccionada.cells[3].innerText
            document.getElementById("modifyValorUnitario").value = filaSeleccionada.cells[4].innerText
            document.getElementById("modifyEstado").value = filaSeleccionada.cells[5].innerText
            idSeleccionado=filas[i].cells[6].innerText//esta linea trae el idDocuemtno oculta
            }
        }
        
    }


    const handleClickModificarBd = async  () => {
        
        const mCodigoInput = document.getElementById("modifyCodigo").value
        const mDescripcionInput = document.getElementById("modifyDescripcion").value.replace(/^\w/, (c) => c.toUpperCase());
        const mPesoInput = document.getElementById("modifyPeso").value;
        const mValorUnitarioInput = document.getElementById("modifyValorUnitario").value;
        const mestadoInput = document.getElementById("modifyEstado").value;
        
       const producto = {
            descripcion: mDescripcionInput,
            peso: mPesoInput,
            valorUnitario: mValorUnitarioInput,
            estado: mestadoInput,
        };

        actualizarDocumentoDatabase('ng_productos', idSeleccionado, producto)    
        setTimeout(cargarProductos,500)
        
    }

    const handleClickEliminar =async () =>{

        //console.log("Prueba")

        let tablaProductos = document.getElementById("tabla_productos");
        let radios = tablaProductos.getElementsByTagName("input");
        let filas = tablaProductos.getElementsByTagName("tr");
        let totalFilas = radios.length;

        for (let i = 0; i < totalFilas; i++) {
            if (radios[i].checked) {
            idSeleccionado=filas[i].cells[6].innerText//esta linea trae el idDocuemtno oculta
            }
        }

        eliminarDocumentoDatabase ('ng_productos', idSeleccionado)
        setTimeout(cargarProductos,500) 
    }



    return (
        <>
         
                <div className="container text-center">
                    
                    <div className="container">
                        <div className="row">
                            <div className="col-10">
                                <BusquedaBd estado='2'/>
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
                                        <th scope="col">Descripción</th>
                                        <th scope="col">Peso</th>
                                        <th scope="col">Valor Unit.</th>
                                        <th scope="col">Estado</th>
                                    </tr>
                                </thead>
                                <tbody style={{textAlign: "center"}} id="tabla_productos">
                                    {
                                    listaProductos.map((producto, index)=>(
                                        <tr key={producto.codigo}>
                                            <td>
                                                <div className="form-check"> 
                                                    <input 
                                                        className="form-check-input" 
                                                        type="radio" 
                                                        name="flexRadioDefault"
                                                        id="seleccionProducto"/> 
                                                </div>
                                            </td>
                                            <td scope="row">{index+1}</td>
                                            <td>{producto.descripcion}</td>
                                            <td>{producto.peso}</td>
                                            <td>{producto.valorUnitario}</td>
                                            <td>{producto.estado}</td>
                                            <td hidden>{producto.idDocumento}</td> {/* idDocumento Oculto en la tabla */}
                                        </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    
                    </section>


                    {/* <!-- Botones adicion, modificacion de productos --> */}
                    <div className="container text-center">
                        <button className="btn btn-primary bg-color-azul" id="btnAdicionarPrincipal" data-bs-toggle="modal"
                            data-bs-target="#Adicionar">Adicionar</button>
                        <button className="btn btn-primary bg-color-azul me-3 ms-3" id="btnModificarPrincial" data-bs-toggle="modal"  
                            data-bs-target="#Modificar"  onClick={handleClickModificar}>Modificar</button>
                        <button className="btn btn-danger bg-color-azul " id="btnEliminarPrincipal" data-bs-toggle="modal" 
                            data-bs-target="#Buscar">Eliminar</button>
                        </div>
                    {/* <!-- /Botones adicion, modificacion de productos --> */}


                    {/* <!-- Modal Adicionar Datos --> */}
                    <div className="modal fade" id="Adicionar" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1"
                        aria-labelledby="staticBackdropLabel1" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                            <div className="modal-content">
                                <div className="modal-header bg-color-azul">
                                    <h5 className="modal-title color-h5" id="staticBackdropLabel1">Adicionar producto</h5>
                                    <button type="button " className="btn-close bg-color-cerrarX" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div className="container">
                                        <div className="col">
                                            <input type="text" className="form-control modal-input-select-undisabled" id="inputDescripcion"
                                                placeholder="Descripción del producto" />
                                        </div>
                                        <div className="col">
                                            <input type="number" className="form-control modal-input-select-undisabled" id="inputPeso"
                                                placeholder="Peso(Kg)" />
                                        </div>
                                        <div className="col">
                                            <input type="number" className="form-control modal-input-select-undisabled"
                                                id="inputValorUnitario" placeholder="Valor unitario ($)" />
                                        </div>
                                        <div className="col">

                                            <select className="form-select modal-input-select-undisabled" id="inputEstado"
                                                placeholder="Estado" aria-label="Default select example">
                                                <option value="Disponible">Disponible</option>
                                                <option value="No disponible">No disponible</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-primary bg-color-azul" id="btnAdicionarModalAdicionar"
                                        data-bs-toggle="modal" data-bs-target="#DatosAgregados"
                                        data-bs-dismiss="modal" onClick={handleClickAdicionar}>Adicionar</button>
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"
                                        id="btnCancelarModal">Cancelar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- /Modal Adicionar Datos --> */}
                    

                    {/* <!-- Modal Modificar Datos --> */}
                    <div className="modal fade " id="Modificar" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1"
                        aria-labelledby="staticBackdropLabel2" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable ">
                            <div className="modal-content ">
                                <div className="modal-header bg-color-azul">
                                    <h5 className="modal-title color-h5" id="staticBackdropLabel2">Modificar producto</h5>
                                    <button type="button" className="btn-close bg-color-cerrarX" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div className="container">
                                        <div className="col">
                                            <input type="text" className="form-control modal-input-select-disabled" id="modifyCodigo"
                                                placeholder="Código de producto" disabled/>
                                        </div>
                                        <div className="col">
                                            <input type="text" className="form-control modal-input-select-disabled" id="modifyDescripcion"
                                                placeholder="Descripción del producto" disabled/>
                                        </div>
                                        <div className="col">
                                            <input type="number" className="form-control modal-input-select-undisabled" id="modifyPeso"
                                                placeholder="Peso (Kg)"/>
                                        </div>
                                        <div className="col">
                                            <input type="number" className="form-control modal-input-select-undisabled"
                                                id="modifyValorUnitario" placeholder="Valor unitario ($)"/>
                                        </div>

                                        <div className="col">

                                            <select className="form-select modal-input-select-undisabled" id="modifyEstado"
                                                aria-label="Default select example">
                                                <option value="Disponible">Disponible</option>
                                                <option value="No Disponible">No disponible</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-primary bg-color-azul" id="btnModificarModalModificar"
                                        data-bs-toggle="modal" data-bs-target="#DatosAgregados"
                                        data-bs-dismiss="modal" onClick={handleClickModificarBd}>Modificar</button>
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- /Modal Modificar Datos --> */}


                    {/* <!-- Modal Eliminar Datos --> */}
                    <div className="modal fade " id="Buscar" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1"
                    aria-labelledby="staticBackdropLabel3" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable ">
                            <div className="modal-content ">
                                <div className="modal-header" style={{backgroundColor: "#26327e"}}>
                                    <h5 className="modal-title" id="staticBackdropLabel3" style={{color: "white"}}>Alerta Eliminar Producto</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                        style={{backgroundColor: "#7a87bb"}}></button>
                                </div>
                                <div className="modal-body">
                                    <div className="modal-body">
                                    <p>Está seguro de Eliminar el Producto seleccionado, recuerde que esta acción no se puede deshacer</p>
                                </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-primary"  data-bs-dismiss="modal"
                                        style={{backgroundColor: "#26327e"}} id="btnEliminarModalEliminar" onClick={handleClickEliminar}>Eliminar</button> 
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- /Modal Eliminar Datos --> */}


                </div>
              
        </>
    )
}
