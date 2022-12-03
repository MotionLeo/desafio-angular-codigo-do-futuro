import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pedido } from 'src/app/models/pedido';
import { PedidoServico } from 'src/app/servicos/pedidoServico';

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

  public pedidosServico: PedidoServico = {} as PedidoServico;
  public pedidos: Pedido[] | undefined = [];

  ngOnInit(): void {
    this.pedidosServico = new PedidoServico(this.http);
    this.listaDePedidos();
  }
  

  private async listaDePedidos(){
    this.pedidos = await this.pedidosServico.lista();
  }
  number (a : Number){
    return Number(a)
  }
}
