import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto } from 'src/app/models/produto';
import { ProdutoServico } from 'src/app/servicos/produto';


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

  registrar(){
    if(this.produto && this.produto.id > 0){
      this.produtoServico.update(this.produto)
    }
    else{
    this.produtoServico.criar({
      id: 0,
      nome: this.produto?.nome,
      descricao: this.produto?.descricao,
      valor: this.produto?.valor,
      qtd_estoque: this.produto?.qtd_estoque,
    })
    }
    this.router.navigateByUrl("/produtos");
  }
}
