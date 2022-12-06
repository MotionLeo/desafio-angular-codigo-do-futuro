const Pedido = require("../modelos/pedido");
const PedidoProduto = require("../modelos/pedidoProduto")

module.exports = {
    index: async (req, res, next) => {
        const pedidos = await Pedido.lista()
        res.status(200).send( pedidos )
    },
    create: async (req, res, next) => {
        const pedido = new Pedido(req.body)
        pedido.id = new Number(Number((await Pedido.getLast()).id)+1)
        pedido.data=new Date(Date.now());
        Pedido.salvar(pedido)
        res.status(201).send(pedido)
    },
    delete: (req, res, next) => {
        Pedido.apagarPorId(req.params.id)
        res.status(204).send("")
    },
    update: async (req, res, next) => {
        let pedidoDb = await Pedido.buscaPorId(req.params.id)
        if(!pedidoDb) return res.status(404).send({mensagem: "Pedido não encontrado"})

        const pedido = new Pedido(req.body)
        pedido.id = pedidoDb.id
        Pedido.salvar(pedido)
        res.status(200).send(pedido)
    },
    show: async (req, res, next) => {
        let pedidoDb = await Pedido.buscaPorId(req.params.id)
        if(!pedidoDb) return res.status(404).send({mensagem: "Pedido não encontrado"})
        res.status(200).send(pedidoDb)
    },
    last: async (req, res, next) => {
        const pedido = await Pedido.getLast()
        res.status(201).send(pedido)
    },
    showProd: async (req,res,next) =>{
        let pedidos = []
        let pedidoProdutoDb = await PedidoProduto.lista()
        for (let index = 0; index < pedidoProdutoDb.length; index++) {
            const item = pedidoProdutoDb[index];
            if(item.produto_id.toString()===req.params.produto_id){
                pedidos.push(await Pedido.buscaPorId(item.pedido_id));
            }
        }
        if(!pedidoProdutoDb) return res.status(404).send({mensagem: "Produto ainda não foi comprado"})
        res.status(200).send(pedidos)
    }
};
