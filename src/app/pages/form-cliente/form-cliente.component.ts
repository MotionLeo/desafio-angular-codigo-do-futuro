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

   async registrar(){
    if(this.cliente && this.cliente.id > 0){
      await this.clienteServico.update(this.cliente)
    }
    else{
      // id: 0,
      // nome: this.cliente?.nome,
      // telefone: this.cliente?.telefone,
      // email: this.cliente?.email,
      // cpf: this.cliente?.cpf,
      // cep: this.cliente?.cep,
      // logradouro: this.cliente?.logradouro,
      // numero: this.cliente?.numero,
      // bairro: this.cliente?.bairro,
      // cidade: this.cliente?.cidade,
      // estado: this.cliente?.estado,
      // complemento: this.cliente?.complemento,
      if(!this.cliente){}
      else{
        await this.clienteServico.criar(this.verificaUndefined());
      }
    }
    this.router.navigateByUrl("/clientes");
  }

  verificaUndefined(){
    let nome:String = "";
    let telefone:String = "";
    let email:String = "";
    let cpf:String = "";
    let cep:String = "";
    let logradouro:String = "";
    let numero:Number = 0;
    let bairro:String = "";
    let cidade:String = "";
    let estado:String = "";
    let complemento:String = "";

    if(this.cliente?.nome) nome = this.cliente.nome;
    if(this.cliente?.telefone) telefone = this.cliente.telefone;
    if(this.cliente?.email) email = this.cliente.email;
    if(this.cliente?.cpf) cpf = this.cliente.cpf;
    if(this.cliente?.cep) cep = this.cliente.cep;
    if(this.cliente?.logradouro) logradouro = this.cliente.logradouro;
    if(this.cliente?.numero) numero = this.cliente.numero;
    if(this.cliente?.bairro) bairro = this.cliente.bairro;
    if(this.cliente?.cidade) cidade = this.cliente.cidade;
    if(this.cliente?.estado) estado = this.cliente.estado;
    if(this.cliente?.complemento) complemento = this.cliente.complemento;

    let cliente = {
      id: 0,
      nome: nome,
      telefone: telefone,
      email: email,
      cpf: cpf,
      cep: cep,
      logradouro: logradouro,
      numero: numero,
      bairro: bairro,
      cidade: cidade,
      estado: estado,
      complemento: complemento,
    }

    return cliente
  }
}
