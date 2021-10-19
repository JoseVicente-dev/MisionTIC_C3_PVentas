import React,{ useEffect} from 'react'
import { HeaderNg } from './HeaderNg';
import { useHistory } from 'react-router';
import { consultarDocumentoWhere, usuarioActivo } from './../config/firebase';


import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'


const DashBoard = () => {


    const history = useHistory()

    const sinAcceso = ()=>{
        alert('Por favor realizar LogIn con Gmail')
        history.push('/')
    }

    useEffect(() => {
        usuarioActivo == undefined  ?  sinAcceso() : seriesProductos()

    })


    //--------------------------------------------------------------------------------------------
    //Para empezar a implementar series en los graficos--
    //--------------------------------------------------------------------------------------------
    const arrayProductos = []
    const seriesProductos = async ()=>{
        const listaTemporal = await consultarDocumentoWhere('ng_productos','descripcion', '')
        /* console.log(listaTemporal); */
         
        
        setTimeout(() => {
            listaTemporal.forEach((producto)=>{
                /* console.log(producto.descripcion); */
                arrayProductos.push(producto.descripcion)
            })
            console.log (arrayProductos) //Lista de prodcutos en consola.
        }, 2000);
    }
    //--------------------------------------------------------------------------------------------

    const options = {
        chart: {
            type: 'line'
          },
          title: {
            text: 'Ventas Mensuales'
          },
          subtitle: {
            text: 'Cuadro de ventas Mensuales x Kg x Vendedor'
          },
          xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 
                        'Apr', 'May', 'Jun', 
                        'Jul', 'Aug', 'Sep', 
                        'Oct', 'Nov', 'Dec']
          },
          yAxis: {
            title: {
              text: 'Cantidad en Kg'
            }
          },
          plotOptions: {
            line: {
              dataLabels: {
                enabled: true
              },
              enableMouseTracking: false
            }
          },
          series: [{
            name: 'Vendedor 1',
            data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
          }, {
            name: 'Vendedor 2',
            data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
          }, {
            name: 'Vendedor 3',
            data: [2.9, 5.2, 7.7, 9.5, 1.9, 2.2, 7.0, 6.6, 1.2, 1.3, 10.6, 5.8]
          }]
      }

      const options1= {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
          },
          title: {
            text: 'Top de productos más vendidos'
          },
          subtitle: {
            text: 'Productos medidos en $$'
          },
          tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
          },
          accessibility: {
            point: {
              valueSuffix: '%'
            }
          },yAxis: {
            title: {
              text: ''
            }
          },
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %'
              }
            }
          },
          series: [{
            name: 'Productos',
            colorByPoint: true,
            data: [{
              name: 'producto 1',
              y: 61.41
            }, {
              name: 'producto 2',
              y: 11.84
            }, {
              name: 'producto 3',
              y: 10.85
            }, {
              name: 'producto 4',
              y: 4.67
            }, {
              name: 'producto 5',
              y: 4.18
            }, {
              name: 'producto 6',
              y: 1.64
            }, {
              name: 'producto 7',
              y: 1.6
            }, {
              name: 'producto 8',
              y: 1.2
            }, {
              name: 'Other',
              y: 2.61
            }]
          }]
      }

      const options2={
        chart: {
            type: 'column'
          },
          title: {
            text: 'Comparativo de ventas'
          },
          subtitle: {
            text: 'Vendedores Activos'
          },
          xAxis: {
            categories: [
              'Jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Oct',
              'Nov',
              'Dec'
            ],
            crosshair: true
          },
          yAxis: {
            min: 0,
            title: {
              text: 'Ventas Brutas mensuales'
            }
          },
          tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
              '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
          },
          plotOptions: {
            column: {
              pointPadding: 0.2,
              borderWidth: 0
            }
          },
          series: [{
            name: 'Vendedor 1',
            data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
        
          }, {
            name: 'Vendedor 2',
            data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]
        
          }, {
            name: 'Vendedor 3',
            data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]
        
          }, {
            name: 'Vendedor 4',
            data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]
        
          }]
      }

    return (
        <>
           <HeaderNg titulo='Dashboard'/> 
           
           <div className="container">
               <div className="row">
                   <div className="col-6">
                        <div>
                            <HighchartsReact
                                highcharts={Highcharts}
                                options={options}
                            />
                        </div>
                   </div>
                   <div className="col-6"> 
                        <div>
                            <HighchartsReact
                                highcharts={Highcharts}
                                options={options1}
                            />
                        </div>
                   </div>
               </div>
               <div className="row mt-2">
                    <div>
                        <HighchartsReact
                            highcharts={Highcharts} 
                            options={options2}
                        />
                    </div>
               </div>
           </div>
           
        </>
    )
}

export default DashBoard
