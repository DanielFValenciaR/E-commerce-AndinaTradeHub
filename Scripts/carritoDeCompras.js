const iconCart = $(".icon-cart");
const contador = $(".iconCartSpan");

let productosCart = localStorage.getItem('Cart');

let contadorCart = [];

$(document).ready(function () {
    if (productosCart) {
        contadorCart = JSON.parse(productosCart);
        contador.text(contadorCart.length); 
    }
});