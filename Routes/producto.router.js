const { Router } = require("express");
const router = Router();

const { GetCategorias } = require("../Controllers/producto.controller.js");


router.get("/vender", GetCategorias);

module.exports= router;