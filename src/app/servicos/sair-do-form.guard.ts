import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { FormClienteComponent } from '../pages/form-cliente/form-cliente.component';
import { FormComprarProdutoComponent } from '../pages/form-comprar-produto/form-comprar-produto.component';
import { FormProdutosComponent } from '../pages/form-produtos/form-produtos.component';

@Injectable({
  providedIn: 'root'
})
export class SairDoFormGuard implements CanDeactivate<[FormClienteComponent, FormProdutosComponent, FormComprarProdutoComponent]> {
  canDeactivate(
    component: [FormClienteComponent, FormProdutosComponent, FormComprarProdutoComponent],
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log(component[1]);
      if(component && component[1].produto?.nome)
        return confirm("Você possui dados preenchidos, deseja realmente sair?")
    
      return true;
  }
  
}
