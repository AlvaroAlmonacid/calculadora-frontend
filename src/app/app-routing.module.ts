import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalculadoraComponent } from './calculadora/calculadora.component';

const routes: Routes = [
  {
    path: 'formatoResultado',
    component: CalculadoraComponent
  },
  {
    path: 'multiplicacion',
    component: CalculadoraComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
