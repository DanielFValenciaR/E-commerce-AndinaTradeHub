const pool = require("../Model/baseDatos.js");

//Carga todos los productos
const GetProductos = async (req, res) => {
    try {
        const response = await pool.query('SELECT idProducto, imagen_1, nombre_producto, precio, cantidad FROM public.Productos');
        res.status(200).send({ sucess:true, message:"Ok" , data:response.rows });
        // console.log(response.rows);
    } catch (err) {
        res.status(500).send({ sucess: false, message: "Error en carritoDeCompras.controller/GetProductos " + err.message });
    }
};


module.exports={
    GetProductos
}