import { Component } from '@angular/core';
import { TP5Service } from '../../services/tp-5.service';
import { Datos } from '../../module/datos';

@Component({
  selector: 'app-tp-5',
  templateUrl: './tp-5.component.html',
  styleUrl: './tp-5.component.css'
})
export class TP5Component {
  results: number[] = []
   values: Datos[] = []
  private mPresion = 0
  private mTemp = 0
  private mHumedad = 0
  private mViento = 0
  constructor(private service: TP5Service) { }
// al abrir la ventana
  ngOnInit() {
    this.service.get().subscribe(response => {
      this.values = response.data[0].valores
      this.media();
      let arrayPresion = this.values.map(element => element.presion)
      let arrayTemperatura = this.values.map(element => element.temperatura)
      let arrayHumedad = this.values.map(element => element.humedad )
      let arrayViento = this.values.map(element => element.viento)
      this.pearson(arrayPresion, arrayTemperatura, this.mPresion, this.mTemp, "0")
      this.pearson(arrayPresion, arrayHumedad, this.mPresion, this.mHumedad, "1" )
      this.pearson(arrayPresion, arrayViento, this.mPresion, this.mViento, "2")
      this.pearson(arrayTemperatura, arrayHumedad, this.mTemp, this.mHumedad, "3")
      this.pearson(arrayTemperatura, arrayViento, this.mTemp, this.mViento, "4")
      this.pearson(arrayHumedad, arrayViento, this.mHumedad, this.mViento, "5")
    })
  }
  media() {
    this.values.forEach(element => {
      this.mPresion += element.presion
      this.mTemp += element.temperatura
      this.mHumedad += element.humedad
      this.mViento += element.viento
    })
    this.mPresion = this.mPresion / this.values.length
    this.mTemp = this.mTemp / this.values.length
    this.mHumedad = this.mHumedad / this.values.length
    this.mViento = this.mViento / this.values.length

    console.log(this.values, "aca")
  }
  pearson(x2: number[], y2: number[], mediaX: number, mediaY: number, id:string) {

    let x = x2
    let y = y2
    let numerador = 0
    let sumatoriaX = 0
    let sumatoriay = 0
    let denominador = 0
    let resultado = 0
    this.values.forEach((_element, index) => {
      const  diferenciaX = x[index] - mediaX
      const diferenciaY= y[index] - mediaY
      sumatoriaX += (diferenciaX ** 2)  
      sumatoriay += (diferenciaY ** 2)
      numerador += diferenciaX * diferenciaY
    })
    let explicacion = document.getElementById(id)
    denominador = Math.sqrt(sumatoriaX * sumatoriay)
    resultado = numerador / denominador
    this.results.push(resultado)
    console.log(explicacion)
    console.log(resultado)
    if(resultado > 0 && explicacion != null )  explicacion.innerHTML = "Significa que hay una relación lineal positiva perfecta entre las dos variables. A medida que una variable aumenta, la otra también aumenta de manera proporcional. Todos los puntos de datos caerían en una línea recta con pendiente positiva en un gráfico de dispersión."
    else if(resultado === 0 && explicacion != null )  explicacion.innerHTML = "Significa que hay una relación lineal negativa perfecta entre las dos variables. A medida que una variable aumenta, la otra disminuye de manera proporcional. Todos los puntos de datos caerían en una línea recta con pendiente negativa en un gráfico de dispersión."
    else if(resultado < 0 && explicacion != null )  explicacion.innerHTML = "Significa que no hay ninguna relación lineal entre las dos variables. Los cambios en una variable no están asociados con cambios en la otra. Puede haber otro tipo de relación (por ejemplo, una relación no lineal), pero el coeficiente de Pearson solo detecta relaciones lineales."

  }

}
