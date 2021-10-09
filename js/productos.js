//Linkear Firebase

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

/* ---------------------------------------------------------------------------------------------- */
//Actiualizar Productos en la tabla
async function actualizar(){
    try{
        const productos = []
        const respuestaproductos = await dataBase.collection('ng_productos').orderBy("descripcion").get()


        respuestaproductos.forEach( function(item){
            /* console.log(item.data()) */
            productos.push(item.data())
 
        })


        pintarproductos(productos)

    }catch(error){
        console.log(error)
    }
}
/* ------------------------------------------------------------------------------------------------------- */
//pintarproductos
function pintarProductos(productos){

    var table = document.getElementById("tabla_productos");
   
    $("#tabla_productos").empty();

    productos.forEach((t)=>{
        var oRows = document.getElementById('tabla_productos').getElementsByTagName('tr');
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
        cell6.innerHTML = t.estado;
        
})
}