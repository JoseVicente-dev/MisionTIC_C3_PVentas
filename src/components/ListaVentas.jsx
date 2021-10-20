import React, { useEffect, useState } from 'react'
import { consultarDatabase, consultarDocumentoWhere, usuarioActivoRol } from '../config/firebase';
import { uuid } from 'uuidv4'
import { BusquedaBd } from './BusquedaBd';
import { usuarioActivo, usuarioActivoEmail, eliminarDocumentoDatabase, actualizarDocumentoDatabase, guardarDatabase } from './../config/firebase';
import { useHistory } from 'react-router'

export const ListaVentas = () => {
    const [listaVentas, setListaVentas] = useState([])
    const [counter, setCounter] = useState(0);
    const [modalOnOFF, setModalOnOFF] = useState(false)

    /* console.log(usuarioActivo, "importado"); */

    const cargarVentas = async () => {
        //const listaTemporal = await consultarDatabase('ng_ventas') //trae info database
        let terminoBusqueda = document.getElementById('busquedapor').value
        let busqueda = document.getElementById("busqueda").value;
        const listaTemporal = await consultarDocumentoWhere('ng_ventas', terminoBusqueda, busqueda)
        setListaVentas(listaTemporal)
    }

    const history = useHistory()
    const sinAcceso = () => {
        alert('Por favor realizar LogIn con Gmail')
        history.push('/')
    }

    useEffect(() => {
        usuarioActivo == undefined ? sinAcceso() : cargarVentas();
    }, [counter])




    // modificar una venta
    let idSeleccionado // idDocumento que esta oculto en la tabla para modificar posteriormente

    const handleClickModificar = async () => {
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

                idSeleccionado = filas[i].cells[11].innerText//esta linea trae el idDocuemtno oculta
            }
        }

        /*  console.log(idSeleccionado) */

    }

    const handleClickModificarBd = async () => {
        //console.log("Prueba")

        const mclienteInput = document.getElementById("ClienteBusqueda").value.replace(/^\w/, (c) => c.toUpperCase());
        const mcantidadInput = document.getElementById("CantidadM").value;
        const mestadoInput = document.getElementById("EstadoBusqueda").value;
        const mfechaVentaInput = document.getElementById("FechaVentaBusqueda").value;
        const mfechaPagoInput = document.getElementById("FechaPagoBusqueda").value;


        const ventaModificada = {
            cliente: mclienteInput,
            cantidad: mcantidadInput,
            fechaVenta: mfechaVentaInput,
            fechaPago: mfechaPagoInput,
            estado: mestadoInput,
        }

        actualizarDocumentoDatabase('ng_ventas', idSeleccionado, ventaModificada)
        setTimeout(cargarVentas, 100)


    }

    const handleClickEliminar = async () => {
        //console.log("Prueba");
        let tablaVentas = document.getElementById("tabla_ventas");
        let radios = tablaVentas.getElementsByTagName("input");
        let filas = tablaVentas.getElementsByTagName("tr");
        let totalFilas = radios.length;

        for (let i = 0; i < totalFilas; i++) {
            if (radios[i].checked) {
                idSeleccionado = filas[i].cells[11].innerText//esta linea trae el idDocuemtno
            }
        }

        eliminarDocumentoDatabase('ng_ventas', idSeleccionado)
        setTimeout(cargarVentas, 100)
    }

    //<ADICIONAR PRODUCTO>
    const handleClickAdicionar = async () => {
        // console.log("prueba adicionar");


        const articuloVentas = document.getElementById('ArticuloNuevo');
        const artiVentas = articuloVentas.options[articuloVentas.selectedIndex].text
        const clienteVentas = document.getElementById('ClienteNuevo').value;
        const ValorUnitario = document.getElementById('ValorNuevo').value;
        const ValorVentas = document.getElementById('ValorTotal').value;
        const CantidadVentas = document.getElementById('CantidadNueva').value;
        const fechasVenta = document.getElementById('FechaVentaNuevo').value;
        const FechaPagoVentas = document.getElementById('FechaPagoNuevo').value;
        const vendedor = document.getElementById('VendedorNuevo');
        const vendeVenta = vendedor.options[vendedor.selectedIndex].text
        const estadoPago = document.getElementById('EstadoNuevo').value;


        const ventaAgregar = {
            id: uuid(),
            articulo: artiVentas.replace(/^\w/, (c) => c.toUpperCase()),
            cliente: clienteVentas.replace(/^\w/, (c) => c.toUpperCase()),
            valor: ValorUnitario,
            valorTotal: ValorVentas,
            fechaVenta: fechasVenta,
            fechaPago: FechaPagoVentas,
            vendedor: vendeVenta.replace(/^\w/, (c) => c.toUpperCase()),
            estadoPago: estadoPago,
            cantidad: CantidadVentas
        }

        actualizarProducto()
        guardarDatabase('ng_ventas', ventaAgregar)
        setTimeout(cargarVentas, 100)

    }
    //</ADICIONAR PRODUCTO>

    //<ACTUALIZAR CANTIDAD DE PRODUCTOS>
    const actualizarProducto = async () => {

        const articuloVentas = document.getElementById('ArticuloNuevo');
        const artiVentas = articuloVentas.options[articuloVentas.selectedIndex].text
        const CantidadVentas = document.getElementById('CantidadNueva').value;
        
        /* console.log(articuloVentas); */
        

        const respuestaProductos = await consultarDocumentoWhere('ng_productos', 'descripcion', artiVentas)
        let idmod
        let pesoActualizar
        let estadoaActualizar

        respuestaProductos.forEach((t) => {
                  

            if (t.descripcion === artiVentas) {
                idmod = t.idDocumento
                pesoActualizar = t.peso - CantidadVentas
                if (pesoActualizar == 0) {
                    estadoaActualizar = "No disponible"
                } else {
                    estadoaActualizar = "Disponible"
                }
            }
        });

        const actualizarProducto = {
            peso: pesoActualizar,            
            estado: estadoaActualizar,
        };

        actualizarDocumentoDatabase('ng_productos', idmod, actualizarProducto)


    }
    //</ACTUALIZAR CANTIDAD DE PRODUCTOS>

    //<renderizar dropdown articulos>    

    const renderProductos = async () => {

        const selectArticulo = document.getElementById("ArticuloNuevo")
        const respuestaProductos = await consultarDocumentoWhere('ng_productos', 'estado', 'Disponible')


        let contA = 0
        respuestaProductos.forEach((t) => {
            var option = document.createElement("option")
            option.value = contA
            option.text = t.descripcion
            selectArticulo.appendChild(option)
            contA = contA + 1
        })
    }
    //</renderizar dropdown articulos>

    //<renderizar dropdown vendedores>
    const renderVendedores = async () => {

        const selectVendedor = document.getElementById("VendedorNuevo")

        const respuestaUsuarios = await consultarDocumentoWhere('ng_users', 'rol', 'Vendedor')
        /* console.log(respuestausuarios); */

        let contV = 0
        respuestaUsuarios.forEach((t) => {
            var option = document.createElement("option");
            option.value = contV;
            option.text = t.nombres;
            selectVendedor.appendChild(option);
            contV++

        });
    }
    //</renderizar dropdown vendedores>


    //<Obtener precio>
    const obtenerPrecio = async () => {

        const articuloVentas = document.getElementById('ArticuloNuevo');
        const artiVentas = articuloVentas.options[articuloVentas.selectedIndex].text



        const respuestaProductosPrecio = await consultarDocumentoWhere('ng_productos', 'descripcion', artiVentas)
        // console.log("respuestaProductosPrecio", respuestaProductosPrecio);

        respuestaProductosPrecio.forEach((t) => {
            // console.log(t)
            if (t.descripcion === artiVentas) {
                document.getElementById("ValorNuevo").value = t.valorUnitario;
                document.getElementById("cantDisp").innerText = "Cantidad disponible: " + t.peso + "kg";
            }
        });
    }

    const obtenerPrecioTotal = async () => {

        const ValorUnitario = document.getElementById('ValorNuevo').value;
        const Kilos = document.getElementById('CantidadNueva').value;
        const valorTotal = ValorUnitario * Kilos;

        const articuloVentas = document.getElementById('ArticuloNuevo');
        const artiVentas = articuloVentas.options[articuloVentas.selectedIndex].text

        const respuestaProductosPrecio = await consultarDocumentoWhere('ng_productos', 'descripcion', artiVentas)
        // console.log("respuestaProductosPrecio ", respuestaProductosPrecio);


        //Validación de cantidad disponible
        respuestaProductosPrecio.forEach((t) => {
            // console.log("Cantidad disponible", t.peso)
            if (t.descripcion === artiVentas) {

                if (parseInt(t.peso, 10) >= parseInt(Kilos, 10)) {
                    document.getElementById("ValorTotal").value = valorTotal;
                } else {
                    alert("no hay la cantidad requerida en bodega")
                    document.getElementById('CantidadNueva').value = ""
                    document.getElementById("ValorTotal").value = ""
                }
            }
        });
    }

    //</Obtener precio>

    // <comparar usuarios>
    const compararRolUsuario = async () => {
        const respuestausuarios = await consultarDocumentoWhere('ng_users', 'email', usuarioActivoEmail)
        let tipoUsuarioActual

        respuestausuarios.forEach((t) => {
            tipoUsuarioActual = t.rol
        });

        if (tipoUsuarioActual == "Vendedor") {
            document.getElementById('VendedorNuevo').disabled = true
            /* document.getElementById('VendedorNuevo').text = usuarioActual */

            var select = document.getElementById("VendedorNuevo")
            var option = document.createElement("option");
            option.value = 0;
            option.text = usuarioActivo;
            select.appendChild(option);

        } else {
            var select = document.getElementById("VendedorNuevo")
            var option = document.createElement("option");
            option.value = 0;
            option.text = usuarioActivo;
            select.appendChild(option);
            renderVendedores()
        }
        renderProductos()
        /* console.log(vendedor) */


    }
    //</comparar usuarios>



    //<Limpiar selectores>

    const limpiarSelectores = async () => {
        const selectorArticulo = document.getElementById('ArticuloNuevo');
        const selectorVendedor = document.getElementById("VendedorNuevo");
        // let option = document.createElement("option")
        // option.hidden=



        while (selectorVendedor.firstChild) {
            selectorVendedor.removeChild(selectorVendedor.lastChild)

        }

        while (selectorArticulo.firstChild) {
            selectorArticulo.removeChild(selectorArticulo.lastChild)

        }
    }
    //</Limpiar>


    //<DROPDOWNS>
    useEffect(async () => {


        compararRolUsuario()
        obtenerPrecio()
        limpiarSelectores()



    }, [modalOnOFF])

    //</DROPDOWNS>

    return (
        <>
            <div className="container text-center">
                <div className="container">
                    <div className="row">
                        <div className="col-10">
                            <BusquedaBd estado='3' />
                        </div>
                        <div className="col-2">
                            <button type="button"
                                className="btn btn-primary"
                                id="buscarVenta"
                                onClick={() => setCounter(counter + 1)}
                            >
                                <i className="fas fa-search"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <section className="main">
                    <div className="container-fluid table-responsive abs-center-table">
                        <table className="table table-hover table-striped" >
                            <thead style={{ textAlign: "center" }}>
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
                            <tbody style={{ textAlign: "center" }} id="tabla_ventas">
                                {
                                    listaVentas.map((venta, index) => (
                                        <tr key={venta.id}>
                                            <td>
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="flexRadioDefault"
                                                        id="seleccionVenta" />
                                                </div>
                                            </td>
                                            <td scope="row">{index + 1}</td>
                                            <td>{venta.cliente}</td>
                                            <td>{venta.articulo}</td>
                                            <td>{venta.cantidad}</td>
                                            <td>{venta.valor}</td>
                                            <td>{venta.valorTotal}</td>
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
                        data-bs-target="#NuevaVenta" onClick={() => { setModalOnOFF(!modalOnOFF) }} >Adicionar</button>

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
                                        <select className="form-select modal-input-select-undisabled" id="ArticuloNuevo" onChange={obtenerPrecio}>
                                            <option defaultValue>Articulo</option>
                                        </select>
                                        <input type="text" className="form-control modal-input-select-undisabled" id="ClienteNuevo"
                                            placeholder="Cliente" />
                                        <input type="text" className="form-control modal-input-select-undisabled" id="ValorNuevo"
                                            placeholder="Valor unitario" disabled />
                                        <label style={{ marginLeft: "20px" }} id="cantDisp">Cantidad disponible en Kg: </label>
                                        <input type="number" className="form-control modal-input-select-undisabled" id="CantidadNueva"
                                            placeholder="cantidad en Kg" onChange={obtenerPrecioTotal} />
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
                                        <div className="row" style={{ margin: "10px 20px 10px 5px" }}>
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
                                    data-bs-dismiss="modal" onClick={handleClickAdicionar}>Agregar</button>
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
                                    <div className="row" style={{ margin: "10px 20px 10px 5px" }}>
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
                                    data-bs-dismiss="modal" onClick={handleClickModificarBd}>Modificar</button>
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
                            <div className="modal-header" style={{ backgroundColor: "#26327e" }}>
                                <h5 className="modal-title" id="staticBackdropLabel2" style={{ color: "white" }}>Alerta Eliminar Producto
                                    </h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                    style={{ backgroundColor: "#7a87bb" }}></button>
                            </div>
                            <div className="modal-body">
                                <div className="modal-body">
                                    <p>Está seguro de Eliminar el Producto seleccionado, recuerde que esta acción no se puede
                                            deshacer</p>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" data-bs-dismiss="modal"
                                    style={{ backgroundColor: "#26327e" }} id="btnEliminarModalEliminar" onClick={handleClickEliminar}>Eliminar</button>
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
