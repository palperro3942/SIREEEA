import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { AlumnoService } from 'src/app/services/alumno.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit {

public chart: any

  activo!:number;
  reflexivo!:number;
  sensorial!:number;
  intuitivo!:number;
  visual!:number;
  verbal!:number;
  secuencial!:number;
  global!:number;

  constructor( private servicio: AlumnoService ) { }

  ngOnInit(): void {

    this.createChart();
    this.obtenerPerfilAlumno();

  }

  createChart() {

    this.chart = new Chart("MyChart", {
      type: 'radar',
      data: {
        labels: [ 'Activo', 'Sensorial', 'Visual', 'Secuencial', 'Reflexico', 'Intuitivo', 'Verbal', 'Gobal' ],
        datasets: [
          {
            label: 'Tu Perfil',
            data: [],
            backgroundColor: 'rgba(46, 155, 236, 0.5)',
            borderColor: 'rgba(30, 36, 64, 0.6)',
            borderWidth: 1,
            pointBackgroundColor: '#2E9BEC'
          }
        ]
      } 
    })

  }

  obtenerPerfilAlumno() {

    this.servicio.obtenerPerfil( 
      JSON.parse(localStorage.getItem('info_alumno') || "{}")[0].nro_cuenta,
    ).subscribe ( (data) => {

      console.log(data[0].secuencial_global.slice(0, -1));

      if(data[0].activo_reflexivo[data[0].activo_reflexivo.length - 1] == "A") {
        this.activo = data[0].activo_reflexivo.slice(0, -1);
        this.reflexivo = 0;
        document.getElementById('a' + this.activo)!.innerHTML = "x";
        document.getElementById('Estilo1')!.innerHTML = "Activo";
        document.getElementById('Info1')!.innerHTML = "Es el estilo propio de las personas que tienden a participar o a involucrarse en las experiencias.";
      }
      else {
        this.reflexivo = data[0].activo_reflexivo.slice(0, -1);
        this.activo = 0;
        document.getElementById('r' + this.reflexivo)!.innerHTML = "x";
        document.getElementById('Estilo1')!.innerHTML = "Reflexivo";
        document.getElementById('Info1')!.innerHTML = "Es la forma de aprendizaje propia de las personas con tendencia a la introspección y a la observación.";

      }

      if(data[0].sensorial_intuitivo[data[0].sensorial_intuitivo.length - 1] == "A") {
        this.sensorial = data[0].sensorial_intuitivo.slice(0, -1);
        this.intuitivo = 0;
        document.getElementById('s' + this.sensorial)!.innerHTML = "x";
        document.getElementById('Estilo2')!.innerHTML = "Sensorial";
        document.getElementById('Info2')!.innerHTML = "Es la forma de aprender característica de aquellos que prefieren las actividades prácticas.";

      }
      else {
        this.intuitivo = data[0].sensorial_intuitivo.slice(0, -1);
        this.sensorial = 0;
        document.getElementById('a' + this.intuitivo)!.innerHTML = "x";
        document.getElementById('Estilo2')!.innerHTML = "Intuitivo";
        document.getElementById('Info2')!.innerHTML = "Implica el descubrimiento de nueva información por medios propios.";

      }

      if(data[0].visual_verbal[data[0].visual_verbal.length - 1] == "A") {
        this.visual = data[0].visual_verbal.slice(0, -1);
        this.verbal = 0;
        document.getElementById('v' + this.visual)!.innerHTML = "x";
        document.getElementById('Estilo3')!.innerHTML = "Visual";
        document.getElementById('Info3')!.innerHTML = "La información se obtiene a partir de imágenes (fotos, videos, diagramas, etc).";

      }
      else {
        this.verbal = data[0].visual_verbal.slice(0, -1);
        this.visual = 0;
        document.getElementById('ve' + this.verbal)!.innerHTML = "x";
        document.getElementById('Estilo3')!.innerHTML = "Verbal";
        document.getElementById('Info3')!.innerHTML = "En este caso, la información es asimilada de forma oral o escrita.";

      }

      if(data[0].secuencial_global[data[0].secuencial_global.length - 1] == "A") {
        this.secuencial = data[0].secuencial_global.slice(0, -1);
        this.global = 0;
        document.getElementById('se' + this.secuencial)!.innerHTML = "x";
        document.getElementById('Estilo4')!.innerHTML = "Secuencial";
        document.getElementById('Info4')!.innerHTML = "Es una forma de aprender propia de quienes necesitan concatenar datos relacionados entre sí.";

      }
      else {
        this.global = data[0].secuencial_global.slice(0, -1);
        this.secuencial = 0;
        document.getElementById('g' + this.global)!.innerHTML = "x";
        document.getElementById('Estilo4')!.innerHTML = "Global";
        document.getElementById('Info4')!.innerHTML = "Pueden ver la información de manera holística, por lo que les resulta más sencillo integrar datos para sacar conclusiones.";

      }

      this.chart.data.datasets.forEach((dataset:any) => {
        dataset.data.push(this.activo);
        dataset.data.push(this.sensorial);
        dataset.data.push(this.visual);
        dataset.data.push(this.secuencial);
        dataset.data.push(this.reflexivo);
        dataset.data.push(this.intuitivo);
        dataset.data.push(this.verbal);
        dataset.data.push(this.global);
      });

      console.log(this.chart.data);

      this.chart.update();

    } )

  }

  cambiasGrafica( event: any ) {
    event.target.classList.add('active');
    var element = document.getElementById('Tabla');
    element?.classList.remove('active');

    var grafic = document.getElementsByClassName('info_grafic')[0];
    grafic?.classList.remove('activePreview');
    var table = document.getElementsByClassName('info_table')[0];
    table?.classList.add('activePreview');
  }

  cambiasTabla( event:any) {
    console.log("entro");
    event.target.classList.add("active");
    var element = document.getElementById('Grafica');
    element?.classList.remove('active');

    var grafic = document.getElementsByClassName('info_grafic')[0];
    grafic?.classList.add('activePreview');
    var table = document.getElementsByClassName('info_table')[0];
    table?.classList.remove('activePreview');
  }


}
