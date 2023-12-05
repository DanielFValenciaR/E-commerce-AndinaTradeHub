const { Router } = require("express");
const router = Router();

const { GetProductos } = require("../Controllers/listaProductos.controller.js");


router.get("/lista-productos", GetProductos);

module.exports= router;