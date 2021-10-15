import React,{ useEffect, useState} from 'react'
import { consultarDatabase } from '../config/firebase';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";



export const ListaUsuarios = () => {

    const [listaUsuarios, setListaUsuarios] = useState([])

    useEffect( async () => {
        const listaTemporal = await consultarDatabase('ng_users') //trae info database
        /* console.log(listaTemporal) */
        setListaUsuarios(listaTemporal)
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
                                                <Link to={`/usuarios/${usuario.idDocumento}`}>
                                                    <div className="form-check"> 
                                                        <input 
                                                            className="form-check-input" 
                                                            type="radio" 
                                                            name="flexRadioDefault"
                                                            id="seleccionUsuario"/> 
                                                    </div>
                                                </Link>
                                                </td>
                                                <td scope="row">{index+1}</td>
                                                <td>{usuario.nombres}</td>
                                                <td>{usuario.email}</td>
                                                <td>{usuario.rol}</td>
                                                <td>{usuario.estado}</td>
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
