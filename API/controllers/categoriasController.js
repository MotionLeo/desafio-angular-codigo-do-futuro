const Categoria = require("../modelos/categoria");

module.exports = {
    index: async (req, res, next) => {
        const categorias = await Categoria.lista()
        res.status(200).send( categorias )
    },
    create: async (req, res, next) => {
        const categoria = new Categoria(req.body)
        categoria.id = new Number(Number((await Categoria.getLast()).id)+1)
        console.log(Number((await Categoria.getLast()).id)+1)
        Categoria.salvar(categoria)
        res.status(201).send(categoria)
    },
    delete: (req, res, next) => {
        Categoria.apagarPorId(req.params.id);
        res.status(204).send("");
    },
    update: async (req, res, next) => {
        let categoriaDb = await Categoria.buscaPorId(req.params.id)
        if(!categoriaDb) return res.status(404).send({mensagem: "Categoria não encontrado"})

        const categoria = new Categoria(req.body)
        categoria.id = categoriaDb.id
        Categoria.salvar(categoria)
        res.status(200).send(categoria)
    },
    show: async (req, res, next) => {
        let categoriaDb = await Categoria.buscaPorId(req.params.id)
        if(!categoriaDb) return res.status(404).send({mensagem: "Categoria não encontrado"})
        res.status(200).send(categoriaDb)
    }
};
