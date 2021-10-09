    const firebaseConfig = {
    apiKey: "AIzaSyCuuC5xt_cyNbakN_gIAJ3ixHvkw8LUCk8",
    authDomain: "nightmare-mercurio.firebaseapp.com",
    projectId: "nightmare-mercurio",
    storageBucket: "nightmare-mercurio.appspot.com",
    messagingSenderId: "829384661085",
    appId: "1:829384661085:web:bddd58254813be754315b4",
    measurementId: "G-TQYRLQ0VWT"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);


const modalNuevaVenta = document.getElementById("btnAgregarModalNuevaVenta")
const btn_contador = document.getElementById('contador_boton')

const tador = document.getElementById('btn_prueba')

tador.addEventListener('click', (e)=>{
    e.preventDefault();
    agregarProducto();
})


const botonPrueba = document.getElementById("prueba")

botonPrueba.addEventListener('click', (e) => {
    e.preventDefault();
    /* const input_prueba = document.getElementById("ClienteNuevo").value
    console.log(input_prueba); */

    const articuloNuevo = document.getElementById('ArticuloNuevo').value
    const clienteNuevo = document.getElementById('ClienteNuevo').value
    const valorNuevo = document.getElementById('ValorNuevo').value
    const fechaVenta = document.getElementById('FechaVentaNuevo').value
    const fechaPago = document.getElementById('FechaPagoNuevo').value
    const vendedorNuevo = document.getElementById('VendedorNuevo').value
    const estadoNuevo = document.getElementById('EstadoNuevo').value

    console.log(articuloNuevo);
    
})





//Variables usadas:
const dataBase = firebase.firestore()
let contadorNumer = 1;

function contador() {
    contadorNumer++
    console.log(contadorNumer);
    return contadorNumer;
}



function agregarProducto() {

    /* const numeroId = document.getElementById('IdNuevo').value        SE NECESITA REVISIÓN DE ID*/
    const articuloNuevo = document.getElementById('ArticuloNuevo').value
    const clienteNuevo = document.getElementById('ClienteNuevo').value
    const valorNuevo = document.getElementById('ValorNuevo').value
    const fechaVenta = document.getElementById('FechaVentaNuevo').value
    const fechaPago = document.getElementById('FechaPagoNuevo').value
    const vendedorNuevo = document.getElementById('VendedorNuevo').value
    const estadoNuevo = document.getElementById('EstadoNuevo').value

    /* console.log(numeroId) */

    const producto = {

        /* id: numeroId, SE NECESITA REVISIÓN DE ID */
        articulo: articuloNuevo,
        cliente: clienteNuevo,
        valor: valorNuevo,
        fecha_venta: fechaVenta,
        fecha_pago: fechaPago,
        vendedor: vendedorNuevo,
        estado: estadoNuevo

    }
    /* guardarProducto(producto); */
    console.log(producto);

}













async function guardarProducto(producto) {
    try {
        const respuesta = await dataBase.collection('ng_productos').add(producto)
        return respuesta

    } catch (error) {
        console.log(error)
    }

}





modalNuevaVenta.addEventListener('click', (e) => {
    e.preventDefault();
    contador()
    /* console.log(producto); */
    agregarProducto();

})

btn_contador.addEventListener('click', (e) => {
    e.preventDefault();
    contador()
    /* console.log(producto); */
    agregarProducto();
})



