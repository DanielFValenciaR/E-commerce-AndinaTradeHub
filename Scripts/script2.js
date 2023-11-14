const contenedor = document.getElementById('container');
const registroBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
const selectCiudad = document.getElementById('select');

registroBtn.addEventListener('click', () => {
    contenedor.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    contenedor.classList.remove("active");
});

$(document).ready(function() {
    $('.selectpicker').selectpicker();
});

