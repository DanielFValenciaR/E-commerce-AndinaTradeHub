const pool = require("../Model/baseDatos.js");

//Carga todos los productos
const GetProductos = async (req, res) => {
    try {
        const response = await pool.query('SELECT p.idProducto, p.imagen_1, p.nombre_producto, c.nombre_categoria, p.precio FROM public.Productos p INNER JOIN public.Categorias c on p.idCategoria = c.idCategoria');
        res.status(200).send({ sucess:true, message:"Ok" , data:response.rows });
        // console.log(response.rows);
        // res.send("categoria");
    } catch (err) {
        res.status(500).send({ sucess: false, message: "Error en listaProductos.controller/GetProductos " + err.message });
    }
};


module.exports={
    GetProductos
}