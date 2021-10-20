import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { AdminVentas } from '../components/AdminVentas';
import { AdminUsuarios } from '../components/AdminUsuarios';
import { AdminProductos } from '../components/AdminProductos';
import { FooterComponent } from '../components/FooterComponent';
import { LoginComponent } from '../components/LoginComponent';
import DashBoard  from '../components/DashBoard';
import '../css/menu.css';


export const AppRouter = () => {
    return (
        <>
            <Router>
                <Switch>
                    <Route path="/" exact component={LoginComponent}/>
                {/*  <Route path="/menu"><h2> Ruta Menú</h2></Route> */}
                    <Route path="/ventas" component={AdminVentas}/>         
                    <Route path="/usuarios" component={AdminUsuarios}/>
                    <Route path="/productos" component={AdminProductos}/>
                    <Route path="/dashboard" component={DashBoard}/>
                </Switch>
            
            </Router>
        </>
    )
}
