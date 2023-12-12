const urlCarrito = new URL("http://localhost:3000/carrito-de-compras");
const iconCart = $(".icon-cart");
const contador = $(".iconCartSpan");
const containerCart = $(".container-cart");
const precioTotal = $(".precio-total");
const precioProducto = $(".product-price");

let idProducto = "";

let productosCart = localStorage.getItem('Cart');

let contadorCart = [];

$(document).ready(function () {
    if (productosCart) {
        contadorCart = JSON.parse(productosCart);
        contador.text(contadorCart.length); 
    }

    async function fetchCart(url) {
        let res = await fetch(url);
        let data = await res.json();
        console.log(data);

        let totalPrecio = 0;

        $.each(contadorCart, function (index, cart) {
            let producto = data.find(item => item.id === cart.idProducto);
            
            let precioProducto = producto.price * cart.cantidad;
            totalPrecio += precioProducto;

            containerCart.append(`
                <section class="container-info" data-id="${producto.id}">
                    <img src="${producto.image}">
                    <button class="btn-cerrar">
                        ❌
                    </button>
                    <h3 class="product-title">${producto.title}</h3>
                    <hr>
                    <div class="container-price">
                        <h4 class="product-price">Precio: $${producto.price}</h4>
                        <div class="container-buttons">
                            <button class="btn-less">
                                -
                            </button>
                            <span class="contador">
                                ${cart.cantidad}
                            </span>
                            <button class="btn-more">
                                +
                            </button>
                        </div>
                    </div>
                </section> 
            `);
            precioTotal.text("$ " + totalPrecio);

            $(".container-info").on("click", (event) => {
                let posicionClick = $(event.target);
                if (posicionClick.hasClass('btn-less') || posicionClick.hasClass('btn-more')) {
                    // idProductApi = cart.idProducto;
                    let container = $(this);
                    idProducto = $('.container-info').data('id');
                    console.log(idProducto);
                    let tipo = "menos";
                    if (posicionClick.hasClass('btn-more')) {
                        tipo = "mas";
                    }
                    cambiarCantidad(idProducto, tipo);

                    // let productoActualizado = data.find(item => item.id === cart.idProducto);
                    
                    $(".contador").text(contadorCart.reduce((total, item) => total + item.cantidad, 0));
                };
            });


            const cambiarCantidad = (id, tipo) => {
                let positionCart = contadorCart.findIndex((value) => value.idProducto === id);
                if (positionCart >= 0) {
                    switch (tipo) {
                        case "mas":
                            // El producto está en el carrito, incrementa la cantidad.
                            contadorCart[positionCart].cantidad = contadorCart[positionCart].cantidad + 1;
                            break;
                    
                        default:
                            let valorCambio = contadorCart[positionCart].cantidad - 1;
                            if (valorCambio > 0) {
                                contadorCart[positionCart].cantidad = valorCambio;
                            } else {
                                contadorCart.splice(positionCart, 1);
                            }
                            break;
                    };
                };
                // Actualizar el precio total después de cambiar la cantidad
                let totalPrecio = contadorCart.reduce((total, item) => {
                    let producto = data.find(producto => producto.id === item.idProducto);
                    return total + (producto.price * item.cantidad);
                }, 0);

                precioTotal.text("$ " + totalPrecio);

                localStorage.setItem("Cart", JSON.stringify(contadorCart));
            };
        });
    };
    fetchCart(`https://fakestoreapi.com/products/${idProducto}`);
});