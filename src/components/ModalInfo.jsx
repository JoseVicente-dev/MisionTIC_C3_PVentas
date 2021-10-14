import '../css/login.css';
import '../css/style.css';

import React from 'react'

export const ModalInfo = () => {
    return (
        <>
        <div className="modal fade" id="Info" tabindex="-1">
            <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
                <div className="modal-header headerNg" >
                    <h5 className="modal-dialog modal-dialog-centered" >Información:</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <h5 style="font-size: 30px; ">Acerca de nosotros:</h5>
                    <p>Somos estudiantes de MisiónTIC 2021, esta aplicación web la hemos creado con base en
                    conocimientos adquiridos a través de los diferentes ciclos de formación.
                    </p>
                    <h5 style={{fontSize: "30px"}}>Contáctenos:</h5>
                    <p>Jose Vicente Velasco:&nbsp;&nbsp;&nbsp;&nbsp;velasco.josevicente@gmail.com</p>
                    <p>William Tavera:&nbsp;&nbsp;&nbsp;&nbsp;ws.tavera@gmail.com</p>
                    <p>Stiven Suárez:&nbsp;&nbsp;&nbsp;&nbsp;ferbohi@outlook.com</p>
                    <p>Samuel Jimenez:&nbsp;&nbsp;&nbsp;&nbsp;salejiji@gmail.com</p>
                    <p>Cristian Sarmiento:&nbsp;&nbsp;sarmientocastrocris@gmail.com</p>
                    
                </div>
                <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                
                </div>
            </div>
            </div>
      </div>
        </>
    )
}
