const { Router } = require("express");
const router = Router();

const { login } = require("../Controllers/usuario.controller.js");


router.post("/login", login);


module.exports= router;