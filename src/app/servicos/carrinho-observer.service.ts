import { Injectable } from '@angular/core';
import { Carrinho } from './carrinho';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoObserverService {

  constructor() { 
    this.updateQuantidade();
  }
  public quantidade:Number=0;
  updateQuantidade(){
    console.log("--- Entrou no metodo ---")
    this.quantidade = Carrinho.buscaTamanho();
  }
}
