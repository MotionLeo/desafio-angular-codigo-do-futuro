import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Pedido } from 'src/app/models/pedido';
import { Categoria } from 'src/app/models/categoria';
import { PedidoServico } from 'src/app/servicos/pedidoServico';
import { CategoriaServico } from 'src/app/servicos/categoriaServico';
import { PedidoProdutoServico } from 'src/app/servicos/pedidoProdutoServico';
import { ProdutoServico } from 'src/app/servicos/produtoServico';
import { PedidoProduto } from 'src/app/models/pedidoProduto';
import { Produto } from 'src/app/models/produto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnChanges {

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
  public categoriasMostradas: Categoria[]=[];
  
  //Arrays Filtrados
  public pedidosProdutosSelecionados:PedidoProduto[]=[]
  public produtosSelecionados: Produto[] = [];
  public pedidosSelecionados: Pedido[] = [];
  
  //Arrays com todos os valores
  private categorias: Categoria[]=[]
  private pedidos: Pedido[]=[]
  private pedidosProdutos: PedidoProduto[]=[]
  private produtos: Produto[]=[]

  //Variáveis com dataBinding
  public categoriaSelecionado:String="";
  public dataInicial:Date = new Date();
  public dataFinal:Date = new Date();
  public valorTotal:String="";
  public valorPositivo:String="";
  public valorNegativo:String="";

  ngOnInit(): void {
    this.pedidoServico = new PedidoServico(this.http);
    this.categoriaServico = new CategoriaServico(this.http);
    this.pedidoProdutoServico = new PedidoProdutoServico(this.http);
    this.produtoServico = new ProdutoServico(this.http);
    this.listaDePedidos();
    this.listaDeCategorias();
    this.listaDePedidosProdutos();
    this.listaDeProdutos();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.filtraData();
  }


  private async listaDeCategorias(){
    let categorias = await this.categoriaServico.lista();
    categorias?.forEach(categoria=>{
      this.categorias.push(categoria);
    })
    this.categoriasMostradas=this.categorias;
  }

  private async listaDeProdutos(){
    let produtos = await this.produtoServico.lista();
    produtos?.forEach(produto=>{
      this.produtos.push(produto);
    })
    this.produtosSelecionados=this.produtos;
  }

  private async listaDePedidosProdutos(){
    let pedidosProdutos = await this.pedidoProdutoServico.lista();
    pedidosProdutos?.forEach(pedidoProduto=>{
      this.pedidosProdutos.push(pedidoProduto);
    })
    this.pedidosProdutosSelecionados=this.pedidosProdutos
    console.log(this.pedidosProdutosSelecionados)
    this.getValor_Total();
  }

  private async listaDePedidos(){
    let pedidos = await this.pedidoServico.lista();
    pedidos?.forEach(pedido=>{
      this.pedidos.push(pedido);
    })
    //this.pedidosMostrados = this.pedidos?.reverse();
  }

  private getValor_Total(){
    let total=0,positivo=0,negativo=0;
    this.pedidosProdutosSelecionados.forEach(pedidoProduto=>{
      let val1=total;
      total+=Number(pedidoProduto.valor)*Number(pedidoProduto.quantidade);
      if(val1>total){
        negativo+=val1-total
      }else{
        positivo+=total-val1
      }
    })
    this.valorTotal=total.toString();
    this.valorPositivo=positivo.toString();
    this.valorNegativo=negativo.toString();
  }

  async atualizar(){
    if(!this.verificaData()) return;
    this.pedidosSelecionados=this.pedidos;
    this.pedidosProdutosSelecionados=this.pedidosProdutos;
    this.produtosSelecionados=this.produtos;
    let categoria=new Number(this.categoriaSelecionado.split("-")[0])
    if(!(categoria.toString()==="0")){
      this.filtrar(categoria);
    }
    this.getValor_Total();
  }

  filtrar(categoria_id:Number){
    this.produtosSelecionados=this.produtosSelecionados.filter(produto=>{
      return produto.categoria_id.toString()===categoria_id.toString();
    })
    this.pedidosProdutosSelecionados=this.pedidosProdutosSelecionados.filter(pedidoProduto=>{
      let val=pedidoProduto.produto_id
      for (let i = 0; i < this.produtosSelecionados.length; i++) {
        const produto = this.produtosSelecionados[i];
        if(val?.toString()===produto.id.toString()){
          return true
        }
      }
      return false;
    })
    this.pedidosSelecionados=this.pedidosSelecionados.filter(pedido=>{
      for (let i = 0; i < this.pedidosProdutosSelecionados.length; i++) {
        const pedidoProduto = this.pedidosProdutosSelecionados[i];
        if(pedido.id.toString()===pedidoProduto.pedido_id.toString()){
          return true
        }
      }
      return false;
    })
  }

  verificaData():boolean{
    return true
  }

  number (a : Number){
    return Number(a)
  }

  converteData(dataDDMMYY : String){
    const dataSplit = dataDDMMYY.split ("/");
    const novaData = new Date(parseInt(dataSplit[2], 10),
      parseInt(dataSplit[1], 10) - 1,
      parseInt(dataSplit[0], 10));
    return novaData
  }

  filtraData(){
    this.dataInicial = this.converteData(this.dataInicial.toString())
    this.dataFinal = this.converteData(this.dataInicial.toString());
    let datasFiltradas = this.pedidos.filter(result =>{
      return this.converteData(result.data.toString()) >= this.dataInicial && this.converteData(result.data.toString()) <= this.dataFinal;
    })
    console.log(datasFiltradas);
  }
}
