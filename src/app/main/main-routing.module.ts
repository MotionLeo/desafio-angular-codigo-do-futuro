import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaClienteComponent } from '../pages/lista-cliente/lista-cliente.component';
import { LoginComponent } from '../pages/login/login.component';
import { LoginGuard } from '../servicos/login.guard';

const routes: Routes = [
  {path: 'clientes', component: ListaClienteComponent, canActivate:[LoginGuard]},
  {path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
