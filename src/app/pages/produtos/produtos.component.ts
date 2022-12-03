import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Produto } from 'src/app/models/produto';
import { ProdutoServico } from 'src/app/servicos/produtoServico';
import { CategoriaServico } from 'src/app/servicos/categoriaServico';
import { Carrinho } from 'src/app/servicos/carrinho';
@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

  constructor(
    private router: Router,
    private http: HttpClient,
  ) { }

  private produtoServico: ProdutoServico = {} as ProdutoServico
  public produtos: Produto[] | undefined = [];
  public nomesCategorias: String[] =[]

  ngOnInit(): void {
    this.produtoServico = new ProdutoServico(this.http);
    this.listaDeProdutos();
  }

  novoProduto(){
    this.router.navigateByUrl("/form-produtos");
  }

  private async listaDeProdutos(){
    let produtos = await this.produtoServico.lista();
    produtos?.forEach(async produto=>{
      this.nomesCategorias.push();
    })
    let i=0;
    produtos?.forEach(async produto=>{
      let categoria  = await new CategoriaServico(this.http).buscaPorId(produto.categoria_id);
      if(categoria?.nome) this.nomesCategorias[i]=categoria.nome
      i++
    })
    console.log(this.nomesCategorias);
    this.produtos=produtos;
  }

  async excluir(produto:Produto){
    if(confirm("Tem certeza que deseja excluir esse produto?")){
      await this.produtoServico.excluirPorId(produto.id)
      this.produtos = await this.produtoServico.lista()
    }
  }

  public comprar(produto:Produto){
    Carrinho.adicionaPedidoProduto(produto);
  }

  number(a : Number){
    return Number(a)
  }
}
