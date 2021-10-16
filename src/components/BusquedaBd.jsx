import React from 'react'
import { consultarDocumentoDatabase } from '../config/firebase';

export const BusquedaBd = ({estado}) => {

    let a , b, c, d, e, f, g, A, B, C, D, E, F, G

    const ventana = estado

    /* console.log(ventana) */
    switch(ventana){
        case '1'://usuarios
             a = 'Id';
             b = 'Nombres';
             c = 'Email';
             d = 'Rol';
             e = 'Estado';
             A = 'id';
             B = 'nombres';
             C = 'email';
             D = 'rol';
             E = 'estado';
            break;
        case '2'://productos
             a = 'Id';
             b = 'Descripción';
             c = 'Peso';
             d = 'Valor Unit';
             e = 'Estado';
             A = 'id';
             B = 'descripcion';
             C = 'peso';
             D = 'valor Unit';
             E = 'estado';
            break;
        case '3'://ventas
             a = 'Id';
             b = 'Cliente';
             c = 'Artículo';
             d = 'Valor Unit.';
             e = 'Vendedor';
             f = 'Estado';
             g = 'Fecha de Venta';
             A = 'id';
             B = 'cliente';
             C = 'articulo';
             D = 'valor';
             E = 'vendedor';
             F = 'estadoPago';
             G = 'fechaVenta';
            break;
    }


    const handleClickBusqueda = async  () => {
        console.log("Pueba de boton")
        
        switch(ventana){
            case '1'://usuarios
            console.log(await consultarDocumentoDatabase('ng_users', "60nWtTdQPssWzCdFKQ0l"));
            /* await dataBase.collection("ng_users").where(terminoBusqueda, '>=', busqueda).where(terminoBusqueda, '<=', busqueda+ '\uf8ff').get() */
                break;
            case '2'://productos
            console.log(await consultarDocumentoDatabase('ng_productos', "Ek4c4gxMRY1gsQ8D32K5"));
                break;
            case '3'://ventas
            console.log(await consultarDocumentoDatabase('ng_ventas', "DkI5Irk59hAxzsfWXGBA"));
            
                break;
            }
        }

        



    /* console.log(a,b,c,d,e); */

    return (
        <>
            <div className="row align-items-center">

                <div className="col-2" style={{textAlign: "end;"}}>
                    <label className="form-label" for="form1">Buscar u Ordenar por:</label>
                </div>

                <div className="col-2">
                    <select className="form-select " id="busquedapor" placeholder="Estado">  
                        <option value={A}>{a}</option>
                        <option value={B}>{b}</option>
                        <option value={C}>{c}</option>
                        <option value={D}>{d}</option>
                        <option value={E}>{e}</option>
                        <option value={F}>{f}</option>
                        <option value={G}>{g}</option>
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
