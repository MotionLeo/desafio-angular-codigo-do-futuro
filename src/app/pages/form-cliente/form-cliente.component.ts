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

  public tituloDoBotao:String = "Cadastrar";
  private clienteServico: ClienteServico = {} as ClienteServico;
  public cliente:Cliente | undefined = {} as Cliente

  ngOnInit(): void {
    this.clienteServico = new ClienteServico(this.http);
    let id:Number = this.routerParams.snapshot.params['id'];
    if(id){
      this.editaCliente(id);
    }
  }

  private async editaCliente(id:Number){
    this.tituloDoBotao = "Alterar";
    this.cliente = await this.clienteServico.buscaPorId(id);
  }

  registrar(){
    if(this.cliente && this.cliente.id > 0){
      this.clienteServico.update(this.cliente)
    }
    else{
    this.clienteServico.criar({
      id: 0,
      nome: this.cliente?.nome,
      telefone: this.cliente?.telefone,
      email: this.cliente?.email,
      cpf: this.cliente?.cpf,
      cep: this.cliente?.cep,
      logradouro: this.cliente?.logradouro,
      numero: this.cliente?.numero,
      bairro: this.cliente?.bairro,
      cidade: this.cliente?.cidade,
      estado: this.cliente?.estado,
      complemento: this.cliente?.complemento,
    })
    }
    this.router.navigateByUrl("/clientes");
  }
}
