import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { Estado } from 'src/app/models/estado';
import { Municipio } from 'src/app/models/municipio';
import { ClienteServico } from 'src/app/servicos/clienteServico';
import { IBGEServico } from 'src/app/servicos/IBGEServico';

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
  public cliente:Cliente | undefined = {} as Cliente;
  public IBGEServico: IBGEServico={} as IBGEServico;
  public estados:Estado[]=[];
  public municipios:Municipio[]|undefined=[];
  public estadoSelecionado: String="1- Acre";
  public municipioSelecionado: String="1- ";
  ngOnInit(): void {
    this.clienteServico = new ClienteServico(this.http);
    this.IBGEServico= new IBGEServico(this.http);
    let id:Number = this.routerParams.snapshot.params['id'];
    if(id){
      this.editaCliente(id);
    }
    this.importarEstados();
    console.log(this.estadoSelecionado)
    console.log(this.municipioSelecionado)
  }

  private async importarEstados(){
    let estados = await this.IBGEServico.listaEstados();
    if(!estados){}else{
      this.estados=estados;
    }
    this.importarCidades();
  }

  public async importarCidades(){
    this.municipios= await this.IBGEServico.listaMunicipiosPorEstado(Number(this.estados.at(Number(this.estadoSelecionado.split("-")[0])-1)?.id));
    console.log(this.estadoSelecionado)
    console.log(this.municipioSelecionado)
  }

  private async editaCliente(id:Number){
    this.tituloDoBotao = "Alterar";
    this.cliente = await this.clienteServico.buscaPorId(id);
  }

  registrar(){
    if(this.cliente && this.cliente.id > 0){
      this.cliente.cidade=this.estadoSelecionado.split("-")[1].trim()
      this.cliente.cidade=this.municipioSelecionado.split("-")[1].trim()
      this.clienteServico.update(this.cliente)
    }
    else{
      console.log(this.municipioSelecionado.split("-")[1].trim())
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
      cidade: this.municipios?.at(Number(this.municipioSelecionado.split("-")[0])-1)?.nome,
      estado: this.estadoSelecionado.split("-")[1].trim(),
      complemento: this.cliente?.complemento,
      admin:false
    })
    }
    this.router.navigateByUrl("/clientes");
  }
}
