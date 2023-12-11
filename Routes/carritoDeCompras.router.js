const { Router } = require("express");
const router = Router();

const { GetProductos } = require("../Controllers/carritoDeCompras.controller.js");

router.get("/carrito-de-compras", GetProductos);

module.exports = router;