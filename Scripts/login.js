const contenedor = $('#container');
const registroBtn = $('#register');
const loginBtn = $('#login');
const selectCiudad = $('#select');
const urlApi = "https://api-colombia.com/api/v1/City";

const urlEndpoint = new URL("http://localhost:3000/login");


registroBtn.on('click', () => {
    contenedor.addClass("active");
});

loginBtn.on('click', () => {
    contenedor.removeClass("active");
});

//Funcion para llamar una api de manera asincrona
async function fetchGet(url, callback) {
    let res = await fetch(url);
    let data = await res.json();
    callback(data);
}

$(document).ready(function() {
    //Llamamos la funcion para traer las ciuadades al select con jquery
    fetchGet(urlApi, function (data) {
        $.each(data, function (index, ciudad) {
            selectCiudad.append($("<option>", {
                value: ciudad.id,
                text: ciudad.name
            }));
        });
    });
});

$("#btnIniciar").on('click', function (event) {
    event.preventDefault();
    
    const usuario= $("#usuario").val();
    const password= $("#contrasena").val();

    if (usuario !="" && password !=""){
        (async () => {
            // const esEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identificador);

            // const requestBody = {
            //     [esEmail ? 'email' : 'username']: identificador,
            //     password: password
            // };
            const rawResponse = await fetch(urlEndpoint, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username: usuario, password: password})
            });

            const content = await rawResponse.json();

            if (content.sucess === true) {
                alert("Acceso concedido");
                limpiarLogin();
                
            } else {
                alert("Acceso denegado");
            }
            
        })();
    }else{
        alert("Llene su usuario y contraseña para poder ingresar"); 
    }
});

function limpiarLogin() {
    $("#usuario").val('');
    $("#contrasena").val('');
}

