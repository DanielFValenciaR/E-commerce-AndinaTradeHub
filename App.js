const express = require("express");
const app = express();

require("dotenv").config({path:'./.env'});

const PUERTO =  process.env.PUERTO || 5000;

const cors = require("cors");

//middleware
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: false}));// capturar cualquier tipo de datos - imagenes. Devuelve una función de middleware que analiza las solicitudes entrantes con datos codificados en la URL y coloca los resultados en req.body
app.use(cors());

app.use(require("./Routes/usuario.router.js"));
app.use(require("./Routes/producto.router.js"));
app.use(require("./Routes/listaProductos.router.js"));

app.listen(PUERTO,()=>{
    console.log("Servidor iniciado... " + "Puerto:" + PUERTO);
});

