import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { LoginService } from 'src/app/servicos/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(
    private router:Router,
    private loginService:LoginService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
  }
  public usuario:Usuario = {} as Usuario;
  public email:String = ""
  public senha:String = ""
  public mensagem:string = ""

  // logar(){
  //   if(this.email === "admin@admin.com" && this.senha === "123456"){
  //     localStorage.setItem("logado", "true")
  //     this.router.navigateByUrl("/home")
  //   }
  //   else{
  //     this.mensagem = "Usuário ou senha inválidos"
  //     this.email = ""
  //     this.senha = ""
  //   }
  // }

  async login(){
    try{
      this.usuario.email = this.email;
      this.usuario.senha = this.senha;
      const result = await this.loginService.login(this.usuario);
      console.log(`login efetuado: ${result}`);
      this.router.navigateByUrl("/home")
    }catch (error){
      console.error(error)
    }

  }

}