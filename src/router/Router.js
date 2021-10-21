import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { AdminVentas } from '../components/AdminVentas';
import { AdminUsuarios } from '../components/AdminUsuarios';
import { AdminProductos } from '../components/AdminProductos';
import { FooterComponent } from '../components/FooterComponent';
import { LoginComponent } from '../components/LoginComponent';
import DashBoard  from '../components/DashBoard';
import '../css/menu.css';
import { RutaPrivada } from './../components/RutaPrivada';


export const AppRouter = () => {
    return (
        <>
            <Router>
                <Switch>
                    {/* RUTA PUBLICA */}               
                    <Route path="/" exact component={LoginComponent}/>
                    
                    {/* RUTA PRIVADA */}
                    {/* <Route path="/ventas" component={AdminVentas}/>         
                    <Route path="/usuarios" component={AdminUsuarios}/>
                    <Route path="/productos" component={AdminProductos}/>
                    <Route path="/dashboard" component={DashBoard}/> */}

                     <RutaPrivada path="/ventas" component={AdminVentas}/>
                     <RutaPrivada path="/usuarios" component={AdminUsuarios}/>
                     <RutaPrivada path="/productos" component={AdminProductos}/>
                     <RutaPrivada path="/dashboard" component={DashBoard}/>
                     
                </Switch>
            
            </Router>
        </>
    )
}
