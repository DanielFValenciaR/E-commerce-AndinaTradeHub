const pool = require("../Model/baseDatos.js");

const login = async (req, res) => {
    try {
        const {username, password} = req.body;
        
        // const esEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identificador);

        // const query = esEmail
        //     ? 'SELECT idUsuario FROM public.Usuarios WHERE correo_electrónico = $1 AND contraseña = $2'
        //     : 'SELECT idUsuario FROM public.Usuarios WHERE usuario = $1 AND contraseña = $2';

        // let queryParams = [identificador, password];

        const response = await pool.query('SELECT idUsuario FROM public.Usuarios WHERE usuario = $1 AND contraseña = $2', [username, password]);

        if (response.rows.length === 1) {
            res.status(200).send({sucess:true , messages:"success", data:response.rows});
        } else { 
            res.status(500).send({sucess:false, messages:"error", data:null});
        }
    } catch (err) {
        res.status(500).send({ sucess: false, message: "Error en usuario.controller/login" + err.message });
    }
};

module.exports={
    login
}