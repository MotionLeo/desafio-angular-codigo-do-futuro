import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto } from 'src/app/models/produto';
import { ProdutoServico } from 'src/app/servicos/produtoServico';


@Component({
  selector: 'app-form-produtos',
  templateUrl: './form-produtos.component.html',
  styleUrls: ['./form-produtos.component.css']
})
export class FormProdutosComponent implements OnInit {

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
  }

  private async editaProduto(id:Number){
    this.tituloDoBotao = "Alterar";
    this.produto = await this.produtoServico.buscaPorId(id);
  }

  async registrar(){
    if(this.produto && this.produto.id > 0){
      await this.produtoServico.update(this.produto);
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
    let descricao:String = "";
    let valor:Number = 0;
    let qtd_estoque:Number = 0;

    if(this.produto?.nome) nome = this.produto.nome;
    if(this.produto?.descricao) descricao = this.produto.descricao;
    if(this.produto?.valor) valor = this.produto.valor;
    if(this.produto?.qtd_estoque) qtd_estoque = this.produto.qtd_estoque;

    let produto = {
      id: 0,
      nome: nome,
      descricao: descricao,
      valor: valor,
      qtd_estoque: qtd_estoque,
    }

    return produto
  }
}
