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
import { ChartType } from 'angular-google-charts';  
import { GoogleChartComponent } from 'angular-google-charts';  
import { compileFactoryFunction } from '@angular/compiler';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnChanges {

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
  public dataInicial:String = "01/01/2022";
  public dataFinal:String = String(new Date(Date.now()));
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
      
      titleArea="asd"
      areaChart= ChartType.AreaChart;
      dataArea:any[]=[]
      optionsArea={
        width: 600,
        height: 400,
        title: 'Company Performance',
        hAxis: {titleTextStyle: {color: '#333'}},
        vAxis: {title:"Faturamento",minValue: 0}
      }

      titleHist="title"
      histChart=ChartType.Histogram
      dataHist= [
      [2/3, -1, 0, 0],
      [2/3, -1, 0, null],
      [2/3, -1, 0, null],
      [-1/3, 0, 1, null],
      [-1/3, 0, -1, null],
      [-1/3, 0, null, null],
      [-1/3, 0, null, null]
    ]
    columnsNamesHist=['Quarks', 'Leptons', 'Gauge Bosons', 'Scalar Bosons']
      optionsHist={
        width: 600,
        height: 400,
        title: 'Charges of subatomic particles',
        legend: { position: 'top', maxLines: 2 },
        colors: ['#5C3292', '#1A8763', '#871B47', '#999999'],
        interpolateNulls: false,
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
  private dataBr(data:Date):string{
    return data.getDate().toString()+"/"+(data.getMonth()+1).toString()+"/"+data.getFullYear().toString()
  }
  private gerarGraficoBarra(categoria:Number){
    let titleColum="Repartição de lucro por Produto em cada Categoria"
    let dataColum1=[]
    let dataColum2=[]
    let dataColum3=[]
    let dataHist=[]
    let columnsNames:any[]=["teste"]
    let val1=this.corrigirInicial(this.dataInicial);
    let val4=this.aumentar(this.dataFinal);
    let val2=new Date(val1.getTime()+(val4.getTime()-val1.getTime())/3);
    let val3=new Date(val1.getTime()+(val4.getTime()-val1.getTime())/3*2);
    dataColum1.push(`${this.dataBr(val1)}\n${this.dataBr(val2)}`)
    dataColum2.push(`${this.dataBr(val2)}\n${this.dataBr(val3)}`)
    dataColum3.push(`${this.dataBr(val3)}\n${this.dataBr(val4)}`)
    let dataArea1:any[]=[`${this.dataBr(val3)}\n${this.dataBr(val4)}`]
    let dataArea2:any[]=[`${this.dataBr(val2)}\n${this.dataBr(val3)}`]
    let dataArea3:any[]=[`${this.dataBr(val1)}\n${this.dataBr(val2)}`]
    let dictPedidoTemp:Map<Number,Number>=new Map();
    this.pedidos.forEach(pedido=>{
      let datar =new Date(pedido.data.toString())
      if(datar>val1&&datar<=val2) dictPedidoTemp.set(pedido.id,1)
      if(datar>val2&&datar<=val3) dictPedidoTemp.set(pedido.id,2)
      if(datar>val3&&datar<=val4) dictPedidoTemp.set(pedido.id,3)
    });
    if(!(categoria.toString()==="0")) {
      titleColum="Repartição de lucro por produto em "+this.categoriasMostradas[Number(categoria)];
      let quantidades=0
      this.produtosSelecionados.forEach(produto=>{
        let id_produto=produto.id;
        let lucro1=0;
        let lucro2=0;
        let lucro3=0;
        this.pedidosProdutos.forEach(pedidoProduto=>{
          if(dictPedidoTemp.get(pedidoProduto.pedido_id)&&pedidoProduto.produto_id.toString()===id_produto.toString()){
            if(dictPedidoTemp.get(pedidoProduto.pedido_id)?.toString()==="1"){
              lucro1+=Number(pedidoProduto.valor)*Number(pedidoProduto.quantidade);
            }else
            if(dictPedidoTemp.get(pedidoProduto.pedido_id)?.toString()==="2"){
              lucro2+=Number(pedidoProduto.valor)*Number(pedidoProduto.quantidade);
            }else{
              lucro3+=Number(pedidoProduto.valor)*Number(pedidoProduto.quantidade);
            }
            quantidades+=Number(pedidoProduto.quantidade);
          }
      })
      dataHist.push([produto.nome,quantidades])
      dataColum1.push(lucro1)
      dataColum2.push(lucro2)
      dataColum3.push(lucro3)
      columnsNames.push(produto.nome)
    })
    }else{
      this.categorias.forEach(categoria=>{
        let dictProdutoTemp:Map<Number,boolean>=new Map()
        let categoria_id=categoria.id
        this.produtosSelecionados.forEach(produto=>{
            dictProdutoTemp.set(produto.id,produto.categoria_id.toString()===categoria_id.toString());
        })
        let lucro1=0;
        let lucro2=0;
        let lucro3=0;
        let quantidades=0
        this.pedidosProdutos.forEach(pedidoProduto=>{
          if(dictPedidoTemp.get(pedidoProduto.pedido_id)&&dictProdutoTemp.get(pedidoProduto.produto_id)){
            if(dictPedidoTemp.get(pedidoProduto.pedido_id)?.toString()==="1"){
              lucro1+=Number(pedidoProduto.valor)*Number(pedidoProduto.quantidade);
            }else
            if(dictPedidoTemp.get(pedidoProduto.pedido_id)?.toString()==="2"){
              lucro2+=Number(pedidoProduto.valor)*Number(pedidoProduto.quantidade);
            }else{
              lucro3+=Number(pedidoProduto.valor)*Number(pedidoProduto.quantidade);
            }
            quantidades+=Number(pedidoProduto.quantidade)
          }
        })
        dataColum1.push(lucro1)
        dataColum2.push(lucro2)
        dataColum3.push(lucro3)
        columnsNames.push(categoria.nome)
        dataHist.push([categoria.nome,])
      })

    }
    let dataColum=[dataColum1,dataColum2,dataColum3]
    this.dataColum=dataColum
    this.titleColum=titleColum
    this.columnsNames=columnsNames
  }
  private getStringArea(dataIni:Date,dataFim:Date,atual:Date):string{
    var meses = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];
    let diferenca=parseInt(((dataFim.getTime()-dataIni.getTime())/1000/24/3600).toString())
    if(diferenca<21)
      return `${atual.getDate()}/${atual.getMonth()+1}/${atual.getFullYear()}`
    if(diferenca<700){
      let semana=0;
      if(atual.getDate()<7){
        semana=1
      }else if(atual.getDate()<14){
        semana=2
      }else if(atual.getDate()<21){
        semana=3
      }else if(atual.getDate()<28){
        semana=4
      }else{  
        semana=5
      }
      return `Sem ${semana} /${meses[atual.getMonth()+1]}`;
    }if(diferenca<3650){
      return `${meses[atual.getMonth()+1]}/${atual.getFullYear()}`
    }
    return `${atual.getFullYear()}`
  }

  private gerarGraficoArea(categoria:Number){
    let dataInicial=this.corrigirInicial(this.dataInicial);
    let dataFinal=this.aumentar(this.dataFinal);
    let dataArea:any[]=[]
    let title=""
    let datas:any[]=[dataInicial]
    let diferenca=dataFinal.getTime()-dataInicial.getTime()
    let layers=this.categorias.length
    if(!(categoria.toString()==="0")){
      layers=this.produtosSelecionados.length
    }
    
    let dictPedidoTemp:Map<Number,Number>=new Map();
    for (let i = 0; i < 20; i++) {
      datas.push(new Date(datas[i].getTime()+diferenca/20))
      dataArea.push([this.getStringArea(dataInicial,dataFinal,new Date(datas[i].getTime()+diferenca/20))])
      for (let j = 0; j < layers; j++) {
        dataArea[i].push(0)
      }
    }
    this.pedidos.forEach(pedido=>{
      let datar =new Date(pedido.data.toString())
      for (let i = 0; i < 20; i++) {
        if(datar>datas[i]&&datar<=datas[i+1])dictPedidoTemp.set(pedido.id,i)
      }
    });
    console.log("Pedidos ", dictPedidoTemp)
    if(!(categoria.toString()==="0")) {
      title="Repartição de lucro por produto em "+this.categoriasMostradas[Number(categoria)];
      let cont=0
      this.produtosSelecionados.forEach(produto=>{
        cont++
        let id_produto=produto.id;
        this.pedidosProdutos.forEach(pedidoProduto=>{
          let id=dictPedidoTemp.get(pedidoProduto.pedido_id)
          if(id&&pedidoProduto.produto_id.toString()===id_produto.toString()){
            dataArea[Number(id)][cont]+=Number(pedidoProduto.valor)*Number(pedidoProduto.quantidade)
          }
      })
    })
    }else{
      let cont=0
      this.categorias.forEach(categoria=>{
        cont++
        let dictProdutoTemp:Map<Number,boolean>=new Map()
        let categoria_id=categoria.id
        this.produtosSelecionados.forEach(produto=>{
            dictProdutoTemp.set(produto.id,produto.categoria_id.toString()===categoria_id.toString());
        })
        this.pedidosProdutos.forEach(pedidoProduto=>{
          let id=dictPedidoTemp.get(pedidoProduto.pedido_id)
          if(id&&dictProdutoTemp.get(pedidoProduto.produto_id)){
            dataArea[Number(id)][cont]+=Number(pedidoProduto.valor)*Number(pedidoProduto.quantidade)
          }
        })
      })

    }
    for (let i = 1; i < dataArea.length; i++) {
      for (let j = 1; j < dataArea[i].length; j++) {
        dataArea[i][j]+=dataArea[i-1][j];
      }
    }
    console.log(dataArea)
    this.dataArea=dataArea
    this.titleArea=title
  }

  private async listaDeProdutos(){
    let produtos = await this.produtoServico.lista();
    produtos?.forEach(produto=>{
      this.produtos.push(produto);
    })
    this.produtosSelecionados=this.produtos;
    this.gerarGraficoBarra(0);
    this.gerarGraficoArea(0);
  }

  private async listaDePedidosProdutos(){
    let pedidosProdutos = await this.pedidoProdutoServico.lista();
    pedidosProdutos?.forEach(pedidoProduto=>{
      this.pedidosProdutos.push(pedidoProduto);
    })
    this.pedidosProdutosSelecionados=this.pedidosProdutos
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
    this.pedidosSelecionados=this.pedidos;
    this.pedidosProdutosSelecionados=this.pedidosProdutos;
    this.produtosSelecionados=this.produtos;
    let categoria=new Number(this.categoriaSelecionado.split("-")[0])
    let dictPedidoSelecionado = this.filtraData();
    let dictProdutoSelecionado = this.filtrarProduto(categoria)
    let dictPedidoTemp:Map<Number,boolean> = new Map();
    let save=this.pedidosProdutosSelecionados.filter(pedidoProduto=>{
      let val=false
      if(dictPedidoSelecionado.get(pedidoProduto.pedido_id)){
        if(dictProdutoSelecionado.get(pedidoProduto.produto_id)){
          val=true
        }
      }
      if(!dictPedidoTemp.get(pedidoProduto.pedido_id))dictPedidoTemp.set(pedidoProduto.pedido_id,val)
      return val;
    })
    this.pedidosProdutosSelecionados=save
    this.pedidosSelecionados=this.pedidosSelecionados.filter(pedido=>{
      if(dictPedidoSelecionado.get(pedido.id)) return true
      return false;
    })
    this.getValor_Total();
    this.gerarGraficoBarra(categoria);
    this.gerarGraficoArea(categoria);
  }

  filtrarProduto(categoria_id:Number):Map<Number,boolean>{
    let dictProdutoSelecionado:Map<Number,boolean>=new Map();
    if(categoria_id.toString()==="0"){
      this.produtosSelecionados.forEach(produto=>{
        dictProdutoSelecionado.set(produto.id,true);
      })
      return dictProdutoSelecionado
    }
    this.produtosSelecionados=this.produtosSelecionados.filter(produto=>{
      if(produto.categoria_id.toString()===categoria_id.toString()){
        dictProdutoSelecionado.set(produto.id,true)
        return true
      }
      dictProdutoSelecionado.set(produto.id,false)
      return false;
    })
    return dictProdutoSelecionado;
  }

  number (a : Number){
    return Number(a)
  }


  filtraData():Map<Number,boolean>{
    let dictPedidoSelecionado:Map<Number,boolean>=new Map();
    this.pedidosSelecionados = this.pedidos.filter(result =>{
      let val=this.corrigirInicial(this.dataInicial) < new Date(result.data.toString()) && this.aumentar(this.dataFinal) > new Date(result.data.toString())
      dictPedidoSelecionado.set(result.id,val)
      return val
    })
    return dictPedidoSelecionado
  }
  corrigirInicial(data:String):Date{
    let val = (new Date(String(data))).getTime()+10800000-1;
    return new Date(val)
  }
  aumentar(data:String):Date{
    let val = (new Date(String(data))).getTime()+86399999+10800000;
    return new Date(val)
  }
}


