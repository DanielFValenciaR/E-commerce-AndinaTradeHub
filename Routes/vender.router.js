const { Router } = require("express");
const router = Router();

const { GetCategorias, crearProducto } = require("../Controllers/vender.controller.js");


router.get("/vender", GetCategorias);
router.post("/vender", crearProducto);

module.exports= router;