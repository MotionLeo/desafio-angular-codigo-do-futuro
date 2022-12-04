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
import { Produto } from 'src/app/models/produto';
import { ChartType } from 'angular-google-charts';  
import { GoogleChartComponent } from 'angular-google-charts';  

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private http: HttpClient,
  ) {
  }

  //Dicionários

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
  public dataInicial:String="11/22/2022";
  public dataFinal:String="12/22/2022";
  public valorTotal:String="";
  public valorPositivo:String="";
  public valorNegativo:String="";

  //Gráficos
      titleColum="asd";
      columChart = ChartType.ColumnChart;
      dataColum: any[] =[
     [ "2010", 24, 20, 32, 18, 5],
     [ "2020", 22, 23, 30, 16, 9],
     [ "2030", 19, 29, 30, 12, 13]];
     columnsNames = ['Genre', 'Fantasy & Sci Fi', 'Romance', 'Mystery/Crime', 'General',
     'Western'];
      widthColum = 600;
      heightColum = 400;
      optionsColum = {
        width: 600,
        height: 400,
        legend: { position: 'top', maxLines: 3 },
        bar: { groupWidth: '75%' },
        isStacked: true,
      };
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

  private async listaDeCategorias(){
    let categorias = await this.categoriaServico.lista();
    categorias?.forEach(categoria=>{
      this.categorias.push(categoria);
    })
    this.categoriasMostradas=this.categorias;
  }
  private dataBr(data:Date):string{
    return data.getDate().toString()+"/"+data.getMonth().toString()+"/"+data.getFullYear().toString()
  }
  private gerarGraficoBarra(categoria:Number){
    let titleColum="Repartição de lucro por Produto em cada Categoria"
    let dataColum1=[]
    let dataColum2=[]
    let dataColum3=[]
    let columnsNames:any[]=["teste"]
    if(!(categoria.toString()==="0")) {
      titleColum="Repartição de lucro por produto em "+this.categoriasMostradas[Number(categoria)];
    }else{
      let val1=new Date(this.dataInicial.toString());
      console.log(val1)
      let val4=new Date(this.dataFinal.toString());
      let val2=new Date(val1.getTime()+(val4.getTime()-val1.getTime())/3);
      let val3=new Date(val1.getTime()+(val4.getTime()-val1.getTime())/3*2);
      dataColum1.push(`${this.dataBr(val1)}\n${this.dataBr(val2)}`)
      dataColum2.push(`${this.dataBr(val2)}\n${this.dataBr(val3)}`)
      dataColum3.push(`${this.dataBr(val3)}\n${this.dataBr(val4)}`)
      this.categorias.forEach(categoria=>{
        let dictProdutoTemp:Map<Number,boolean>=new Map()
        let categoria_id=categoria.id
        this.produtosSelecionados.forEach(produto=>{
            dictProdutoTemp.set(produto.id,produto.categoria_id.toString()===categoria_id.toString());
        })
        let lucro1=0;
        let lucro2=0;
        let lucro3=0;
        let dictPedidoTemp:Map<Number,Number>=new Map();
        this.pedidos.forEach(pedido=>{
          if(pedido.data>val1&&pedido.data<=val2) dictPedidoTemp.set(pedido.id,1)
          if(pedido.data>val2&&pedido.data<=val3) dictPedidoTemp.set(pedido.id,2)
          if(pedido.data>val3&&pedido.data<=val4) dictPedidoTemp.set(pedido.id,3)
        });
        this.pedidosProdutosSelecionados.forEach(pedidoProduto=>{
          if(dictPedidoTemp.get(pedidoProduto.pedido_id)&&dictProdutoTemp.get(pedidoProduto.produto_id)){
            if(dictPedidoTemp.get(pedidoProduto.pedido_id)?.toString()==="1"){
              lucro1+=Number(pedidoProduto.valor);
            }else
            if(dictPedidoTemp.get(pedidoProduto.pedido_id)?.toString()==="2"){
              lucro2+=Number(pedidoProduto.valor);
            }else{
              lucro3+=Number(pedidoProduto.valor);
            }
          }
        })
        dataColum1.push(lucro1)
        dataColum2.push(lucro2)
        dataColum3.push(lucro3)
        columnsNames.push(categoria.nome)
      })

    }
    let dataColum=[dataColum1,dataColum2,dataColum3]
    console.log(dataColum)
    this.dataColum=dataColum
    this.titleColum=titleColum
    console.log(columnsNames)
    this.columnsNames=columnsNames
  }

  private async listaDeProdutos(){
    let produtos = await this.produtoServico.lista();
    produtos?.forEach(produto=>{
      this.produtos.push(produto);
    })
    this.produtosSelecionados=this.produtos;
    this.gerarGraficoBarra(0);
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
    let dictProdutoSelecionado:Map<Number,boolean>=new Map();
    this.produtosSelecionados=this.produtosSelecionados.filter(produto=>{
      if(produto.categoria_id.toString()===categoria_id.toString()){
        dictProdutoSelecionado.set(produto.id,true)
        return true
      }
      dictProdutoSelecionado.set(produto.id,false)
      return false;
    })
    let dictPedidoProdutoSelecionado:Map<Number,boolean>=new Map();
    let dictPedidoSelecionado:Map<Number,boolean>=new Map();
    this.pedidosProdutosSelecionados=this.pedidosProdutosSelecionados.filter(pedidoProduto=>{
      let val=pedidoProduto.produto_id
      if(dictProdutoSelecionado.get(pedidoProduto.produto_id)){
        dictPedidoProdutoSelecionado.set(pedidoProduto.id,true)
        if(!dictPedidoSelecionado.get(pedidoProduto.pedido_id)) dictPedidoSelecionado.set(pedidoProduto.id,true)
        return true;
      }
      return false;
    })
    this.pedidosSelecionados=this.pedidosSelecionados.filter(pedido=>{
      if(dictPedidoSelecionado.get(pedido.id)) return true
      return false;
    })
  }

  verificaData():boolean{
    return true
  }

  number (a : Number){
    return Number(a)
  }
}
