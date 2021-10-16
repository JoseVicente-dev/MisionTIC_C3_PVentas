import React,{ useEffect, useState} from 'react'
import {actualizarDocumentoDatabase, consultarDatabase, consultarDocumentoDatabase, guardarDatabase } from '../config/firebase';
import {BusquedaBd } from './BusquedaBd';
import {eliminarDocumentoDatabase } from './../config/firebase';



export const ListaUsuarios = () => {

    const [listaUsuarios, setListaUsuarios] = useState([])

    const cargarUsuarios = async () => {
        const listaTemporal = await consultarDatabase('ng_users') //trae info database
        setListaUsuarios(listaTemporal)
    }

    /* useParams */

    useEffect( () => {
        cargarUsuarios()
    },[])


    let idSeleccionado // idDocumento que esta oculto en la tabla para modificar posteriormente

    const handleClickModificar = async  () => {
        /* console.log("Prueba") */

        let tablaUsuarios = document.getElementById("tabla_usuarios");
        let radios = tablaUsuarios.getElementsByTagName("input");
        let filas = tablaUsuarios.getElementsByTagName("tr");
        let totalFilas = radios.length;

        for (let i = 0; i < totalFilas; i++) {

            if (radios[i].checked) {

                document.getElementById("MinputCodigo").value = filas[i].cells[1].innerText
                document.getElementById("Minputnombre").value = filas[i].cells[2].innerText
                //document.getElementById("MinputApellido").value = filaSeleccionada.cells[3].innerText
                document.getElementById("MinputEmail").value = filas[i].cells[3].innerText
                document.getElementById("MinputRol").value = filas[i].cells[4].innerText
                document.getElementById("MinputEstado").value = filas[i].cells[5].innerText
                idSeleccionado=filas[i].cells[6].innerText//esta linea trae el idDocuemtno
            }
        }

       /*  console.log(idSeleccionado) */

    }

    const handleClickModificarBd = async  () => {
        //console.log("Prueba")
        
        const memailInput = document.getElementById("MinputEmail").value;
        const mrolInput = document.getElementById("MinputRol").value;
        const mestadoInput = document.getElementById("MinputEstado").value;

        const usuario= {
            email:memailInput,
            rol:mrolInput,
            estado:mestadoInput
        }

        actualizarDocumentoDatabase('ng_users', idSeleccionado, usuario)
        setTimeout(cargarUsuarios,100)
        
    }


    const handleClickAdicionar = async  () => {
        console.log("prueba adicionar");
        
        const nombresInput = document.getElementById("inputnombre").value;
        /* const apellidosInput = document.getElementById("inputApellido").value; */
        const emailInput = document.getElementById("inputEmail").value;
        const rolInput = document.getElementById("inputRol").value;
        const estadoInput = document.getElementById("inputEstado").value;

        const usuarios = {
            /* id: uuid.v4(), */ 
            nombres: nombresInput,
            /* apellidos: apellidosInput, */
            rol: rolInput,
            estado: estadoInput,
            email: emailInput,
            photoUrl: ""
        } 

        guardarDatabase('ng_users', usuarios)
        setTimeout(cargarUsuarios,100)

    }

    const handleClickEliminar =async () =>{

        let tablaUsuarios = document.getElementById("tabla_usuarios");
        let radios = tablaUsuarios.getElementsByTagName("input");
        let filas = tablaUsuarios.getElementsByTagName("tr");
        let totalFilas = radios.length;

        for (let i = 0; i < totalFilas; i++) {
            if (radios[i].checked) {
                idSeleccionado=filas[i].cells[6].innerText//esta linea trae el idDocuemtno
            }
        }

        eliminarDocumentoDatabase ('ng_users', idSeleccionado)
        setTimeout(cargarUsuarios,100)
    }


    return (
        <>
                <div className="container text-center">

                <BusquedaBd estado='1'/>

                     <section className="main">
                        <div className="container-fluid table-responsive abs-center-table">
                            <table className="table table-hover table-striped" >
                                <thead  style={{textAlign: "center"}}>
                                    <tr>
                                    <th scope="col"></th>
                                    <th scope="col">Id</th>
                                    <th scope="col">Nombres</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Rol</th>
                                    <th scope="col">Estado</th>
                                    </tr>
                                </thead>
                                <tbody style={{textAlign: "center"}} id="tabla_usuarios">
                                    {
                                        listaUsuarios.map((usuario, index)=>(
                                            <tr key={usuario.id}>
                                                <td>
                                                {/* <Link to={`/usuarios/${usuario.idDocumento}`}> */}
                                                    
                                                    <div className="form-check"> 
                                                        <input 
                                                            className="form-check-input" 
                                                            type="radio" 
                                                            name="flexRadioDefault"
                                                            id="seleccionUsuario"
                                                        /> 
                                                    </div>
                                                {/* </Link> */}
                                                </td>
                                                <td scope="row">{index+1}</td>
                                                <td>{usuario.nombres}</td>
                                                <td>{usuario.email}</td>
                                                <td>{usuario.rol}</td>
                                                <td>{usuario.estado}</td>
                                                <td hidden>{usuario.idDocumento}</td> {/* idDocumento Oculto en la tabla */}
                                            </tr> 
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    
                    </section>

                    
                    <div className="container text-center">
                        {/* <button className="btn btn-primary fomr-mod-user" id="cargarDatos"  >Actualizar</button> */}

                        <button className="btn btn-primary fomr-mod-user" 
                        data-bs-toggle="modal" data-bs-target="#Adicionar" id="modaladicionar">Adicionar</button>

                        <button className="btn btn-primary fomr-mod-user" 
                        data-bs-toggle="modal" data-bs-target="#Modificar" id="modalModificar" onClick={handleClickModificar}>Modificar</button>
                    
                        <button className="btn btn-danger fomr-mod-user" 
                        data-bs-toggle="modal" data-bs-target="#Eliminar"  id="modalEliminar" >Eliminar</button>

                    </div>
  
                </div>


                {/* Modal de Modificar */}
                <div className="modal fade " id="Modificar" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
                    aria-labelledby="staticBackdropLabel2" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable ">
                        <div className="modal-content ">
                            <div className="modal-header headerNg">
                                <h5 className="modal-title" id="staticBackdropLabel2" style={{color: "white"}}>Modificar usuario</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                    style={{backgroundColor: "#7a87bb"}}></button>
                            </div>
                            <div className="modal-body">
                            <div className="modal-body">
                                <div className="container">
                                    <div className="col">
                                        <input type="text" className="form-control form-add-user" id="MinputCodigo" placeholder="Código del usuario" disabled />
                                        <input type="text" className="form-control form-add-user" id="Minputnombre" placeholder="Nombres" disabled />
                                        <input type="email" className="form-control form-add-user" id="MinputEmail" placeholder="email" disabled />
                                        <select className="form-select form-add-user" id="MinputRol" placeholder="Cargo"  aria-label="Default select example">
                                        <option value="Vendedor">Vendedor</option>
                                        <option value="Administrador">Administrador</option>
                                        </select>
                                        <select className="form-select form-add-user" id="MinputEstado" placeholder="Estado"  aria-label="Default select example">
                                            <option value="Pendiente">Pendiente</option>
                                            <option value="Autorizado">Autorizado</option>
                                            <option value="No autorizado">No autorizado</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary"  data-bs-dismiss="modal"
                                    style={{backgroundColor: "#26327e"}} id="btnModificarUsuario" onClick={handleClickModificarBd}>Modificar</button>
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Modal de Modificar */}

                {/* Modal de Adicionar */}
                <div className="modal fade" id="Adicionar" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
                    aria-labelledby="staticBackdropLabel1" aria-hidden="true" >
                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header" style={{backgroundColor: "#26327e"}}>
                                <h5 className="modal-title" id="staticBackdropLabel1" style={{color: "white"}}>Adicionar Usuario</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                    style={{backgroundColor: "#7a87bb"}}></button>
                            </div>
                            <div className="modal-body">
                                <div className="container"> 
                                    <div className="col">
                                        
                                        <input type="text" className="form-control form-add-user" id="inputnombre" placeholder="Nombres y Apellidos" />
                                        
                                        <input type="email" className="form-control form-add-user" id="inputEmail" placeholder="email" pattern=".+@gmail.com" />
                                        
                                        
                                        <select className="form-select form-add-user" id="inputRol" placeholder="Cargo"  aria-label="Default select example">
                                        <option value="Vendedor">Vendedor</option>
                                        <option value="Administrador">Administrador</option>
                                        </select>
                                        <select className="form-select form-add-user" id="inputEstado" placeholder="Estado" >
                                            <option value="Pendiente">Pendiente</option>
                                            <option value="Autorizado">Autorizado</option>
                                            <option value="No autorizado">No autorizado</option>
                                        </select>
                                        <br />
                                        <div className="col text-center">
                                        <label for="">Seleccione una foto de perfil</label>
                                            <input type="file" className="form-control-file form-add-user"  id="" accept="image/png, .jpeg, .jpg, image/gif" />
                                        </div>
                                    
                                    </div>                       
                                </div>

                                <div className="modal-footer">
                                    <button type="button" className="btn btn-primary"  data-bs-dismiss="modal"
                                        style={{backgroundColor: "#26327e"}} id="btnAdicionarUsuario" onClick={handleClickAdicionar}>Adicionar</button>
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Modal de Adicionar */}


                {/* Modal Eliminar */}
                <div className="modal fade " id="Eliminar" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
                aria-labelledby="staticBackdropLabel3" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable ">
                    <div className="modal-content ">
                        <div className="modal-header" style={{backgroundColor: "#26327e"}}>
                            <h5 className="modal-title" id="staticBackdropLabel3" style={{color: "white"}}>Alerta Eliminar Usuario</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                style={{backgroundColor: "#7a87bb"}}></button>
                        </div>
                        <div className="modal-body">
                            <div className="modal-body">
                            <p>Está seguro de Eliminar el usuario seleccionado, recuerde que esta acción no se puede devolver</p>
                        </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary"  data-bs-dismiss="modal"
                                style={{backgroundColor: "#26327e"}} id="btnEliminarUsuarios" onClick={handleClickEliminar}>Eliminar</button>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        </div>
                    </div>
                </div>
                </div>
                {/* Modal Eliminar */}      


        </>
    )
}
