import '../css/login.css';
import '../css/style.css';

import logoNg from '../images/logo2.png'

export const FooterComponent = () => {

    return (
        <>

            <footer>
                <nav className="navbar navbar-expand-lg navbar-light pt-2" >
                    <div className="container-fluid">
                        <div className="container pt-2 pb-1">
                            <div className="row"  >
                                <div    className="col-8" 
                                        style={{textAlign: "end"}}>
                                    <img 
                                        className="logong" 
                                        src={logoNg} 
                                        alt="logo-nightmare" />
                                </div>
                                <div className="col-1"></div>
                                <div    className="col-3 " 
                                        style={{textAlign: "end"}}>
                                    <div className="collapse navbar-collapse" id="navbarNav">
                                        <ul className="navbar-nav">
                                            <li className="nav-item">
                                                <a  className="nav-link active" 
                                                    style={{color: "#26327e;"},{fontSize: "22px"}} 
                                                    aria-current="page"
                                                    href="#" data-bs-toggle="modal" data-bs-target="#Info">
                                                INFO</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                                        aria-label="Toggle navigation">
                                        <span className="navbar-toggler-icon"></span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </footer>

            <div className="modal fade" id="Info" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
                <div className="modal-header headerNg" >
                    <h5 className="modal-dialog modal-dialog-centered" >Información:</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <h5 style={{fontSize: "30px"}}>Acerca de nosotros:</h5>
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