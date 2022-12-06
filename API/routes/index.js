const express = require('express');
const router = express.Router();
const ClientesController = require("../controllers/clientesController")
const ProdutosController = require("../controllers/produtosController")
const PedidosController = require("../controllers/pedidosController")
const CategoriasController = require("../controllers/categoriasController")
const PedidosProdutosController = require("../controllers/pedidosProdutosController")

router.get('/clientes', ClientesController.index);
router.post('/clientes', ClientesController.create);
router.get('/clientes/:id', ClientesController.show);
router.delete('/clientes/:id', ClientesController.delete);
router.put('/clientes/:id', ClientesController.update);

router.get('/produtos', ProdutosController.index);
router.post('/produtos', ProdutosController.create);
router.get('/produtos/:id', ProdutosController.show);
router.delete('/produtos/:id', ProdutosController.delete);
router.put('/produtos/:id', ProdutosController.update);

router.get('/pedidos', PedidosController.index);
router.post('/pedidos', PedidosController.create);
router.get('/pedidosLast', PedidosController.last);
router.get('/pedidos/:id', PedidosController.show);
router.get('/pedidos/produtos/:produto_id', PedidosController.showProd);
router.delete('/pedidos/:id', PedidosController.delete);
router.put('/pedidos/:id', PedidosController.update);

router.get('/pedidosProdutos', PedidosProdutosController.index);
router.post('/pedidosProdutos', PedidosProdutosController.create);
router.get('/pedidosProdutos/:id', PedidosProdutosController.show);
router.delete('/pedidosProdutos/:id', PedidosProdutosController.delete);
router.put('/pedidosProdutos/:id', PedidosProdutosController.update);

router.get('/categorias', CategoriasController.index);
router.post('/categorias', CategoriasController.create);
router.get('/categorias/:id', CategoriasController.show);
router.delete('/categorias/:id', CategoriasController.delete);
router.put('/categorias/:id', CategoriasController.update);
router.get('/categorias/produtos/:id', ProdutosController.indexByCategoria);

module.exports = router;
