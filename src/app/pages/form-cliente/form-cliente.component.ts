import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClienteServico } from 'src/app/servicos/clienteServico';

@Component({
  selector: 'app-form-cliente',
  templateUrl: './form-cliente.component.html',
  styleUrls: ['./form-cliente.component.css']
})
export class FormClienteComponent implements OnInit {

  constructor(
    private router: Router,
    private http: HttpClient,
    private routerParams: ActivatedRoute,
  ) { }

  private clienteServico: ClienteServico = {} as ClienteServico;
  public cliente:Cliente = {} as Cliente

  ngOnInit(): void {
  }

  registrar(){
    this.clienteServico.criar({
      id: 0,
      nome: this.cliente.nome,
      telefone: this.cliente.telefone,
      email: this.cliente.email,
      cpf: this.cliente.cpf,
      cep: this.cliente.cep,
      logradouro: this.cliente.logradouro,
      numero: this.cliente.numero,
      bairro: this.cliente.bairro,
      cidade: this.cliente.cidade,
      estado: this.cliente.estado,
      complemento: this.cliente.complemento,
    })
    this.router.navigateByUrl("/clientes");
  }
}
