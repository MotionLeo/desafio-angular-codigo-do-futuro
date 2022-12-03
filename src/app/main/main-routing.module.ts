import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormProdutosComponent } from '../pages/form-produtos/form-produtos.component';
import { ProdutosComponent } from '../pages/produtos/produtos.component';
import { CarrinhoComponent } from '../pages/carrinho/carrinho.component';
import { FormClienteComponent } from '../pages/form-cliente/form-cliente.component';
import { HomeComponent } from '../pages/home/home.component';
import { ListaClienteComponent } from '../pages/lista-cliente/lista-cliente.component';
import { LoginComponent } from '../pages/login/login.component';
import { NotFoundComponent } from '../pages/navegacao/not-found/not-found.component';
import { LoginGuard } from '../servicos/login.guard';
import { ListaPedidosComponent } from '../pages/lista-pedidos/lista-pedidos.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'lista-completa', component:ListaPedidosComponent},
  {path: 'login', component: LoginComponent},
  {path: 'produtos', component: ProdutosComponent},
  {path: 'form-produto', component: FormProdutosComponent},
  {path: 'form-produto/:id', children: [
    {path: '', redirectTo: 'alterar', pathMatch: 'full'},
    {path: 'alterar', component: FormProdutosComponent}
  ] 
  },
  {path: 'carrinho',component: CarrinhoComponent, canActivate:[LoginGuard]},
  {path: 'clientes', component: ListaClienteComponent, canActivate:[LoginGuard]},
  {path: 'form-clientes', component: FormClienteComponent, canActivate:[LoginGuard]},
  {path: 'form-clientes/:id', canActivate:[LoginGuard], children: [
    {path: '', redirectTo: 'alterar', pathMatch: 'full'},
    {path: 'alterar', component: FormClienteComponent}
  ] 
  },
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
