const { Router } = require("express");
const router = Router();

const { login, crearUsuario } = require("../Controllers/usuario.controller.js");


router.post("/usuario/login", login);
router.post("/usuario", crearUsuario);


module.exports= router;