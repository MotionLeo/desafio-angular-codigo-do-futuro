import { Cliente } from "../models/cliente";
import { ClienteServico } from "./clienteServico";
import { HttpClient } from "@angular/common/http";

export class Logar{

    public static async logar(email:String, senha:String,http:HttpClient):Number{
        let clienteServico= new ClienteServico(http);
        let lista=await clienteServico.lista();
        lista?.filter(a=>{
            if(email===a.email&&senha==a.senha) return a;
        })
        return 2
    }
}