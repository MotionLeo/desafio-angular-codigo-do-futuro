import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogadoService } from 'src/app/servicos/logado.service';

@Component({
  selector: 'app-lista-cliente',
  templateUrl: './lista-cliente.component.html',
  styleUrls: ['./lista-cliente.component.css']
})
export class ListaClienteComponent implements OnInit {

  constructor(
    private router: Router,
    private http: HttpClient,
    private logadoService: LogadoService,
  ) { }

  ngOnInit(): void {
  }
  
  novoCliente(){
    this.router.navigateByUrl("/form-clientes")
  }

}
