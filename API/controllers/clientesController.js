const Cliente = require("../modelos/cliente");

module.exports = {
    index: async (req, res, next) => {
        const clientes = await Cliente.lista()
        res.status(200).send( clientes )
    },
    create: async (req, res, next) => {
        const cliente = new Cliente(req.body)
        cliente.id = new Number(Number((await Cliente.getLast()).id)+1)
        console.log(Number((await Cliente.getLast()).id)+1)
        Cliente.salvar(cliente)
        res.status(201).send(cliente)
    },
    delete: (req, res, next) => {
        Cliente.apagarPorId(req.params.id);
        res.status(204).send("");
    },
    update: async (req, res, next) => {
        let clienteDb = await Cliente.buscaPorId(req.params.id)
        if(!clienteDb) return res.status(404).send({mensagem: "Cliente não encontrado"})

        const cliente = new Cliente(req.body)
        cliente.id = clienteDb.id
        Cliente.salvar(cliente)
        res.status(200).send(cliente)
    },
    show: async (req, res, next) => {
        let clienteDb = await Cliente.buscaPorId(req.params.id)
        if(!clienteDb) return res.status(404).send({mensagem: "Cliente não encontrado"})
        res.status(200).send(clienteDb)
    }
};
