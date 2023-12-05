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

const crearProducto = async (req, res) => {
    const { idCategoria, nombreProducto, descripcion, precio, cantidad, imagen1, imagen2, imagen3 } = req.body;
    try {
        const respuesta = await pool.query("INSERT INTO public.Productos(idCategoria, nombre_producto, descripción, precio, cantidad, imagen_1, imagen_2, imagen_3) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);",[idCategoria, nombreProducto, descripcion, precio, cantidad, imagen1, imagen2, imagen3]);
        console.log(respuesta.rowCount);
        if (respuesta.rowCount === 1) {
            res.status(200).send({sucess:true , messages:"Producto creado", data:respuesta.rows});
        } else {
            res.status(500).send({sucess:false, messages:"Error: Producto no creado", data:null});
        }
    } catch (error) {
        res.status(500).send({ sucess: false, message: "Error en producto.controller/vender " + error.message });
    }
};


module.exports={
    GetCategorias,
    crearProducto
}