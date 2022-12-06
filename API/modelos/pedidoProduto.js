module.exports = class PedidoProduto {
    constructor(pedidoProduto){
        this.id = pedidoProduto?.id
        this.produto_id = pedidoProduto?.produto_id
        this.pedido_id = pedidoProduto?.pedido_id
        this.valor = pedidoProduto?.valor
        this.quantidade = pedidoProduto?.quantidade
    }


    // metodos staticos
    static async apagarPorId(id){
        const listaPedidosProdutos = await this.lista()
        const listaNova = []
        for(let i=0; i<listaPedidosProdutos.length; i++){
            const pedidoProdutoDb = listaPedidosProdutos[i]
            if(pedidoProdutoDb.id.toString() !== id.toString()){
                listaNova.push(pedidoProdutoDb)
            }
        }

        PedidoProduto.salvarJsonDisco(listaNova)
    }
    
    static async buscaPorId(id){
        const listaPedidosProdutos = await this.lista()
        for(let i=0; i<listaPedidosProdutos.length; i++){
            const pedidoProdutoDb = listaPedidosProdutos[i]
            if(pedidoProdutoDb.id.toString() === id.toString()){
                return pedidoProdutoDb
            }
        }

        return null
    }

    static async salvar(pedidoProduto){
        console.log(pedidoProduto.id)
        const listaPedidosProdutos = await this.lista()
        let exist = false
        for(let i=0; i<listaPedidosProdutos.length; i++){
            const pedidoProdutoDb = listaPedidosProdutos[i]
            if(pedidoProdutoDb.id.toString() === pedidoProduto.id.toString()){
                pedidoProdutoDb.produto_id = pedidoProduto.produto_id
                pedidoProdutoDb.pedido_id = pedidoProduto.pedido_id
                pedidoProdutoDb.valor = pedidoProduto.valor
                pedidoProdutoDb.quantidade = pedidoProduto.quantidade

                exist = true
                break
            }
        }

        if(!exist){
            const objectLiteral = {...pedidoProduto}
            listaPedidosProdutos.push(objectLiteral)
        }

        PedidoProduto.salvarJsonDisco(listaPedidosProdutos)
    }

    static async salvarJsonDisco(pedidosProdutos){
        const fs = require('fs');

        try {
            fs.writeFileSync('db/pedidosProdutos.json', JSON.stringify(pedidosProdutos), {encoding: "utf8"});
        } catch (err) {
            console.error(err);
        }
    }

    static async lista(){
        let pedidosProdutos = []
        const fs = require('fs');

        try {
            const jsonPedidosProdutos = await fs.readFileSync('db/pedidosProdutos.json', 'utf8');
            pedidosProdutos = JSON.parse(jsonPedidosProdutos)
        } catch (err) {
            console.error(err);
        }
        
        return pedidosProdutos
    }
}