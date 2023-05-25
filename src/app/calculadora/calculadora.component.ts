import { Component, OnInit } from '@angular/core';
import {Route, ActivatedRoute, Router} from '@angular/router';
import { CalculadoraServiceService } from '../servicios/calculadora-service.service';
import { Resultado } from '../modelos/resultado';
import { ResultadoOut } from '../modelos/resultado-out';
import { Operacion } from '../modelos/operacion';

import { splitNsName } from '@angular/compiler';
import { delay } from 'rxjs';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.sass']
})

export class CalculadoraComponent {
  result: string = '';
  parteOperacion: string[] = [];
  posicion: number = -2;
  resultado: Resultado = {
    r:''};
  resultadoOut : ResultadoOut = {
    formato: false,
    operacion: ''
  }
  operacion: Operacion = {
    num1: 0,
    num2: 0
  }
  total: number = 0;
 
    constructor(
      public calculadora: CalculadoraServiceService,
      private router: Router
      ){

    }

    ngoninit(){
      
    }

  appendNumber(number: number) {
    this.result += number.toString();
  }

  appendOperator(operator: string) {
    this.result += operator;
  }

  calculate() {
    try {
      //this.result = eval(this.result);
      this.resultado.r = this.result;
      console.log("Resultado %s",this.resultado.r);
      this.calculadora.postFormato(this.resultado).subscribe(
        res => {
          console.log(res);
          this.resultadoOut = res;
          console.log('********');
          console.log(res);
          console.log(this.resultadoOut);
          console.log('********');          
          this.router.navigate(['/formatoResultado']);
        },

        err => console.log(err)
      );
      delay(2000);
      //console.log('RO');
      //console.log(this.resultadoOut);
      if (this.resultadoOut){
        switch(this.resultadoOut.operacion){
          case '*':
            console.log('*');
            this.parteOperacion = this.resultado.r.split('*');
            this.operacion.num1 = parseInt(this.parteOperacion[0]);
            this.operacion.num2 = parseInt(this.parteOperacion[1]);
            this.calculadora.postMultiplicacion(this.operacion).subscribe(
              res => {
                console.log(res);
                this.total = res;

                this.result = this.total.toString();
              },
              err => console.log(err)
            );           
            break;
            case '/':
              console.log('/');
              this.parteOperacion = this.resultado.r.split('/');
              this.operacion.num1 = parseInt(this.parteOperacion[0]);
              this.operacion.num2 = parseInt(this.parteOperacion[1]);
              this.calculadora.postDivision(this.operacion).subscribe(
                res => {
                  console.log(res);
                  this.total = res;

                  this.result = this.total.toString();
                },
                err => console.log(err)
              );           
              break; 
              case '+':
                console.log('+');
                this.parteOperacion = this.resultado.r.split('+');
                this.operacion.num1 = parseInt(this.parteOperacion[0]);
                this.operacion.num2 = parseInt(this.parteOperacion[1]);
                this.calculadora.postSuma(this.operacion).subscribe(
                  res => {
                    console.log(res);
                    this.total = res;

                    this.result = this.total.toString();
                  },
                  err => console.log(err)
                );           
                break;  
                case '-':
                  console.log('-');
                  this.parteOperacion = this.resultado.r.split('-');
                  this.operacion.num1 = parseInt(this.parteOperacion[0]);
                  this.operacion.num2 = parseInt(this.parteOperacion[1]);
                  this.calculadora.postResta(this.operacion).subscribe(
                    res => {
                      console.log(res);
                      this.total = res;

                      this.result = this.total.toString();
                    },
                    err => console.log(err)
                  );           
                  break;                                         
            default:
              console.log('Por defecto');
              break;
        }
      }
    } catch (e) {
      this.result = 'Error';
    }
  }

  clear() {
    this.result = '';
  }

}
