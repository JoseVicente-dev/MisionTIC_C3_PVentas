const firebaseConfig = {
    apiKey: "AIzaSyCuuC5xt_cyNbakN_gIAJ3ixHvkw8LUCk8",
    authDomain: "nightmare-mercurio.firebaseapp.com",
    projectId: "nightmare-mercurio",
    storageBucket: "nightmare-mercurio.appspot.com",
    messagingSenderId: "829384661085",
    appId: "1:829384661085:web:bddd58254813be754315b4",
    measurementId: "G-TQYRLQ0VWT"
};
// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
//Declarar Variables globales  
const dataBase = firebase.firestore();
// Declara Variables de DOM
const btnModalModificar= document.getElementById('btnModificarPrincial')
const btnNuevaventa = document.getElementById('btn_AgregarVenta');
const btnBuscarVenta = document.getElementById('buscarVenta')
const toastIngresoVenta = document.getElementById('liveToastIProduct')
const toastIngresoVentaNeg = document.getElementById('liveToastIProductNeg')
const toastCamposVacios = document.getElementById('toastCamposVacios')
let imgUsuario = document.getElementById('imagenUsuario')
let nombreUsuario = document.getElementById('nombreDeUsuario')
const btnEliminarVenta = document.getElementById('btnEliminarModalEliminar')
const botonAgregar = document.getElementById("btn_AgregarVenta");
const botonCancelar = document.getElementById("btnCancelarModalNuevaVenta");
const auth = firebase.auth()
const proveedor = new firebase.auth.GoogleAuthProvider()
let usuarioActual;
let usuarioFoto;
let usuarioEmail;
let tipoUsuarioActual;
setTimeout(menu, 1000)

async function mostrarInformacion() {
    // Se inicia el llamado de los Ventas desde la BD
    const Ventas = []
    const respuestaVentas = await dataBase.collection('ng_ventas').orderBy("articulo").get()
    respuestaVentas.forEach(function (item) {
        Ventas.push(item.data())
    })
    //Finaliza llamado Ventas
    let insertarFila = document.getElementById("cuerpoTablaVentas")
    let i = 0
    Ventas.forEach((p) => {
        i++
        filaTabla = document.createElement("tr")
        filaTabla.setAttribute("id", "row" + (i))
        seleccionar = document.createElement("th")
        div = document.createElement("div")
        div.setAttribute("class", "form-check")
        radio = document.createElement("input")
        radio.setAttribute("class", "form-check-input")
        radio.setAttribute("type", "radio")
        radio.setAttribute("name", "flexRadioDefault")
        radio.setAttribute("id", "flexRadioDefault" + i)
        radio.checked = false
        div.appendChild(radio)
        seleccionar.appendChild(div)
        filaTabla.appendChild(seleccionar)

        id = document.createElement("td")
        id.textContent = p.id

        articulo = document.createElement("td")
        articulo.textContent = p.articulo

        cliente = document.createElement("td")
        cliente.textContent = p.cliente

        valor = document.createElement("td")
        valor.textContent = p.valor

        fechaVenta = document.createElement("td")
        fechaVenta.textContent = p.fechaVenta

        fechaPago = document.createElement("td")
        fechaPago.textContent = p.fechaPago

        vendedor = document.createElement("td")
        vendedor.textContent = p.vendedor

        estado = document.createElement("td")
        p.estadoPago === '1' ? estado.textContent = "Cancelado" : estado.textContent = "Pendiente";

        filaTabla.appendChild(id)
        filaTabla.appendChild(articulo)
        filaTabla.appendChild(cliente)
        filaTabla.appendChild(valor)
        filaTabla.appendChild(fechaVenta)
        filaTabla.appendChild(fechaPago)
        filaTabla.appendChild(vendedor)
        filaTabla.appendChild(estado)

        insertarFila.appendChild(filaTabla)
    })
}
// ------------------------------------------ Adicionar Ventas--------------------------------
/*    const idVentas= document.getElementById('IdNuevo'); */
function AdicionarVenta() {
    // Creacion de las variables de DOM
    const articuloVentas = document.getElementById('ArticuloNuevo');
    const artiVentas = articuloVentas.options[articuloVentas.selectedIndex].text
    const clienteVentas = document.getElementById('ClienteNuevo').value;
    const ValorVentas = document.getElementById('ValorNuevo').value;
    const fechasVenta = document.getElementById('FechaVentaNuevo').value;
    const FechaPagoVentas = document.getElementById('FechaPagoNuevo').value;
    const vendedor = document.getElementById('VendedorNuevo');
    const vendeVenta = vendedor.options[vendedor.selectedIndex].text
    const estadoPago = document.getElementById('EstadoNuevo').value;


    const ventaAgregar = {
        id: uuid.v4(),
        articulo: artiVentas.replace(/^\w/, (c) => c.toUpperCase()),
        cliente: clienteVentas.replace(/^\w/, (c) => c.toUpperCase()),
        valor: ValorVentas,
        fechaVenta: fechasVenta,
        fechaPago: FechaPagoVentas,
        vendedor: vendeVenta.replace(/^\w/, (c) => c.toUpperCase()),
        estadoPago: estadoPago
    }
    if (ventaAgregar.articulo != "" && ventaAgregar.cliente != false && ventaAgregar.vendedor != "" && ventaAgregar.valor != "" && ventaAgregar.fechaVenta != "" && ventaAgregar.fechaPago != "") {
        guardarVentas(ventaAgregar)
        // actualizar();
        showToast('#toastIngresoCorrecto');
    } else {
        showToast('#toastCamposVacios')
    }
}
//guardar Ventas
async function guardarVentas(venta) {
    try {
        const respuesta = await dataBase.collection('ng_ventas').add(venta);
        return respuesta
    } catch (error) {
        console.log(error)
    }
}

function showToast(id) {
    $(id).toast('show');
}
async function obtenerDatos() {
    try {
        const inputDescription = document.getElementById("inputDescripcion").value.replace(/^\w/, (c) => c.toUpperCase());
        const inputWeigth = document.getElementById("inputPeso").value;
        const inputValue = document.getElementById("inputValorUnitario").value;
        const inputState = document.getElementById("inputEstado").value;
        const VentasArray = [];
        const nuevoxd = await dataBase.collection('ng_ventas').get()
        nuevoxd.forEach((t) => {
            VentasArray.push(t.data())
        })
        const Venta = {
            id: uuid.v4(),
            articulo: inputArticulo.replace(/^\w/, (c) => c.toUpperCase()),
            cliente: inputCliente.replace(/^\w/, (c) => c.toUpperCase()),
            valor: inputValor,
            fechaVenta: inputFechaVenta,
            fechaPago: inputFechaPago,
            vendedor: inputVendedor.replace(/^\w/, (c) => c.toUpperCase()),
            estado: inputState
        }
        if (Venta.descripcion != "" || Venta.peso != "" || Venta.valorUnitario != "") {
            if (VentasArray.length != 0 && VentasArray.find(busquedaArray => busquedaArray.descripcion == inputDescription)) {
            } else {
                console.log(typeof Venta.estado);
                anadirVenta(Venta)
                actualizar();
                showToast('#liveToastIProduct');
            }
        } else {
            showToast('#toastCamposVacios')
        }
        let contador = 0;
    } catch (error) {
        console.log(error);
    }
}

async function anadirVenta(product) {
    try {
        const respuesta = await dataBase.collection('ng_Ventas').add(product)
        return respuesta
    } catch (error) {
        console.log(error);
    }
}
mostrarInformacion()
/* ---------------------------------------------------------------------------------------------- */
//Actiualizar Ventas en la tabla
async function actualizar() {
    try {
        const Ventas = []
        const respuestaVentas = await dataBase.collection('ng_ventas').orderBy("articulo").get()
        respuestaVentas.forEach(function (item) {
            Ventas.push(item.data())
        })
        pintarVentas(Ventas)
    } catch (error) {
        console.log(error)
    }
}
/* ------------------------------------------------------------------------------------------------------- */
// pintarVentas
function pintarVentas(Ventas) {
    var table = document.getElementById("cuerpoTablaVentas");
    $("#cuerpoTablaVentas").empty();
    Ventas.forEach((t) => {
        let oRows = document.getElementById('cuerpoTablaVentas').getElementsByTagName('tr');
        let iRowCount = oRows.length;
        let row = table.insertRow(iRowCount);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5 = row.insertCell(4);
        let cell6 = row.insertCell(5);
        let cell7 = row.insertCell(6);
        let cell8 = row.insertCell(7);
        let cell9 = row.insertCell(8);

        cell1.innerHTML = '<div class="form-check"><input class="form-check-input" type="radio" name="flexRadioDefault"id="flexRadioDefault6"/></div>';
        cell2.innerHTML = t.id;
        cell3.innerHTML = t.articulo;
        cell4.innerHTML = t.cliente;
        cell5.innerHTML = t.valor;
        cell6.innerHTML = t.fechaVenta;
        cell7.innerHTML = t.fechaPago;
        cell8.innerHTML = t.vendedor;
        cell9.innerHTML = t.estadoPago === '1' ? "Cancelado" : "Pendente";
    })
    limpiarModalAdicionar()
}

// pintarVendedores
async function pintarVendedores() {

    var select = document.getElementById("VendedorNuevo")

    const respuestausuarios = await dataBase.collection("ng_users").where('rol','==','Vendedor').get();
    /* console.log(respuestausuarios); */
    const usuariosBD = [];

    respuestausuarios.forEach(function (item){
        usuariosBD.push(item.data());
    });

    let contadorV=0
    usuariosBD.forEach((t) => {
        var option = document.createElement("option");
        option.value = contadorV;
        option.text = t.nombres;
        select.appendChild(option);
        contadorV=contadorV+1

      });
      
      
}

// pintarProductos
async function pintarProductos() {

    var select = document.getElementById("ArticuloNuevo")

    const respuestaProductos = await dataBase.collection("ng_productos").get();
    /* console.log(respuestausuarios); */
    const productosBD = [];

    respuestaProductos.forEach(function (item){
        productosBD.push(item.data());
    });

    let contadorV=0
    productosBD.forEach((t) => {
        var option = document.createElement("option");
        option.value = contadorV;
        option.text = t.descripcion;
        select.appendChild(option);
        contadorV=contadorV+1
      });
      
      
}


// ---------------------------------------------------------------------------
async function buscarVentas() {
    try {
        let busqueda = document.getElementById("busqueda").value.replace(/^\w/, (c) => c.toUpperCase());
        console.log(busqueda)
        let terminoBusqueda = document.getElementById("busquedapor").value;
        respuestaVenta = await dataBase.collection("ng_ventas").where(terminoBusqueda, '>=', busqueda).where(terminoBusqueda, '<=', busqueda + '\uf8ff').get()
        const ventas = []
        respuestaVenta.forEach(function (item) {
            console.log(item.data())
            ventas.push(item.data())
        })
        console.log(ventas)
        setTimeout(pintarVentas(ventas), 1000)
    } catch (error) {
        console.log(error)
    }
}

// /* ------------------------------------------------------------------------------------------------ */

//funcion del boton para que abra el modal con los datos de la fila.
function modificarVenta() {

    let tablaVentas = document.getElementById("cuerpoTablaVentas");
    let radios = tablaVentas.getElementsByTagName("input");
    let filas = tablaVentas.getElementsByTagName("tr");
    let totalFilas = radios.length;
    
    for (i = 0; i < totalFilas; i++) {
        if (radios[i].checked) {
            filaSeleccionada = filas[i]
            console.log(filaSeleccionada.cells[1].innerText)
            document.getElementById("IdBusqueda").value = filaSeleccionada.cells[1].innerText;
            document.getElementById("ArticuloBusqueda").value = filaSeleccionada.cells[2].innerText;
            document.getElementById("ClienteBusqueda").value = filaSeleccionada.cells[3].innerText;
            document.getElementById("ValorBusqueda").value = filaSeleccionada.cells[4].innerText;
            document.getElementById("FechaVentaBusqueda").value = filaSeleccionada.cells[5].innerText;
            document.getElementById("FechaPagoBusqueda").value = filaSeleccionada.cells[6].innerText;
            document.getElementById("VendedorBusqueda").value = filaSeleccionada.cells[7].innerText;
          
            if (filaSeleccionada.cells[8].innerText == "Cancelada") {
                document.getElementById("modifyEstado").value = "1";
            }
            document.getElementById("modifyEstado").value = "2";
    }
}
}

//modificar Venta
async function modificarVentafb() {
    const mCodigoInput = document.getElementById("modifyCodigo").value
    const mDescripcionInput = document.getElementById("modifyDescripcion").value.replace(/^\w/, (c) => c.toUpperCase());
    const mPesoInput = document.getElementById("modifyPeso").value;
    const mValorUnitarioInput = document.getElementById("modifyValorUnitario").value;
    const mestadoInput = document.getElementById("modifyEstado").value;
    const respuestaprodctos = await dataBase.collection("ng_Ventas").where('codigo', '==', mCodigoInput).get();
    let idmod = ""
    respuestaprodctos.forEach(function (item) {
        idmod = item.id
    });
    dataBase.collection("ng_Ventas").doc(idmod).update({
        descripcion: mDescripcionInput,
        peso: mPesoInput,
        valorUnitario: mValorUnitarioInput,
        estado: mestadoInput,
    });
    const VentasArray = [];
    const nuevoxd = await dataBase.collection('ng_Ventas').get()
    nuevoxd.forEach((t) => {
        VentasArray.push(t.data())
    })
    setTimeout(actualizar, 1000);
}

function limpiarModalAdicionar() {
    document.getElementById("ArticuloNuevo").value = "";
    document.getElementById("ClienteNuevo").value = "";
    document.getElementById("ValorNuevo").value = "";
    document.getElementById("VendedorNuevo").value = "";
    document.getElementById("FechaVentaNuevo").value = "";
    document.getElementById("FechaPagoNuevo").value = "";

}
function limpiarModalModificar() {
    document.getElementById("modifyCodigo").value = "";
    document.getElementById("modifyDescripcion").value = "";
    document.getElementById("modifyPeso").value = "";
    document.getElementById("modifyValorUnitario").value = "";
}

function eliminarVenta() {

    let tablaVentas = document.getElementById("cuerpoTablaVentas");
    let radios = tablaVentas.getElementsByTagName("input");
    let filas = tablaVentas.getElementsByTagName("tr");
    let totalFilas = radios.length;
    let codigo = ""

    for (i = 0; i < totalFilas; i++) {
        if (radios[i].checked) {
            filaSeleccionada = filas[i]
            codigo = filaSeleccionada.cells[1].innerText
        }
    }
    //borrar datos
    var userborrar = dataBase.collection('ng_Ventas').where('codigo', '==', codigo);
    userborrar.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            doc.ref.delete();
        });
    });
}
// ---------------------------------------------------------------

//comparar sesion actual con tipo de usuario
async function compararRolUsuario() {
    const respuestausuarios = await dataBase.collection("ng_users").where('email', '==', usuarioEmail).get();
    const usuariosBD = [];

    respuestausuarios.forEach(function (item) {
        usuariosBD.push(item.data());
    });

    usuariosBD.forEach((t) => {
        tipoUsuarioActual=t.rol
    });

    if(tipoUsuarioActual=="Vendedor"){
        document.getElementById('VendedorNuevo').disabled = true
        /* document.getElementById('VendedorNuevo').text = usuarioActual */
 
        var select = document.getElementById("VendedorNuevo")
        var option = document.createElement("option");
        option.value = 0;
        option.text = usuarioActual;
        select.appendChild(option);
        
    }else{
        
        pintarVendedores()
    }
    pintarProductos()
    /* console.log(vendedor) */

        

      



}
//login
async function menu() {
    try {
        const respuesta = await auth.signInWithPopup(proveedor)
        usuarioActual = respuesta.user.displayName
        usuarioFoto = respuesta.user.photoURL
        usuarioEmail = respuesta.user.email
        imgUsuario.setAttribute("src", usuarioFoto)
        nombreUsuario.textContent = usuarioActual
        //esto en react no va tocar hacerlo
        // leer usuarios para comparar email
        const usuarios = []
        const respuestausuarios = await dataBase.collection('ng_users').get()

        respuestausuarios.forEach(function (item) {
            /* console.log(item.data()) */
            usuarios.push(item.data())
        })
        usuarios.forEach((t) => {
            if (t.email == usuarioEmail) {
                if (t.estado == true) {
                    tipUsuario.textContent = t.rol
                }
            }
        })
        setTimeout(compararRolUsuario, 1000)

    } catch (error) {
        console.log(error)
    }
}
// Eventos-----------------------------------------------------
/* btnModalModificar.addEventListener('click', (e) => {
    e.preventDefault()
    modificarVenta()
}) */
/* btnModificarVenta.addEventListener('click', (e) => {
    e.preventDefault()
    modificarVentafb()
    // ocultarBotonesVentas()
    showToast('#toastModificacion')
    limpiarModalModificar()
}) */
/* btnEliminarVenta.addEventListener('click', (e) => {
    e.preventDefault()
    eliminarVenta()
    setTimeout(actualizar, 1000)
}) */

botonAgregar.addEventListener('click', (e) => {
    obtenerDatos();
    actualizar()
    // limpiarModalAdicionar()
})
botonCancelar.addEventListener('click', (e) => {
    e.preventDefault();
    limpiarModalAdicionar();
})
btnBuscarVenta.addEventListener('click', (e) => {
    e.preventDefault()
    buscarVentas()
})
btnNuevaventa.addEventListener('click', (e) => {
    e.preventDefault()
    AdicionarVenta()
})

btnModalModificar.addEventListener('click', (e) => {
    e.preventDefault()
    modificarVenta()
})