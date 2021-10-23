import React, { useEffect, useState } from 'react'
import { HeaderNg } from './HeaderNg';
import { useHistory } from 'react-router';
import { consultarDocumentoWhere, usuarioActivo } from './../config/firebase';
import { MenuLateralNg } from '../components/MenuLateralNg';
import fotoUsuario from './../images/user2.png'
import { FooterComponent } from '../components/FooterComponent';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import '../css/contenido.css';

const DashBoard = () => {

  //let arrayProductos = []
  
  const [arrayProductos, setArrayProductos] = useState([])
  const [arrayVendedores, setArrayVendedores] = useState([])
  const [arrayVendedorVenta, setArrayVendedorVenta] = useState([])
  const [arrayVendedorVentaDetalle, setArrayVendedorVentaDetalle] = useState([])
  const [arrayVendedorProductoCantidad, setArrayVendedorProductoCantidad] = useState([])
  const [arrayVendedorProductoValor, setArrayVendedorProductoValor] = useState([])
  const [arrayVentaVendedores, setArrayVentaVendedores] = useState([])
  const [arrayVentaProductos, setArrayVentaProductos] = useState([])

  const history = useHistory()

  useEffect(() => {
    usuarioActivo == undefined ? history.push('/') : seriesVendedorVenta() && seriesProductos() && seriesVendedores()
  }, [])

  //--------------------------------------------------------------------------------------------
  //Para empezar a implementar series en los graficos--
  //--------------------------------------------------------------------------------------------
  
  //--------------------------------------------------------------------------------------------
  const seriesProductos = async () => {
    const listaTemporal = await consultarDocumentoWhere('ng_productos', 'descripcion', '')
    const respuesta = []
    listaTemporal.forEach((producto) => {
      respuesta.push(producto.descripcion)
    })
    setArrayProductos(respuesta)
    console.log("Productos: ", respuesta ) //Lista de prodcutos en consola.
    //console.log(arrayProductos);
  }
  //----------------------------------------------------------------------------------------------

  //----------------------------------------------------------------------------------------------
  const seriesVendedores = async () => {
    const listaTemporal = await consultarDocumentoWhere('ng_users', 'rol', '')//filtrar Vendedor
    const respuesta = []
    listaTemporal.forEach((vendedor) => {
      respuesta.push(vendedor.nombres)
    })
    setArrayVendedores(respuesta)
    console.log("Vendedores: ", respuesta ) //Lista de vendedores en consola.
    //console.log(arrayVendedores);
  }
  //-----------------------------------------------------------------------------------------------

  //-----------------------------------------------------------------------------------------------
  const seriesVendedorVenta = async () => {
    const listaTemporal = await consultarDocumentoWhere('ng_ventas', 'articulo', '')
    let k = 0
    const respuesta = []
    listaTemporal.forEach((vendedorVenta) => {
      const venta = {
        vendedor: vendedorVenta.vendedor,
        articulo: vendedorVenta.articulo,
        cantidad: vendedorVenta.cantidad,
        valor: vendedorVenta.valor
      }
      k = k + 1
      respuesta.push(venta)
      setArrayVendedorVenta(respuesta)
    })
    
    console.log(respuesta);
    //console.log (arrayVendedorVenta) 
  
  //-----------------------------------------------------------------------------------------------

  //-----------------------------------------------------------------------------------------------
    //sumatoria cantidades y valor por vendedor x articulo
    let respuesta2=[]
    for (let i = 0; i <= k - 1; i++) {
      let vendedor = respuesta[i].vendedor
      let cantidad = 0
      let valor = 0
      let articulo = respuesta[i].articulo
      for (let j = 0; j <= k - 1; j++) {
        if (respuesta[j].vendedor == vendedor && respuesta[j].articulo == articulo) {
          cantidad += parseInt(respuesta[j].cantidad)
          valor += parseInt(respuesta[j].valor)
        }
      }
      const venta = {vendedor, articulo, cantidad, valor, vendedorArticulo: vendedor + articulo }
      respuesta2.push(venta)
    }
    
    //eliminar ducplicados
    var hash = {};
    respuesta2 = respuesta2.filter(function (current) {
      var exists = !hash[current.vendedorArticulo];
      hash[current.vendedorArticulo] = true
      return exists
    });
    setArrayVendedorVentaDetalle(respuesta2)

    console.log("valor por vendedor x articulo", respuesta2);
    //console.log (arrayVendedorVentaDetalle) 
    //-------------------------------------------------------------------------------------------------

    //-------------------------------------------------------------------------------------------------
    //vendedor y cantidad
    let respuesta3=[]
    respuesta2.forEach((cantidad) => {
      const venta = {
        vendedor: cantidad.vendedor,
        articulo: cantidad.articulo,
        cantidad: cantidad.cantidad,
      }
      respuesta3.push(venta)
    })
    setArrayVendedorProductoCantidad(respuesta3)
    
    console.log("Productos vendidos x vendedor x cantidad: ", respuesta3);
    //console.log(arrayVendedorProductoCantidad);
    //------------------------------------------------------------------------------------------------------

    //------------------------------------------------------------------------------------------------------
    //vendededor y valor
    let respuesta4=[]
    respuesta2.forEach((valor) => {
      const venta = {
        vendedor: valor.vendedor,
        articulo: valor.articulo,
        valor: valor.valor,
      }
      respuesta4.push(venta)
    })
    setArrayVendedorProductoValor(respuesta4)
    
    console.log("Productos vendidos x vendedor x valor: ",respuesta3 );
    //console.log(arrayVendedorProductoValor);
    //--------------------------------------------------------------------------------------------------------

    //--------------------------------------------------------------------------------------------------------
    //ventas x vendedor
    let respuesta5=[]
    for (let i = 0; i <= k - 1; i++) {
        let vendedor = respuesta[i].vendedor
        let valor = 0
      for (let j = 0; j <= k - 1; j++) {
        if (respuesta[j].vendedor == vendedor) {
          valor += parseInt(respuesta[j].valor)
        }
      }
      const venta = {
        name: vendedor,
        y: parseInt(valor)
      }
      respuesta5.push(venta) 
    }
    
    //eliminar ducplicados
    var hash = {};
    respuesta5 = respuesta5.filter(function (current) {
      var exists = !hash[current.name];
      hash[current.name] = true
      return exists
    });
    setArrayVentaVendedores(respuesta5)
    console.log("ventas x Vendedor: ", respuesta5)
    //console.log("ventas x Vendedor: ", arrayVentaVendedores)

     //--------------------------------------------------------------------------------------------------------

    //--------------------------------------------------------------------------------------------------------
    //ventas x producto
    let respuesta6=[]
    for (let i = 0; i <= k - 1; i++) {
        let articulo = respuesta[i].articulo
        let valorP = 0
      for (let j = 0; j <= k - 1; j++) {
        if (respuesta[j].articulo == articulo) {
          valorP += parseInt(respuesta[j].valor)
        }
      }
      const venta = {
        name: articulo,
        y: parseInt(valorP)
      }
      respuesta6.push(venta) 
    }
    
    //eliminar ducplicados
    var hash = {};
    respuesta6 = respuesta6.filter(function (current) {
      var exists = !hash[current.name];
      hash[current.name] = true
      return exists
    });
    setArrayVentaProductos(respuesta6)
    console.log("ventas x Producto: ", respuesta6)
    //console.log("ventas x Vendedor: ", arrayVentaVendedores)

  }
  //--------------------------------------------------------------------------------------------

  const options = {
    chart: {type: 'column'},
    title: {text: 'Ventas x Producto'},
    subtitle: {text: 'Total en $$'},
    accessibility: {announceNewData: {enabled: true}},
    xAxis: { type: 'category'},
    yAxis: {title: {text: '$'}},
    legend: {enabled: false},
    plotOptions: {
      series: {
        borderWidth: 0,
        dataLabels: {
          enabled: true
          
        }
      }
    },
  
    tooltip: {
      headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
      pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>${point.y}</b>'
    },
  
    series: [
      {name: "Artículo",
        colorByPoint: true,
        data: arrayVentaProductos
      }
    ]
        
      
    }
  

  const options1 = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    title: { text: 'Ventas x vendedor' },
    subtitle: { text: 'Total de ventas $$' },
    tooltip: { pointFormat: '{series.name}: <b>${point.y}</b>' },
    accessibility: { point: { valueSuffix: '%' } },
    yAxis: { title: { text: '' } },
    plotOptions: {
      pie: {
        allowPointSelect: true, cursor: 'pointer', dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %'
        }
      }
    },
    series: [{
      name: 'Vendedores',
      colorByPoint: true,
      data: arrayVentaVendedores
    }]
  }
  

  const options2 = {
    chart: { type: 'column' },
    title: { text: 'Comparativo de ventas' },
    subtitle: { text: 'productos x vendedor' },
    xAxis: {
      categories: arrayProductos,
      crosshair: true
    },
    yAxis: { min: 0, title: { text: 'Ventas Brutas mensuales' } },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
      footerFormat: '</table>', shared: true, useHTML: true
    },

    plotOptions: { column: { pointPadding: 0.2, borderWidth: 0 } },
    series: [{
              name: 'Steven Tavera',
              data: [49.9, 71.5, 106.4, 129.2, 144.0]
              },
              {
              name: 'José Vicente Velasco López',
              data: [83.6, 78.8, 98.5, 93.4, 106.0]
              },
              {
              name: 'Gonzalo Sarmiento Castro',
              data: [48.9, 38.8, 39.3, 41.4, 47.0]
              },
              {
              name: 'Samuel jimenez',
              data: [42.4, 33.2, 34.5, 39.7, 52.6]
              },
              {
              name: 'FerboHi',
              data: [2.4, 63.2, 24.5, 49.7, 2.6]
            }]

  }


  return (
    <>
       <div className="contenedorFlex">
        <HeaderNg titulo='Dashboard' />
        <main>
          <div className="container">
            <div className="row">
              <div className="col-6">
                <div><HighchartsReact highcharts={Highcharts} options={options} /></div>
              </div>
              <div className="col-6">
                <div><HighchartsReact highcharts={Highcharts} options={options1} /></div>
              </div>
            </div>
            <div className="row mt-2">
              <div><HighchartsReact highcharts={Highcharts} options={options2} /></div>
            </div>
          </div>
          <br /><br /><br /><br /><br /><br />
        </main>
        <FooterComponent />
      </div>
      <MenuLateralNg usuario='nombre de Usuario' tipo='Administrador_Prueba' foto={fotoUsuario} />




    </>
  )
}

export default DashBoard
