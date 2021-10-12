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

const btnNuevaventa= document.getElementById('btn_AgregarVenta');

const btnBuscarVenta = document.getElementById('buscarVenta')
const toastIngresoVenta = document.getElementById('liveToastIProduct')
const toastIngresoVentaNeg = document.getElementById('liveToastIProductNeg')
const toastCamposVacios = document.getElementById('toastCamposVacios')
const btnModalModificar = document.getElementById('btnModificarPrincial')
const btnModificarVenta = document.getElementById('btnModificarModalModificar')
let imgUsuario = document.getElementById('imagenUsuario')
let nombreUsuario = document.getElementById('nombreDeUsuario')
const btnEliminarVenta = document.getElementById('btnEliminarModalEliminar')
const botonAgregar = document.getElementById("btnAdicionarModalAdicionar");
const botonCancelar = document.getElementById("btnCancelarModal");
const auth = firebase.auth()
const proveedor = new firebase.auth.GoogleAuthProvider()
let usuarioActual;
let usuarioFoto;
let usuarioEmail;
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
        // radio.setAttribute("onClick", "MostrarBotonesVentas()")
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
        p.estado === '1' ? estado.textContent = "Cancelado" : estado.textContent = "Pendiente";

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
function AdicionrVenta(){
    console.log('Inicio adiconar venta');
    // Creacion de las variables de DOM
 /*    const idVentas= document.getElementById('IdNuevo'); */
    const articuloVentas= document.getElementById('ArticuloNuevo');
    const clienteVentas= document.getElementById('ClienteNuevo');
    const ValorVentas= document.getElementById('ValorNuevo');
    const fechasVenta = document.getElementById('FechaVentaNuevo');
    const FechaPagoVentas = document.getElementById('FechaPagoNuevo');
    const vendedor = document.getElementById('VendedorNuevo');
    const estadoPago = document.getElementById('EstadoNuevo');

    const ventaAgregar = {
        id: uuid.v4(), 
        nombres: articuloVentas,
        cliente: clienteVentas,
        valor: ValorVentas,
        fechaVenta: fechasVenta,
        fechaPago: FechaPagoVentas,
        vendedor: vendedor,
        estadoPago:estadoPago
    } 

    // Obtención de la base de datos
    const VentasArray = [];
    const DatosVentas = await dataBase.collection('ng_ventas').get()
    Datosventas.forEach((t) => {
        VentasArray.push(t.data());
        console.log(t);
    })


}
/* function showToast(id) {
    $(id).toast('show');
} */
/* async function obtenerDatos() {
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
                console.log(VentasArray);
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
mostrarInformacion() */
/* ---------------------------------------------------------------------------------------------- */
//Actiualizar Ventas en la tabla
/* async function actualizar() {
    try {
        const Ventas = []
        const respuestaVentas = await dataBase.collection('ng_Ventas').orderBy("descripcion").get()
        respuestaVentas.forEach(function (item) {
            Ventas.push(item.data())
        })
        pintarVentas(Ventas)
    } catch (error) {
        console.log(error)
    }
} */
/* ------------------------------------------------------------------------------------------------------- */
/* // pintarVentas
function pintarVentas(Ventas) {
    var table = document.getElementById("cuerpoTablaVentas");
    $("#cuerpoTablaVentas").empty();
    Ventas.forEach((t) => {

        var oRows = document.getElementById('cuerpoTablaVentas').getElementsByTagName('tr');
        var iRowCount = oRows.length;
        var row = table.insertRow(iRowCount);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);

        cell1.innerHTML = '<div class="form-check"><input class="form-check-input" type="radio" name="flexRadioDefault"id="flexRadioDefault6"/></div>';
        cell2.innerHTML = t.codigo;
        cell3.innerHTML = t.descripcion;
        cell4.innerHTML = t.peso;
        cell5.innerHTML = t.valorUnitario;
        cell6.innerHTML = t.estado === '1' ? "Disponible" : "No disponible";

    })
} */
// ---------------------------------------------------------------------------
/* async function buscarVentas() {

    try {
        let busqueda = document.getElementById("busqueda").value.replace(/^\w/, (c) => c.toUpperCase());
        console.log(busqueda)
        let terminoBusqueda = document.getElementById("busquedapor").value;
        const Venta = []
        respuestaVenta.forEach(function (item) {
            Venta.push(item.data())
        })
        setTimeout(pintarVentas(Venta), 1000)
    } catch (error) {
        console.log(error)
    }
}
 */
// /* ------------------------------------------------------------------------------------------------ */

//funcion del boton para que abra el modal con los datos de la fila.
/* function modificarVenta() {
    let tablaVentas = document.getElementById("cuerpoTablaVentas");
    let radios = tablaVentas.getElementsByTagName("input");
    let filas = tablaVentas.getElementsByTagName("tr");
    let totalFilas = radios.length;

    for (i = 0; i < totalFilas; i++) {
        if (radios[i].checked) {
            filaSeleccionada = filas[i]
            document.getElementById("modifyCodigo").value = filaSeleccionada.cells[1].innerText
            document.getElementById("modifyDescripcion").value = filaSeleccionada.cells[2].innerText
            document.getElementById("modifyPeso").value = filaSeleccionada.cells[3].innerText
            document.getElementById("modifyValorUnitario").value = filaSeleccionada.cells[4].innerText
            document.getElementById("modifyEstado").value = filaSeleccionada.cells[5].innerText

            if (filaSeleccionada.cells[5].innerText == "Disponible") {
                document.getElementById("modifyEstado").value = "2";
            }
            document.getElementById("modifyEstado").value = "1";
        }
    }
}
 */
/* //modificar Venta
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
    document.getElementById("inputDescripcion").value = "";
    document.getElementById("inputPeso").value = "";
    document.getElementById("inputValorUnitario").value = "";
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
} */
// ---------------------------------------------------------------

/* //comparar sesion actual con tipo de usuario
async function compararRolUsuario() {
    const respuestausuarios = await dataBase.collection("ng_users").where('email', '==', usuarioEmail).get();
    const usuariosBD = [];
    respuestausuarios.forEach(function (item) {
        usuariosBD.push(item.data());
    });

    usuariosBD.forEach((t) => {
        if (t.rol == "Vendedor") {
            document.getElementById('btnAdicionarPrincipal').disabled = true
            document.getElementById('btnModificarPrincial').disabled = true
            document.getElementById('btnEliminarPrincipal').disabled = true
        }
    });
} */
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
})
btnModificarVenta.addEventListener('click', (e) => {
    e.preventDefault()
    modificarVentafb()
    // ocultarBotonesVentas()
    showToast('#toastModificacion')
    limpiarModalModificar()
})
btnEliminarVenta.addEventListener('click', (e) => {
    e.preventDefault()
    eliminarVenta()
    setTimeout(actualizar, 1000)
})
function MostrarBotonesVentas() {
    const BotonesAdminVentasModificar = document.getElementById("btnModificarPrincial");
    const BotonesAdminVentasEliminar = document.getElementById("btnEliminarPrincipal");
    BotonesAdminVentasModificar.style.display = "inline-block";
    BotonesAdminVentasEliminar.style.display = "inline-block";
}
botonAgregar.addEventListener('click', (e) => {
    obtenerDatos();
    actualizar()
    limpiarModalAdicionar();
})
botonCancelar.addEventListener('click', (e) => {
    e.preventDefault();
    limpiarModalAdicionar();
})
btnBuscarVenta.addEventListener('click', (e) => {
    e.preventDefault()
    buscarVentas()
}) */
btnNuevaventa.addEventListener('click', (e) => {
    e.preventDefault()
    AdicionrVenta()
})