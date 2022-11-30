import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarrinhoComponent } from '../pages/carrinho/carrinho.component';
import { ListaClienteComponent } from '../pages/lista-cliente/lista-cliente.component';
import { LoginComponent } from '../pages/login/login.component';

const routes: Routes = [
  {path: 'clientes', component: ListaClienteComponent},
  {path: 'login', component: LoginComponent},
  {path: 'carrinho',component: CarrinhoComponent},
  {path: '',component: CarrinhoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
