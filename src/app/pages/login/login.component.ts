import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogadoService } from 'src/app/servicos/logado.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(
    private router:Router,
    private logadoService:LogadoService
  ) { }

  ngOnInit(): void {
  }
  
  public email:String = ""
  public senha:String = ""
  public mensagem:string = ""

  logar(){
    if(this.email === "admin@admin.com" && this.senha === "123456"){
      localStorage.setItem("logado", "true")
      this.logadoService.verificaLogado()
      this.router.navigateByUrl("/home")
    }
    else{
      this.mensagem = "Usuário ou senha inválidos"
      this.email = ""
      this.senha = ""
    }
  }

}