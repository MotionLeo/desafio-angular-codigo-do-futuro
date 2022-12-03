import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Produto } from 'src/app/models/produto';
import { ProdutoServico } from 'src/app/servicos/produtoServico';

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

  ngOnInit(): void {
    this.produtoServico = new ProdutoServico(this.http);
    this.listaDeProdutos();
  }

  novoProduto(){
    this.router.navigateByUrl("/form-produtos");
  }

  private async listaDeProdutos(){
    this.produtos = await this.produtoServico.lista();
  }

  async excluir(produto:Produto){
    if(confirm("Tem certeza que deseja excluir esse produto?")){
      await this.produtoServico.excluirPorId(produto.id)
      this.produtos = await this.produtoServico.lista()
    }
  }

  number(a : Number){
    return Number(a)
  }
}
