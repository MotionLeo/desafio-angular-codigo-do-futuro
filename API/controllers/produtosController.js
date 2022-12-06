const Produto = require("../modelos/produto");

module.exports = {
    index: async (req, res, next) => {
        const produtos = await Produto.lista()
        res.status(200).send( produtos )
    },
    create: async (req, res, next) => {
        const produto = new Produto(req.body)
        produto.id = new Number(Number((await Produto.getLast()).id)+1)
        Produto.salvar(produto)
        res.status(201).send(produto)
    },
    delete: (req, res, next) => {
        Produto.apagarPorId(req.params.id)
        res.status(204).send("")
    },
    update: async (req, res, next) => {
        let produtoDb = await Produto.buscaPorId(req.params.id)
        if(!produtoDb) return res.status(404).send({mensagem: "Produto não encontrado"})

        const produto = new Produto(req.body)
        produto.id = produtoDb.id
        Produto.salvar(produto)
        res.status(200).send(produto)
    },
    show: async (req, res, next) => {
        let produtoDb = await Produto.buscaPorId(req.params.id)
        if(!produtoDb) return res.status(404).send({mensagem: "Produto não encontrado"})
        res.status(200).send(produtoDb)
    },
    indexByCategoria: async (req, res, next) =>{
        const produtos = await Produto.listaPorCategoria(req.params.id)
        res.status(200).send( produtos )
    }
};
