const pool = require("../Model/baseDatos.js");

//carga todas las categorias
const GetCategorias = async (req, res) => {
    try {
        const response = await pool.query('SELECT idCategoria, nombre_categoria FROM public.Categorias');
        res.status(200).send({ sucess:true, message:"ok" , data:response.rows });
        // console.log(response.rows);
        // res.send("categoria");
    } catch (err) {
        res.status(500).send({ sucess: false, message: "Error en producto.controller/GetCategorias " + err.message });
    }
};

module.exports={
    GetCategorias
}