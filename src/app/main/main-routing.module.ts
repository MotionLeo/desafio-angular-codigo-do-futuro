import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormProdutosComponent } from '../pages/form-produtos/form-produtos.component';
import { ListaClienteComponent } from '../pages/lista-cliente/lista-cliente.component';
import { LoginComponent } from '../pages/login/login.component';
import { ProdutosComponent } from '../pages/produtos/produtos.component';

const routes: Routes = [
  {path: 'clientes', component: ListaClienteComponent},
  {path: 'login', component: LoginComponent},
  {path: 'produtos', component: ProdutosComponent},
  {path: 'form-produto', component: FormProdutosComponent},
  {path: 'form-produto/:id', children: [
    {path: '', redirectTo: 'alterar', pathMatch: 'full'},
    {path: 'alterar', component: FormProdutosComponent}
  ] 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
