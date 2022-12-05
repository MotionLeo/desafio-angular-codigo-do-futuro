import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pedido } from 'src/app/models/pedido';
import { Categoria } from 'src/app/models/categoria';
import { PedidoServico } from 'src/app/servicos/pedidoServico';
import { CategoriaServico } from 'src/app/servicos/categoriaServico';
import { PedidoProdutoServico } from 'src/app/servicos/pedidoProdutoServico';
import { ProdutoServico } from 'src/app/servicos/produtoServico';
import { PedidoProduto } from 'src/app/models/pedidoProduto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private http: HttpClient,
  ) { }

  //Variáveis de Serviço CRUD
  public pedidoServico: PedidoServico = {} as PedidoServico;
  public categoriaServico: CategoriaServico = {} as CategoriaServico;
  public pedidoProdutoServico: PedidoProdutoServico = {} as PedidoProdutoServico;
  public produtoServico: ProdutoServico = {} as ProdutoServico;

  //Arrays com dataBinding
  public pedidosSelecionados: Pedido[] = [];
  public categoriasMostradas: Categoria[]=[];
  
  //Arrays Filtrados
  public pedidosProdutosSelecionados:PedidoProduto[]=[]
  
  //Arrays com todos os valores
  private categorias: Categoria[]=[]
  private pedidos: Pedido[]=[]
  private pedidosProdutos: PedidoProduto[]=[]

  //Variáveis com dataBinding
  public categoriaSelecionado:String="";
  public dataInicial:String="";
  public dataFinal:String="";
  public valorTotal:String="";

  ngOnInit(): void {
    this.pedidoServico = new PedidoServico(this.http);
    this.categoriaServico = new CategoriaServico(this.http);
    this.pedidoProdutoServico = new PedidoProdutoServico(this.http);
    this.listaDePedidos();
    this.listaDeCategorias();
    this.listaDePedidosProdutos();
    this.getValor_Total();
  }

  private async listaDeCategorias(){
    let categorias = await this.categoriaServico.lista();
    categorias?.forEach(categoria=>{
      this.categorias.push(categoria);
    })
    this.categoriasMostradas=this.categorias;
  }

  private async listaDePedidosProdutos(){
    let pedidosProdutos = await this.pedidoProdutoServico.lista();
    pedidosProdutos?.forEach(pedidoProduto=>{
      this.pedidosProdutos.push(pedidoProduto);
    })
    console.log(this.pedidosProdutosSelecionados)
    this.pedidosProdutosSelecionados=this.pedidosProdutos
    //this.pedidosMostrados = this.pedidos?.reverse();
  }

  private async listaDePedidos(){
    let pedidos = await this.pedidoServico.lista();
    pedidos?.forEach(pedido=>{
      this.pedidos.push(pedido);
    })
    //this.pedidosMostrados = this.pedidos?.reverse();
  }

  private getValor_Total(){
    let total=0;
    this.pedidosProdutosSelecionados.forEach(pedidoProduto=>{
      total+=Number(pedidoProduto.valor)*Number(pedidoProduto.quantidade);
    })
    this.valorTotal=total.toString();
  }

  number (a : Number){
    return Number(a)
  }

}
