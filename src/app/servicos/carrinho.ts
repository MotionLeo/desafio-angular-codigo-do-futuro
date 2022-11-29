import { PedidoProdutoServico } from "./pedidoProdutoServico";
import { PedidoServico } from "./pedidoServico";
import { PedidoProduto } from "../models/pedidoProduto";
import { HttpClient } from "@angular/common/http";
import { Pedido } from "../models/pedido";

export class Carrinho{

    private static carrinho: (PedidoProduto)[]=[];
    private static id:number=0;
    private static pedido: Pedido;

    public static buscaTamanho():number{
        return Carrinho.carrinho.length;
    }

    public static setPedido(cliente_id:Number){
        Carrinho.pedido.cliente_id=cliente_id;
    }

    public static adicionaPedidoProduto(pedidoProduto:PedidoProduto):void{
        Carrinho.id++;
        pedidoProduto.id=Carrinho.id;
        Carrinho.carrinho.push(pedidoProduto);
        Carrinho.pedido.valor_total=new Number(Number(Carrinho.pedido.valor_total)+Number(pedidoProduto.quantidade)*Number(pedidoProduto.valor))
    }

    public static excluirProduto(id:number):void{
        let listaNova: (PedidoProduto)[] = []
        Carrinho.carrinho.forEach(item=>{
            if(item?.id != id){
                listaNova.push(item)
            }else{
                Carrinho.pedido.valor_total=new Number(Number(Carrinho.pedido.valor_total)-Number(item.quantidade)*Number(item.valor))
            }});
        Carrinho.carrinho=listaNova;
    }

    public static async salvar(http:HttpClient):Promise<void>{
        let id =(await new PedidoServico(http).getLast())?.id
        !id? 0:Carrinho.pedido.id=id;

        Carrinho.carrinho.forEach(async item=>{
            item.id=parseInt(Carrinho.pedido?.id.toString()+item.id)
            item.pedido_id=Carrinho.pedido.id;
            return await new PedidoProdutoServico(http).criar(item)
        })
        await new PedidoServico(http).criar(Carrinho.pedido);
    }
}