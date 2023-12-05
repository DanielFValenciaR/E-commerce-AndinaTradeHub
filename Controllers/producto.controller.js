const pool = require("../Model/baseDatos.js");

//Carga todos los productos
const GetProducto = async (req, res) => {
    const productId = req.params.id;
    try {
        const response = await pool.query('SELECT p.idProducto, p.imagen_1, p.nombre_producto, c.nombre_categoria, p.precio, p.descripción FROM public.Productos p INNER JOIN public.Categorias c on p.idCategoria = c.idCategoria WHERE p.idProducto = $1', [productId]);
        res.status(200).send({ sucess:true, message:"Ok" , data:response.rows });
        // console.log(response.rows);
        // res.send("categoria");
    } catch (err) {
        res.status(500).send({ sucess: false, message: "Error en producto.controller/GetProducto " + err.message });
    }
};


module.exports={
    GetProducto
}