import React,{ useEffect} from 'react'
import { HeaderNg } from './HeaderNg';
import { useHistory } from 'react-router';
import { usuarioActivo } from './../config/firebase';

const DashBoard = () => {


    const history = useHistory()

    const sinAcceso = ()=>{
        alert('Por favor realizar LogIn con Gmail')
        history.push('/')
    }

    useEffect(() => {
        usuarioActivo == undefined  ?  sinAcceso() : console.log("ok")
    })

    return (
        <>
           <HeaderNg titulo='Dashboard'/> 
        </>
    )
}

export default DashBoard
