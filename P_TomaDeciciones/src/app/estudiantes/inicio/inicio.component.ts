import { Component, OnInit } from '@angular/core';
import { Lista } from './lista.model';
import { Chart } from 'chart.js';
import { AlumnoService } from 'src/app/services/alumno.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  Listas!: any[];
  estadoEncustas!: Array<any>;
  Description: string;

  public chart: any

  activo!:number;
  reflexivo!:number;
  sensorial!:number;
  intuitivo!:number;
  visual!:number;
  verbal!:number;
  secuencial!:number;
  global!:number;

  constructor( private servicio: AlumnoService, private route: Router ) {
    this.Description = 'Seleccione una encuesta para ver la descripcion';
  }

  OnClick(Des: any){
    this.Description = Des;
  }


  createChart() {

    this.chart = new Chart("MyChart", {
      type: 'radar',
      data: {
        labels: [ 'Activo', 'Sensorial', 'Visual', 'Secuencial', 'Reflexivo', 'Intuitivo', 'Verbal', 'Global' ],
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

  ngOnInit(): void {
    
    this.obtenerPerfilAlumno();
    this.createChart();
    this.estadoEncuesta();
    this.obtenerEncuestas();

  }

  obtenerEncuestas() {

    const id_grupo = JSON.parse(localStorage.getItem('info_alumno') || "{}")[0].id_grupo;
    this.servicio.obtenerEncuestaAsignada (
      id_grupo
    ).subscribe( (data) => {
      console.log(data);
      this.Listas = data;
    } )

  }

  obtenerPerfilAlumno() {

    this.servicio.obtenerPerfil( 
      JSON.parse(localStorage.getItem('info_alumno') || "{}")[0].nro_cuenta,
    ).subscribe ( (data) => {
      
      console.log(data);
      var element = document.getElementById('a1');

      if(data[0].activo_reflexivo[data[0].activo_reflexivo.length - 1] == "A") {
        this.activo = data[0].activo_reflexivo.slice(0, -1);
        this.reflexivo = 0;
        document.getElementById('a' + this.activo)!.innerHTML = "x";
      }
      else {
        this.reflexivo = data[0].activo_reflexivo.slice(0, -1);
        this.activo = 0;
        document.getElementById('r' + this.reflexivo)!.innerHTML = "x";
      }

      if(data[0].sensorial_intuitivo[data[0].sensorial_intuitivo.length - 1] == "A") {
        this.sensorial = data[0].sensorial_intuitivo.slice(0, -1);
        this.intuitivo = 0;
        document.getElementById('s' + this.sensorial)!.innerHTML = "x";
      }
      else {
        this.intuitivo = data[0].sensorial_intuitivo.slice(0, -1);
        this.secuencial = 0;
        document.getElementById('a' + this.intuitivo)!.innerHTML = "x";
      }

      if(data[0].visual_verbal[data[0].visual_verbal.length - 1] == "A") {
        this.visual = data[0].visual_verbal.slice(0, -1);
        this.verbal = 0;
        document.getElementById('v' + this.visual)!.innerHTML = "x";
      }
      else {
        this.verbal = data[0].visual_verbal.slice(0, -1);
        this.visual = 0;
        document.getElementById('ve' + this.verbal)!.innerHTML = "x";
      }

      if(data[0].secuencial_global[data[0].secuencial_global.length - 1] == "A") {
        this.secuencial = data[0].secuencial_global.slice(0, -1);
        this.global = 0;
        document.getElementById('se' + this.secuencial)!.innerHTML = "x";
      }
      else {
        this.global = data[0].secuencial_global.slice(0, -1);
        this.secuencial = 0;
        document.getElementById('g' + this.global)!.innerHTML = "x";
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

  estadoEncuesta() {
    this.servicio.obtenerEstadoEncuesta (
      {
        nro_cuenta: JSON.parse(localStorage.getItem('info_alumno') || "{}")[0].nro_cuenta,
        nombre_cuestionario: "inventario_de_felder"
      }
    ).subscribe ( (data) => {
      console.log(data);
      this.estadoEncustas = data; 
    },
    (error) => {
      
    } )
  }

  checkStatus( ) {
    return this.estadoEncustas?.some( x => x.nro_cuenta === JSON.parse(localStorage.getItem('info_alumno') || "{}")[0].nro_cuenta);

  }


  realizarEncuesta( id_cuestionario: number ) {
    this.route.navigate(['/Cuestionario/' + id_cuestionario]);
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
