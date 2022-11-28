import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormClienteComponent } from '../pages/form-cliente/form-cliente.component';
import { ListaClienteComponent } from '../pages/lista-cliente/lista-cliente.component';

const routes: Routes = [
  {path: 'clientes', component: ListaClienteComponent},
  {path: 'form-clientes', component: FormClienteComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
