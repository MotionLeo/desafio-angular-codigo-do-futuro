import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Loja } from 'src/app/models/loja';
import { LojaService } from 'src/app/servicos/loja.service';

@Component({
  selector: 'app-lista-lojas',
  templateUrl: './lista-lojas.component.html',
  styleUrls: ['./lista-lojas.component.css']
})
export class ListaLojasComponent implements OnInit {

  constructor(
    private router: Router,
    private lojaService: LojaService
  ) { }

  ngOnInit(): void {
    this.listaLojas();
  }

  public lojas: Loja[] | undefined= [];


  novaLoja(){
    this.router.navigateByUrl("/form-loja");
  }

  public async listaLojas(){
    this.lojas = await this.lojaService.lista();
  }

  
  async excluir(loja:Loja){
    if(confirm("Tem certeza que deseja excluir esta loja?")){
      await this.lojaService.excluirPorId(loja.id)
      this.lojas = await this.lojaService.lista()
    }
}
}
