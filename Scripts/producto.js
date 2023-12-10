const idProduct = localStorage.getItem('IdProducto');
const urlProducto = `http://localhost:3000/producto/${idProduct}`;
// const imagenes = $('.image-container');
// const infoProducto = $('.info-product');
// const imagenes = document.querySelector('.image-container');
// const infoProducto = document.querySelector('.info-product');

// $(document).ready(() => {
//     async function fetchProducts(url) {
//         try {
//             let res = await fetch(url);
//             let data = await res.json();

//             data.forEach(producto => {
//                 imagenes.append(`<img src="${producto.image}" alt="${producto.category}" class="product-img">`);

//                 infoProducto.append(`
//                     <h2 class="product-title">${producto.title}</h2>
//                     <h4 class="product-category">${producto.category}</h4>
//                     <h3 class="product-price">$${producto.price}</h3>
//                     <div class="buttons-container">
//                         <button class"btn-comprar" data-productId="${producto.id}">Comprar💰</button>
//                         <button class"btn-vender" data-productId="${producto.id}">Agregar🛒</button>
//                     </div>
//                 `)
//             });
//         } catch (error) {
//             console.log(error);
//         };
//     };
//     fetchProducts('https://fakestoreapi.com/products');
// });

// const urlActual = window.location.pathname; // Esto te dará "/producto/5"
// const partesURL = urlActual.split('/'); // Dividir la URL en partes usando '/'
// const productId = partesURL[partesURL.length - 1]; // El último elemento en partesURL es el ID del producto


$(document).ready(function () {
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
                        <button class="btn-vender" data-productId="2">Agregar🛒</button>
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

    async function mostrarProductoApi() {
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
                        <button class="btn-comprar" data-productId="1">Comprar💰</button>
                        <button class="btn-vender" data-productId="2">Agregar🛒</button>
                    </div>
                </div>
                <div class="description-container">
                    <h3 class="description-title">Descripción del producto</h3>
                    <span>${producto.description}</span>
                </div>
            </div>`);
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