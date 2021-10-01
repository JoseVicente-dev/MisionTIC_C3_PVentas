console.log('hola')
// se crea input container el cual busca el elemento con el id="AquiVaLaFila"
let Id = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let Articulo = ['Cebada', 'Arroz Integral', 'Alforfón', 'Trigo', 'Mijo', 'Avena', 'Amaranto', 'Farro', 'Quínoa', 'Lenteja'];
let Cliente = ['Laura Acosta', 'Antonio Garcia', 'Isabel Sanchez', 'Manuel Gonzales', 'Antonia Rodriguez', 'Carlos Ruiz', 'Carmen Gomez', 'David Navarro', 'Rosario Lozano', 'Miguel Jimenez'];
let Valor = [10000, 2000, 30000, 4000, 15000, 6000, 17000, 8000, 19000, 10000];
let FechaVenta = ['1/01/2021', '2/01/2021', '3/02/2021', '4/02/2021', '5/04/2021', '6/05/2021', '7/06/2021', '8/06/2021', '9/08/2021', '10/09/2021'];
let FechaPago = ['1/01/2021', '2/01/2021', '-', '4/02/2021', '5/04/2021', '6/05/2021', '7/06/2021', '8/06/2021', '9/08/2021', '10/09/2021'];
let Vendedor = ['Juan Rulfo', 'Juan Rulfo', 'Juan Rulfo', 'Juan Rulfo', 'Juan Rulfo', 'Juan Rulfo', 'Juan Rulfo', 'Juan Rulfo', 'Juan Rulfo', 'Juan Rulfo'];
let Estado = ['Cancelada', 'Cancelada', 'Pendiente', 'Cancelada', 'Cancelada', 'Cancelada', 'Cancelada', 'Cancelada', 'Cancelada', 'Cancelada'];
var filasDB = Id.at(-1)+1;

console.log(filasDB)

function nuevaFila() {
     var dondeInsertar = document.getElementById("AquiVaLaFila");
     for (var i = 0; i < filasDB; i++) {
          var Check = document.createElement("input");
          Check.setAttribute("class", "form-check-input")
          Check.setAttribute("type", "radio");
          Check.setAttribute("name", "flexRadioDefault")
          Check.setAttribute("id", i);

          Check.setAttribute("onClick","MostrarBotones();InsertarDatosModalVentaBuscada(id)")
          var Id = document.createElement("label");
          Id.setAttribute("id", "Id" + i);
          var Articulo = document.createElement("label");
          Articulo.setAttribute("id", "Articulo" + i);
          var Cliente = document.createElement("label");
          Cliente.setAttribute("id", "Cliente" + i);
          var Valor = document.createElement("label");
          Valor.setAttribute("id", "Valor" + i);
          var FechaVenta = document.createElement("label");
          FechaVenta.setAttribute("id", "FechaVenta" + i);
          var FechaPago = document.createElement("label");
          FechaPago.setAttribute("id", "FechaPago" + i);
          var Vendedor = document.createElement("label");
          Vendedor.setAttribute("id", "Vendedor" + i);
          var Estado = document.createElement("label");
          Estado.setAttribute("id", "Estado" + i);
          Fila = document.createElement("tr");
          div = document.createElement("div")
          div.setAttribute("class", "form-check")
          col1 = document.createElement("th");
          div.appendChild(Check)
          col1.appendChild(div);
          col2 = document.createElement("td");
          col2.appendChild(Id);
          col3 = document.createElement("td");
          col3.appendChild(Articulo);
          col4 = document.createElement("td");
          col4.appendChild(Cliente);
          col5 = document.createElement("td");
          col5.appendChild(Valor);
          col6 = document.createElement("td");
          col6.appendChild(FechaVenta);
          col7 = document.createElement("td");
          col7.appendChild(FechaPago);
          col8 = document.createElement("td");
          col8.appendChild(Vendedor);
          col9 = document.createElement("td");
          col9.appendChild(Estado);
          Fila.appendChild(col1)
          Fila.appendChild(col2)
          Fila.appendChild(col3)
          Fila.appendChild(col4)
          Fila.appendChild(col5)
          Fila.appendChild(col6)
          Fila.appendChild(col7)
          Fila.appendChild(col8)
          Fila.appendChild(col9)
          dondeInsertar.appendChild(Fila)
     }
     console.log(filasDB)
}

function InsertarDatos() {


     for (var i = 0; i <= filasDB; i++) {
          const ColumnId = document.getElementById("Id" + i)
          const ColumnArticulo = document.getElementById("Articulo" + i)
          const ColumnCliente = document.getElementById("Cliente" + i)
          const ColumnValor = document.getElementById("Valor" + i)
          const ColumnFechaVenta = document.getElementById("FechaVenta" + i)
          const ColumnFechaPago = document.getElementById("FechaPago" + i)
          const ColumnVendedor = document.getElementById("Vendedor" + i)
          const ColumnEstado = document.getElementById("Estado" + i)

          ColumnId.textContent = Id[i]
          ColumnArticulo.textContent = Articulo[i]
          ColumnCliente.textContent = Cliente[i]
          ColumnValor.textContent = Valor[i]
          ColumnFechaVenta.textContent = FechaVenta[i]
          ColumnFechaPago.textContent = FechaPago[i]
          ColumnVendedor.textContent = Vendedor[i]
          ColumnEstado.textContent = Estado[i]


     }
}
