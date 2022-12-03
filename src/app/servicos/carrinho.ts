import { PedidoProdutoServico } from "./pedidoProdutoServico";
import { PedidoServico } from "./pedidoServico";
import { PedidoProduto } from "../models/pedidoProduto";
import { HttpClient } from "@angular/common/http";
import { Pedido } from "../models/pedido";

export class Carrinho{

    private static carrinho: (PedidoProduto)[]=[{"id":201,"pedido_id":2,"produto_id":1,"valor":10,"quantidade":2},
    {"id":202,"pedido_id":2,"produto_id":2,"valor":10,"quantidade":2}];
    private static id:number=0;
    private static pedido: Pedido={"id":2,"cliente_id":3,"valor_total":40,"data":new Date((new Date()).getTime())};
    
    public static buscaTamanho():number{
        return Carrinho.carrinho.length;
    }

    public static setCliente_Id(id:Number):void{
        this.pedido.cliente_id=id;
    }

    public static listar():(PedidoProduto)[]{
        return Carrinho.carrinho;
    }

    public static setPedido(cliente_id:Number){
        Carrinho.pedido.cliente_id=cliente_id;
    }

    public static adicionaPedidoProduto(pedidoProduto:PedidoProduto):void{
        Carrinho.id++;
        pedidoProduto.id=Carrinho.id;
        Carrinho.carrinho.push(pedidoProduto);
     }


    public static excluirProduto(id:number):void{
        console.log(Carrinho.carrinho);
        let item=Carrinho.carrinho.splice(id,1);
        }

    public static getValor_Total():Number{
        let total=0;
        Carrinho.carrinho.forEach(item=>{
            total+=Number(item.quantidade)*Number(item.valor);
        })
        return Carrinho.pedido.valor_total=new Number(total);
    }

    public static async salvar(http:HttpClient):Promise<void>{
        let id =new Number(Number((await new PedidoServico(http).getLast())?.id)+1);
        !id? 0:Carrinho.pedido.id=id;

        Carrinho.carrinho.forEach(async item=>{
            item.id=new Number(Carrinho.pedido?.id.toString()+item.id)
            console.log("teste "+item.id)
            item.pedido_id=Carrinho.pedido.id;
            return await new PedidoProdutoServico(http).criar(item)
        })
        await new PedidoServico(http).criar(Carrinho.pedido);
    }

    public static reset(){
        while(this.carrinho.length>0){
            this.carrinho.pop();
        }
    }
}