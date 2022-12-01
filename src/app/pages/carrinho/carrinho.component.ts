import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { PedidoProduto } from 'src/app/models/pedidoProduto';
import { Carrinho } from 'src/app/servicos/carrinho';
import { CarrinhoObserverService } from 'src/app/servicos/carrinho-observer.service';
import { ClienteServico } from 'src/app/servicos/clienteServico';
import { PedidoProdutoServico } from 'src/app/servicos/pedidoProdutoServico';
import { ProdutoServico } from 'src/app/servicos/produtoServico';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {

  public items:  (PedidoProduto)[]=[];
  public nomes:String[]=[]
  public clientes: (Cliente)[]=[];
  public produtoServico:ProdutoServico= {} as ProdutoServico;
  public pedidoProdutoServico:PedidoProdutoServico= {} as PedidoProdutoServico;
  public clienteServico:ClienteServico= {} as ClienteServico;
  public valor_total:Number=0;
  public cliente: String | undefined="";

  constructor(
    private http:HttpClient,
    private router:Router,
    private carrinhoObserverService: CarrinhoObserverService,
  ) { }
  
  ngOnInit(): void {
    this.produtoServico = new ProdutoServico(this.http);
    this.pedidoProdutoServico = new PedidoProdutoServico(this.http);
    this.clienteServico = new ClienteServico(this.http);
    this.listaItems();
    this.calcularValorTotal()
  }

  private async listaItems() {
    this.items = Carrinho.listar();
    let clientes= await this.clienteServico.lista();
    if(!clientes){
        
    }else{
      this.clientes= clientes
    }
    this.items?.forEach(async item =>{
      let nome = await this.produtoServico.buscaPorId(item.produto_id);
      if(!nome){
      }else{
        this.nomes.push(nome.nome);
      }
    });
  }

  public salvar() {
    Carrinho.setCliente_Id(new Number(this.cliente?.split("-")[0].split(" ")[0]));
    Carrinho.salvar(this.http);
    Carrinho.reset();
  }

  public convert(id:Number):number{
    console.log(id);
    return Number(id);
  }

  Excluir(id:number){
    Carrinho.excluirProduto(id);
    this.carrinhoObserverService.updateQuantidade();
    this.calcularValorTotal();
  }

  multiplicacao(a:Number,b:Number):number{
    return Number(a)*Number(b)
  }

  calcularValorTotal() {
    this.valor_total=Carrinho.getValor_Total();
  }

}


