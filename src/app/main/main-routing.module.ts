import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormClienteComponent } from '../pages/form-cliente/form-cliente.component';
import { ListaClienteComponent } from '../pages/lista-cliente/lista-cliente.component';
import { LoginComponent } from '../pages/login/login.component';
import { LoginGuard } from '../servicos/login.guard';

const routes: Routes = [
  {path: '', component: ListaClienteComponent},
  {path: 'login', component: LoginComponent},
  {path: 'clientes', component: ListaClienteComponent, canActivate:[LoginGuard]},
  {path: 'form-clientes', component: FormClienteComponent},
  {path: 'form-clientes/:id', children: [
    {path: '', redirectTo: 'alterar', pathMatch: 'full'},
    {path: 'alterar', component: FormClienteComponent}
  ] 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
