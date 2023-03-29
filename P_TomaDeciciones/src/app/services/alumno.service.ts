import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  ///////////////////////////////////////////////////
  /////// RUTA PARA CONECTAR LA API CON EL FRONT ////
  private urlAPI: string = 'https://api.reprobados.com/'; 

  /////////////////////////////////////////////////////////////////////
  /////// METODO PARA HACER UN REFRESH A LOS DATOS SI ES NECESARIO ////
  private _refresh$ = new Subject<void>();
  get refresh() {
    return this._refresh$;
  }

  constructor( private http: HttpClient ) { }

  loginAlumno( data: any ):Observable <any> {
    return this.http.post(this.urlAPI + "alumnos/login", data);
  }

  obtenerEncuestaAsignada( data: string ): Observable <any> {
    return this.http.get( this.urlAPI + "alumnos/encuesta/" + data );
  }

  obtenerEstadoEncuesta( data: any ): Observable <any> {
    return this.http.post( this.urlAPI + "alumnos/encuesta/status", data );
  }

  
  obtenerPerfil( data:string ) : Observable <any> {
    return this.http.get( this.urlAPI + "alumnos/perfil/" + data );
  }

  obtenerPreguntas( data:number ) : Observable <any> {
    return this.http.get( this.urlAPI + "alumnos/preguntas/" + data );
  }
  //FATAL: aqui estan haciendo un post para registrar los datos y nuevamente usan ese post como get ? hace que reviente el server
  //DONDE SE UTILIZA?!
  resultadoEncuesta( data:any, nro_cuenta: number ) : Observable <any> {
    return this.http.post( this.urlAPI + "resultados/" + nro_cuenta + "/inventario_de_felder", data, {responseType: 'text'} );
  }
}
