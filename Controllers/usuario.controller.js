const pool = require("../Model/baseDatos.js");

const login = async (req, res) => {
    try {
        const {usuario, password} = req.body;
        const response = await pool.query('SELECT idUsuario FROM public.Usuarios WHERE usuario = $1 AND contraseña = $2', [usuario, password]);

        if (response.rows.length === 1) {
            res.status(200).send({sucess:true , messages:"success", data:response.rows});
        } else { 
            res.status(500).send({sucess:false, messages:"error", data:null});
        }
    } catch (err) {
        res.status(500).send({ sucess: false, message: "Error en usuario.controller/usuario/login " + err.message });
    }
};

const crearUsuario = async (req, res) => {
    const { nombreCompleto, email, telefono, usuario, password, municipio } = req.body;
    try {
        const rspta = await pool.query('SELECT idUsuario FROM public.Usuarios WHERE usuario=$1', [usuario]);

        if (rspta.rows.length === 1) {
            res.status(200).send({ sucess: true, message: 2, description: "Usuario existente", data: usuario })
        } else {
            const respuesta = await pool.query("INSERT INTO public.Usuarios(nombre_completo, correo_electrónico, teléfono, usuario, contraseña, municipio) VALUES ($1, $2, $3, $4, $5, $6);",[nombreCompleto, email, telefono, usuario, password, municipio]);
            // const resp = await respuesta;
            // console.log(respuesta.rowCount);
            if (respuesta.rowCount === 1) {
                res.status(200).send({sucess:true , messages:"Usuario creado", data:respuesta.rows});
            } else {
                res.status(500).send({sucess:false, messages:"Error: Usuario no creado", data:null});
            }
        }
    } catch (err) {
        res.status(500).send({ sucess: false, message: "Error en usuario.controller/usuario " + err.message });
    }
};

module.exports={
    login,
    crearUsuario
}