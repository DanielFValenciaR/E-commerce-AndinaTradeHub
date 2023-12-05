const urlProducto = new URL("http://localhost:3000/producto")
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
                mostrarProductos(content.data);
            } else {
                alert('No se pudieron obtener los productos');
            }
        } catch (error) {
            console.error('Error al obtener productos: ', error);
        }
    })();

    function mostrarProductos(products) {
        const productos = $('.products');
    
        $.each(products, function (index, producto) {
            productos.append(`
            <div class="row g-0">
                <div class="col-6 images-container">
                    <img src="${producto.imagen_1}" alt="${producto.nombre_categoria[index]}">
                    <img src="${producto.imagen_2}" alt="${producto.nombre_categoria[index]}">
                    <img src="${producto.imagen_3}" alt="${producto.nombre_categoria[index]}">
                </div>
                <div class="col-6 info-product">
                    <h2 class="product-title">${producto.nombre_producto}</h2>
                    <h4 class="product-category">${producto.nombre_categoria}</h4>
                    <span class="product-price">${producto.precio}</span>
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
        });
    }; 
});

// <p class="product-description">${description.length > 80 ? description.substring(0, 80).concat(' ... más') : description}</p>
