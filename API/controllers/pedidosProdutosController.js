const PedidoProduto = require("../modelos/pedidoProduto");

module.exports = {
    index: async (req, res, next) => {
        const pedidosProdutos = await PedidoProduto.lista()
        res.status(200).send( pedidosProdutos )
    },
    create: (req, res, next) => {
        const pedidoProduto = new PedidoProduto(req.body)
        PedidoProduto.salvar(pedidoProduto)
        res.status(201).send(pedidoProduto)
    },
    delete: (req, res, next) => {
        PedidoProduto.apagarPorId(req.params.id)
        res.status(204).send("")
    },
    update: async (req, res, next) => {
        let pedidoProdutoDb = await PedidoProduto.buscaPorId(req.params.id)
        if(!pedidoProdutoDb) return res.status(404).send({mensagem: "PedidoProduto não encontrado"})

        const pedidoProduto = new PedidoProduto(req.body)
        pedidoProduto.id = pedidoProdutoDb.id
        PedidoProduto.salvar(pedidoProduto)
        res.status(200).send(pedidoProduto)
    },
    show: async (req, res, next) => {
        let pedidoProdutoDb = await PedidoProduto.buscaPorId(req.params.id)
        if(!pedidoProdutoDb) return res.status(404).send({mensagem: "PedidoProduto não encontrado"})
        res.status(200).send(pedidoProdutoDb)
    }
};
