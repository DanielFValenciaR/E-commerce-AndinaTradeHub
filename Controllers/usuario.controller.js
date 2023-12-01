const pool = require("../Model/baseDatos.js");

const login = async (req, res) => {
    try {
        const {username, password} = req.body;
        const response = await pool.query('SELECT idUsuario FROM public.Usuarios WHERE correo_electrónico=$1 AND contraseña=$2',[username,password]);
        //console.log(response);
        if (response.rows.length === 1) {
            res.status(200).send({sucess:true , messages:"success", data:response.rows});
        } else { 
            res.status(500).send({sucess:false, messages:"error", data:null});
        }
        //console.log(response.rows);
        //res.send("usuario");
    } catch (err) {
        res.status(500).send({ sucess: false, message: "Error en usuario.controller/login" + err.message });
    }
};

module.exports={
    login
}