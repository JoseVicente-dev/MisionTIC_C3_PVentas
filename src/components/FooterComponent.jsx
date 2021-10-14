import '../css/login.css';
import '../css/style.css';

import logoNg from '../images/logo2.png'

export const FooterComponent = () => {

    const handleClick= async  () => {
        console.log("Pueba de boton")
     
      }

    return (
        <>

            <footer>
                <nav className="navbar navbar-expand-lg navbar-light">
                    <div className="container-fluid">
                        <div className="container">
                            <div className="row">
                                <div    className="col-8" 
                                        style={{textAlign: "end;"}}>
                                    <img 
                                        className="logong" 
                                        src={logoNg} 
                                        alt="logo-nightmare" />
                                </div>
                                <div className="col-1"></div>
                                <div    className="col-3 " 
                                        style={{textAlign: "end;"}}>
                                    <div className="collapse navbar-collapse" id="navbarNav">
                                        <ul className="navbar-nav">
                                            <li className="nav-item">
                                                <a  className="nav-link active" 
                                                    style={{color: "#26327e;"},{fontSize: "22px;"}} 
                                                    ariaCurrent="page"
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
        </>
    )
}