import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PedidoProduto } from 'src/app/models/pedidoProduto';
import { Carrinho } from 'src/app/servicos/carrinho';
import { CarrinhoObserverService } from 'src/app/servicos/carrinho-observer.service';
import { PedidoProdutoServico } from 'src/app/servicos/pedidoProdutoServico';
import { ProdutoServico } from 'src/app/servicos/produtoServico';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {

  constructor(
    private http:HttpClient,
    private router:Router,
    private carrinhoObserverService: CarrinhoObserverService
  ) { }
  public items:  (PedidoProduto)[]=[];
  public nomes:String[]=[]
  ngOnInit(): void {
    this.produtoServico = new ProdutoServico(this.http);
    this.pedidoProdutoServico = new PedidoProdutoServico(this.http);
    this.listaItems();
  }
  private async listaItems() {
    this.items = Carrinho.listar();
    this.items?.forEach(async item =>{
      let nome = (await this.produtoServico.buscaPorId(item.produto_id))
      console.log("a")
      if(!nome){
        
      }else{
        this.nomes.push(nome?.nome);
      }
    });
  }
  public convert(id:Number):number{
    console.log(id);
    return Number(id);
  }

  public produtoServico:ProdutoServico= {} as ProdutoServico;
  public pedidoProdutoServico:PedidoProdutoServico= {} as PedidoProdutoServico;

  Excluir(id:number){
    Carrinho.excluirProduto(id);
    this.items?.splice(id,1)
  }

}
