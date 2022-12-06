module.exports = class Pedido {
    constructor(pedido){
        this.id = pedido?.id
        this.cliente_id = pedido?.cliente_id
        this.valor_total = pedido?.valor_total
        this.data = pedido?.data
    }


    // metodos staticos
    static async apagarPorId(id){
        const listaPedidos = await this.lista()
        const listaNova = []
        for(let i=0; i<listaPedidos.length; i++){
            const pedidoDb = listaPedidos[i]
            if(pedidoDb.id.toString() !== id.toString()){
                listaNova.push(pedidoDb)
            }
        }

        Pedido.salvarJsonDisco(listaNova)
    }
    
    static async buscaPorId(id){
        const listaPedidos = await this.lista()
        for(let i=0; i<listaPedidos.length; i++){
            const pedidoDb = listaPedidos[i]
            if(pedidoDb.id.toString() === id.toString()){
                return pedidoDb
            }
        }

        return null
    }

    static async salvar(pedido){
        const listaPedidos = await this.lista()
        let exist = false
        for(let i=0; i<listaPedidos.length; i++){
            const pedidoDb = listaPedidos[i]
            console.log(pedidoDb);
            if(pedidoDb.id.toString() === pedido.id.toString()){
                pedidoDb.cliente_id = pedido?.cliente_id
                pedidoDb.valor_total = pedido?.valor_total
                pedidoDb.data = pedido?.data

                exist = true
                break
            }
        }

        if(!exist){
            const objectLiteral = {...pedido}
            listaPedidos.push(objectLiteral)
        }

        Pedido.salvarJsonDisco(listaPedidos)
    }

    static async salvarJsonDisco(pedidos){
        const fs = require('fs');

        try {
            fs.writeFileSync('db/pedidos.json', JSON.stringify(pedidos), {encoding: "utf8"});
        } catch (err) {
            console.error(err);
        }
    }

    static async lista(){
        let pedidos = []
        const fs = require('fs');

        try {
            const jsonPedidos = await fs.readFileSync('db/pedidos.json', 'utf8');
            pedidos = JSON.parse(jsonPedidos)
        } catch (err) {
            console.error(err);
        }
        
        return pedidos
    }

    static async getLast(){
        let pedidos = []
        const fs = require('fs');

        try {
            const jsonPedidos = await fs.readFileSync('db/pedidos.json', 'utf8');
            pedidos = JSON.parse(jsonPedidos)
        } catch (err) {
            console.error(err);
        }
        
        return pedidos.pop();
    }
}