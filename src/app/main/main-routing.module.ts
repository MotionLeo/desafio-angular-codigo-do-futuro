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
import { ListaPedidosCompletaComponent } from '../pages/lista-pedidos-completa/lista-pedidos-completa.component';
import { ListaPedidosComponent } from '../pages/lista-pedidos/lista-pedidos.component';
import { FormComprarProdutoComponent } from '../pages/form-comprar-produto/form-comprar-produto.component';
import { SairDoFormGuard } from '../servicos/sair-do-form.guard';

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate:[LoginGuard]},
  {path: 'home', component: HomeComponent, canActivate:[LoginGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'pedidos', component:ListaPedidosComponent, canActivate:[LoginGuard]},
  {path: 'lista-completa', component:ListaPedidosCompletaComponent, canActivate:[LoginGuard]},
  {path: 'produtos', component: ProdutosComponent, canActivate:[LoginGuard]},
  {path: 'produtos/:id', component: FormComprarProdutoComponent, canActivate:[LoginGuard], children:[
    {path: '', redirectTo:'comprar', pathMatch: "full"},
    {path: 'comprar', component: FormComprarProdutoComponent}
  ]},
  {path: 'form-produto', component: FormProdutosComponent, canDeactivate:[SairDoFormGuard]},
  {path: 'form-produto/:id', children: [
    {path: '', redirectTo: 'alterar', pathMatch: 'full'},
    {path: 'alterar', component: FormProdutosComponent, canDeactivate:[SairDoFormGuard]}
  ] 
  },
  {path: 'carrinho',component: CarrinhoComponent, canActivate:[LoginGuard]},
  {path: 'clientes', component: ListaClienteComponent, canActivate:[LoginGuard]},
  {path: 'form-clientes', component: FormClienteComponent, canActivate:[LoginGuard], canDeactivate:[SairDoFormGuard]},
  {path: 'form-clientes/:id', canActivate:[LoginGuard], children: [
    {path: '', redirectTo: 'alterar', pathMatch: 'full'},
    {path: 'alterar', component: FormClienteComponent, canDeactivate:[SairDoFormGuard]}
  ] 
  },
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
