import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { usuarioActivo } from './../config/firebase';


//const usuario = null 

export const RutaPrivada = ({ component: Component, ...rest}) => {
    return (
        <Route { ...rest}>
            {
                usuarioActivo ?
                    <Component />
                :
                    <Redirect to="/" />
            }
        </Route>
    )
}
