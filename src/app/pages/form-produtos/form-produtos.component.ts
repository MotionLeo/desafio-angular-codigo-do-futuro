import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto } from 'src/app/models/produto';
import { ProdutoServico } from 'src/app/servicos/produtoServico';
import { CategoriaServico } from 'src/app/servicos/categoriaServico';
import { Categoria } from 'src/app/models/categoria';


@Component({
  selector: 'app-form-produtos',
  templateUrl: './form-produtos.component.html',
  styleUrls: ['./form-produtos.component.css']
})
export class FormProdutosComponent implements OnInit {

  public categorias:Categoria[]=[];
  public selecionado:boolean[]=[]
  public categoria_id: Number=-1;
  public categoriaSelecionado:String ="";

  constructor(
    private router:Router,
    private http:HttpClient,
    private routerParams:ActivatedRoute 
  ) { }

  public tituloDoBotao:String = "Cadastrar";
  private produtoServico:ProdutoServico = {} as ProdutoServico
  public produto:Produto | undefined = {} as Produto;
  ngOnInit(): void {
    this.produtoServico = new ProdutoServico(this.http);
    let id:Number = this.routerParams.snapshot.params['id'];
    if(id){
      this.editaProduto(id);
    }
    this.listaCategorias();
  }
  
  private async listaCategorias(){
    let categorias=await new CategoriaServico(this.http).lista();
    categorias?.forEach(categoria => {
      if(this.produto?.categoria_id&&categoria.id.toString()===this.produto?.categoria_id.toString()){
        this.selecionado.push(true)
        
      }else{
        this.selecionado.push(false)
      }
      this.categorias.push(categoria);
    });
  }
  private async editaProduto(id:Number){
    this.tituloDoBotao = "Alterar";
    this.produto = await this.produtoServico.buscaPorId(id);
    if(this.produto?.id)this.categoria_id=this.produto.id;
    let categoria_id=this.produto?.categoria_id;
    if(categoria_id)this.categoria_id=categoria_id
  }

  async registrar(){
    if(this.categoriaSelecionado==""&&this.categoria_id==-1){
      return;
    }
    if(this.produto && this.produto.id > 0){
      await this.produtoServico.update(this.verificaUndefined());
    }
    else{
      // let nome:String = ""
      // let valor:Number = 0
      // if(this.produto?.nome) nome = this.produto.nome
      // if(this.produto?.valor) valor = this.produto.valor
      // let produto = {
      //   id: 0,
      //   nome: nome,
      //   descricao: this.produto?.descricao,
      //   valor: valor,
      //   qtd_estoque: this.produto?.qtd_estoque,
      // }
      if(!this.produto){}
      else{
        await this.produtoServico.criar(this.verificaUndefined());
      }
    }
    this.router.navigateByUrl("/produtos");
  }

  verificaUndefined(){
    let nome:String = "";
    let categoria_id=this.categoria_id
    let id:Number=0
    if(this.categoriaSelecionado.split("-")[0]!=""){
      categoria_id=new Number(this.categoriaSelecionado.split("-")[0])
    }
    console.log(categoria_id)
    let descricao:String = "";
    let valor:Number = 0;
    let qtd_estoque:Number = 0;
    let custo:Number = 0;


    if(this.produto?.id) id = this.produto.id;
    if(this.produto?.nome) nome = this.produto.nome;
    if(this.produto?.descricao) descricao = this.produto.descricao;
    if(this.produto?.valor) valor = this.produto.valor;
    if(this.produto?.qtd_estoque) qtd_estoque = this.produto.qtd_estoque;
    if(this.produto?.custo) custo = this.produto.custo;

    let produto = {
      id: id,
      categoria_id:categoria_id,
      nome: nome,
      descricao: descricao,
      valor: valor,
      qtd_estoque: qtd_estoque,
      custo:custo
    }

    return produto
  }

  number(n:String, i:number):number{
    
    return Number(n);
  }
}
