const contenedor = $('#container');
const registroBtn = $('#register');
const loginBtn = $('#login');
const selectCiudad = $('#select');
const urlApi = "https://api-colombia.com/api/v1/City";

registroBtn.on('click', () => {
    contenedor.addClass("active");
});

loginBtn.on('click', () => {
    contenedor.removeClass("active");
});

async function fetchGet(url, callback ) {
    let res = await fetch(url);
    let data = await res.json();
    callback(data);
}

$(document).ready(function() {
    // $('.selectpicker').selectpicker();
    
    fetchGet(urlApi, function (data) {
        $.each(data, function (index, ciudad) {
            selectCiudad.append($("<option>", {
                value: ciudad.id,
                text: ciudad.name
            }));
        });
    });
});

