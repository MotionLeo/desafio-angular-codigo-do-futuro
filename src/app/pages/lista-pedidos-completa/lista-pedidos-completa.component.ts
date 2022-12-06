import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pedido } from 'src/app/models/pedido';
import { ClienteServico } from 'src/app/servicos/clienteServico';
import { PedidoServico } from 'src/app/servicos/pedidoServico';

@Component({
  selector: 'app-lista-pedidos',
  templateUrl: './lista-pedidos-completa.component.html',
  styleUrls: ['./lista-pedidos-completa.component.css']
})
export class ListaPedidosCompletaComponent implements OnInit {

  constructor(
    private router: Router,
    private http: HttpClient,
  ) { }

  public pedidosServico: PedidoServico = {} as PedidoServico;
  public pedidos: Pedido[] | undefined = [];
  public clienteServico: ClienteServico = {} as ClienteServico;
  public nomeCliente: String[] = [];

  ngOnInit(): void {
    this.pedidosServico = new PedidoServico(this.http);
    this.clienteServico = new ClienteServico(this.http);
    this.listaDePedidos();
  }
  

  private async listaDePedidos(){
    this.pedidos = await this.pedidosServico.lista();
    this.pedidos?.forEach(async item =>{
      let nome = await this.clienteServico.buscaPorId(item.cliente_id);
      console.log(nome);
      if(!nome){}else{
        this.nomeCliente.push(nome.nome);
      }
    })
  }
  number (a : Number){
    return Number(a)
  }

  somaTotal(){
    let valorTotal = 0;
    this.pedidos?.forEach(index => {
      valorTotal += Number(index.valor_total);
    })
    return Number(valorTotal)
  }

}
