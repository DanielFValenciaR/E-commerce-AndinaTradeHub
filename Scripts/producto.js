const idProduct = localStorage.getItem('IdProducto');
const urlProducto = `http://localhost:3000/producto/${idProduct}`;

const iconCart = $(".icon-cart");
const contador = $(".iconCartSpan");

let productosCart = localStorage.getItem('Cart');

let contadorCart = [];

iconCart.on("click", function() {
    window.location.href = "../Views/carritoDeCompras.html";
});


const addToCart = (id) => {
    // let cantidadTotal = 0;

    let positionCart = contadorCart.findIndex((value) => value.idProducto == id);

    if (contadorCart <= 0) {
        // Caso 1: El carrito está vacío, agrega el primer elemento.
        contadorCart = [{
            idProducto: id,
            cantidad: 1
        }];
    } else if (positionCart < 0){
        // Caso 2: El producto no está en el carrito, agregarlo.
        contadorCart.push({
            idProducto: id,
            cantidad: 1
        });
    } else {
        // Caso 3: El producto está en el carrito, incrementa la cantidad.
        contadorCart[positionCart].cantidad = contadorCart[positionCart].cantidad + 1;
    }
    console.log(contadorCart);

    // $.each(contadorCart, function(index, producto) {
    //     cantidadTotal += producto.cantidad;
    // });
    
    contador.text(contadorCart.length);

    localStorage.setItem("Cart", JSON.stringify(contadorCart));
}


$(document).ready(function () {
    if (productosCart) {
        contadorCart = JSON.parse(productosCart);
        contador.text(contadorCart.length);
    }

    (async () => {
        try {
            const rawResponse = await fetch(urlProducto, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                // No es necesario enviar un body para una solicitud GET
            });
            const content = await rawResponse.json();
            
            if (content.sucess === true) {
                mostrarProductoBD(content.data);
            } else {
                alert('No se pudieron obtener los productos');
            }
        } catch (error) {
            console.error('Error al obtener productos: ', error);
        }
    })();

    function mostrarProductoBD(product) {
        const containerProduct = $('.product-section');
    
        $.each(product, function (index, producto) {
            const images = [];
            if (producto.imagen_1) images.push(`<img src="${producto.imagen_1}" alt="${producto.nombre_categoria}">`);
            if (producto.imagen_2) images.push(`<img src="${producto.imagen_2}" alt="${producto.nombre_categoria}">`);
            if (producto.imagen_3) images.push(`<img src="${producto.imagen_3}" alt="${producto.nombre_categoria}">`);

            containerProduct.append(`
            <div class="row g-0">
                <div class="col-6 images-container">
                    ${images.join('')}
                </div>
                <div class="col-6 info-product">
                    <h2 class="product-title">${producto.nombre_producto}</h2>
                    <h4 class="product-category">${producto.nombre_categoria}</h4>
                    <span class="product-price">$${producto.precio}</span>
                    <div class="buttons-container">
                        <button class="btn-comprar" data-productId="1">Comprar💰</button>
                        <button class="btn-agregar" data-productId="2">Agregar🛒</button>
                    </div>
                </div>
                <div class="description-container">
                    <h3 class="description-title">Descripción del producto</h3>
                    <span>${producto.descripción}</span>
                </div>
            </div>
            `);
            console.log(producto);
        });
    }; 

    function mostrarProductoApi() {
        const data = localStorage.getItem("Data");
        const producto = JSON.parse(data);
        
        const containerProducto = $('.product-section');

        containerProducto.append(`
            <div class="row g-0">
                <div class="col-6 image-container">
                    <img src="${producto.image}" alt="${producto.category}">
                </div>
                <div class="col-6 info-product">
                    <h2 class="product-title">${producto.title}</h2>
                    <h4 class="product-category">${producto.category}</h4>
                    <span class="product-price">${producto.price}</span>
                    <div class="buttons-container">
                        <button class="btn-comprar" data-productId="${producto.id}">Comprar💰</button>
                        <button class="btn-agregar" data-id="${producto.id}">Agregar🛒</button>
                    </div>
                </div>
                <div class="description-container">
                    <h3 class="description-title">Descripción del producto</h3>
                    <span>${producto.description}</span>
                </div>
            </div>`);
        
        $(".btn-agregar").on('click', (e) => {
            e.preventDefault();
            let productId = $(e.currentTarget).data('id');
            addToCart(productId);
            // console.log(productoId);
        });
    }; 

    mostrarProductoApi();
});

window.addEventListener('beforeunload', function () {
    // Eliminar toda la información relacionada con productos al salir de la página
    localStorage.removeItem('Data');
    localStorage.removeItem('IdProducto');
});

// <p class="product-description">${description.length > 80 ? description.substring(0, 80).concat(' ... más') : description}</p>

{/* <img src="${producto.imagen_1}" alt="${producto.nombre_categoria}">
                    <img src="${producto.imagen_2}" alt="${producto.nombre_categoria}">
                    <img src="${producto.imagen_3}" alt="${producto.nombre_categoria}"></img> */}