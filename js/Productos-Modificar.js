console.log('Producto Modificar')
const firebaseConfig = {
    apiKey: "AIzaSyCuuC5xt_cyNbakN_gIAJ3ixHvkw8LUCk8",
    authDomain: "nightmare-mercurio.firebaseapp.com",
    projectId: "nightmare-mercurio",
    storageBucket: "nightmare-mercurio.appspot.com",
    messagingSenderId: "829384661085",
    appId: "1:829384661085:web:980684babb57607f4315b4",
    measurementId: "G-0SKGBP594G"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


//Declarar letiables globales
const dataBase = firebase.firestore()
let Producto;
let contadorNumeroProductos;


//letiables DOM
const btnModificar = document.getElementById('btnModificarPrincial')
console.log(btnModificar)


//funciones

async function traerProductos() {

    const productos = await dataBase.collection('pruebaProductos').get()
    productos.forEach(function (item) {
        console.log(item.data())
        contadorNumeroProductos++
    })
    //   let contador=0
    //   usuarios.forEach((t)=>{
    //       /* console.log(t.email)
    //       console.log(typeof usuarioEmail) */
    //       if(t.email==usuarioEmail){
    //           /* console.log(t.email,'=',usuarioEmail) */
    //           contador=contador+1
    //           if(t.estado==true){
    //               contador=100//registrado y aprobado
    //           }else{
    //               contador=50//registrado pendiente de aprobaciòn
    //           }
    //       }
    //   })

}
console.log(contadorNumeroProductos)
function pruebaTablaMostrarProductos() {

    for (let i = 0; i < contadorNumeroProductos; i++) {
        let Check = document.createElement("input");
        Check.setAttribute("class", "form-Check-input")
        Check.setAttribute("type", "radio");
        Check.setAttribute("name", "flexRadioDefault")
        Check.setAttribute("Descripcion", i);
        // Check.setAttribute("onClick","MostrarBotones();InsertarDatosModalVentaBuscada(Descripcion)")
        let Codigo = document.createElement("label");
        Codigo.setAttribute("Descripcion", "Codigo" + i);
        let Descripcion = document.createElement("label");
        Descripcion.setAttribute("Descripcion", "Descripcion" + i);
        let ValorUnitario = document.createElement("label");
        ValorUnitario.setAttribute("Descripcion", "ValorUnitario" + i);
        let Estado = document.createElement("label");
        Estado.setAttribute("Descripcion", "Estado" + i);

        Fila = document.createElement("tr");
        div = document.createElement("div")
        div.setAttribute("class", "form-Check")
        col1 = document.createElement("th");
        div.appendChild(Check)
        col1.appendChild(div);
        col2 = document.createElement("td");
        col2.appendChild(Descripcion);
        col3 = document.createElement("td");
        col3.appendChild(Codigo);
        col4 = document.createElement("td");
        col4.appendChild(Estado);
        col5 = document.createElement("td");
        col5.appendChild(ValorUnitario);
    
        Fila.appendChild(col1)
        Fila.appendChild(col2)
        Fila.appendChild(col3)
        Fila.appendChild(col4)
        Fila.appendChild(col5)
  
        dondeInsertar.appendChild(Fila)
   }
}




async function leerUsuarios() {
    try {
        const usuarios = []
        const respuesta = await dataBase.collection('ng_users').get()

        respuesta.forEach(function (item) {
            /* console.log(item.data()) */
            usuarios.push(item.data())
        })

        console.log(usuarios)
        return usuarios

    } catch (error) {
        console.log(error)
    }
}

async function guardarUsuario(usuario) {
    try {
        const respuesta = await dataBase.collection('ng_users').add(usuario)
        return respuesta

    } catch (error) {
        console.log(error)
    }
}

//evento
btnModificar.addEventListener('click', (e) => {
    e.preventDefault()
    traerProductos()
    pruebaTablaMostrarProductos()
})


  //borrar datos
/* const user = auth.currentUser;
let emailborrar = dataBase.collection('ng_users').where('email','==',user.email,'and','estado','==',true);
console.log(emailborrar);
emailborrar.get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
            doc.ref.delete();
    });
}); */
