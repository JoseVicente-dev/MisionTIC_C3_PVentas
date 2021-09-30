function insertarFila() {

    let insertarFila = document.getElementById("cuerpoTablaProductos")
    
    // .getElementsByTagName("tbody")

    var i = insertarFila.getElementsByTagName("tr").length

    filaTabla = document.createElement("tr")
    seleccionar = document.createElement("th")

    div = document.createElement("div")
    div.setAttribute("class", "form-check")

    radio = document.createElement("input")
    radio.setAttribute("class", "form-check-input")
    radio.setAttribute("type", "radio")
    radio.setAttribute("name", "flexRadioDefault")
    radio.setAttribute("id", "flexRadioDefault" + i + 1)
    div.appendChild(radio)
    seleccionar.appendChild(div)

    filaTabla.appendChild(seleccionar)


    numeroProducto = document.createElement("th")
    numeroProducto.setAttribute("scope", "row")
    numeroProducto.textContent=i + 1

    codigo = document.createElement("td")
    codigo.textContent = document.getElementById("inputCodigo").value

    descripcion = document.createElement("td")
    descripcion.textContent = document.getElementById("inputDescripcion").value

    valorUnitario = document.createElement("td")
    valorUnitario.textContent=document.getElementById("inputValorUnitario").value

    estado = document.createElement("td")
    let e=document.getElementById("inputEstado")
    estado.textContent=e.options[e.selectedIndex].text


    filaTabla.appendChild(numeroProducto)
    filaTabla.appendChild(codigo)
    filaTabla.appendChild(descripcion)
    filaTabla.appendChild(valorUnitario)
    filaTabla.appendChild(estado)

    insertarFila.appendChild(filaTabla)









}