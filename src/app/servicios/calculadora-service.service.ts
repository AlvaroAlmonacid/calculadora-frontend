import { Injectable } from '@angular/core';
import {Route, ActivatedRoute, Router} from '@angular/router';
import { HttpClient,HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs';

import { Resultado } from '../modelos/resultado';
import { ResultadoOut } from '../modelos/resultado-out';
import { Operacion } from '../modelos/operacion';


@Injectable({
  providedIn: 'root'
})
export class CalculadoraServiceService {

  endpointValidarFormato = 'http://localhost:3000/calculadora/validarFormato';
  endpointOperacion = 'http://localhost:3000/calculadora/';

  constructor(private http: HttpClient) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

    // Handle API errors
    handleError(error: HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        // Error del lado del cliente o error de red.
        console.error('Un error ocurrió:', error.error.message);
      } else {
        // El backend retornó un código de respuesta insatisfactorio.
        // El cuerpo de la respuesta puede indicar que sucedió.
        console.error(
          `Backend código de retorno ${error.status}, ` +
          `body: ${error.error}`);
      }
      // return mensaje de error user-facing
      return throwError(
        'Algo salió mal; por favor pruebe en un momento.');
    };

  postFormato(data: Resultado):Observable<ResultadoOut>{
    return this.http.post<any>(this.endpointValidarFormato, JSON.stringify(data),this.httpOptions).pipe(retry(2),catchError(this.handleError));
  }

  postMultiplicacion(data: Operacion):Observable<number>{
    return this.http.post<any>(this.endpointOperacion + 'multiplicarPost', JSON.stringify(data),this.httpOptions).pipe(retry(2),catchError(this.handleError));
  }

  postDivision(data: Operacion):Observable<number>{
    return this.http.post<any>(this.endpointOperacion + 'dividirPost', JSON.stringify(data),this.httpOptions).pipe(retry(2),catchError(this.handleError));
  }

  postSuma(data: Operacion):Observable<number>{
    return this.http.post<any>(this.endpointOperacion + 'sumarPost', JSON.stringify(data),this.httpOptions).pipe(retry(2),catchError(this.handleError));
  }  

  postResta(data: Operacion):Observable<number>{
    return this.http.post<any>(this.endpointOperacion + 'restarPost', JSON.stringify(data),this.httpOptions).pipe(retry(2),catchError(this.handleError));
  } 
}
