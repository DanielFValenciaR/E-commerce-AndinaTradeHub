const { Router } = require("express");
const router = Router();

const { GetProducto } = require("../Controllers/producto.controller.js");


router.get("/producto/:id", GetProducto);

module.exports= router;