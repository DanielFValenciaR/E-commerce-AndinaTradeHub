
const urlListaProductos = new URL("http://localhost:3000/lista-productos");

$(document).ready(function () {
    async function fetchProducts(url) {
        try {
            let res = await fetch(url);
            let data = await res.json();

            data.forEach(producto => {
                // let description = producto.description;
                productos.append(`
                    <div class="product" id="product-${producto.id}">
                        <a href="../index.html" class="link-product">
                            <img src="${producto.image}" alt="${producto.category}" class="product-img">
                            <div class="product-info">
                                <h2 class="product-title">${producto.title}</h2>
                                <h4 class="product-category">${producto.category}</h4>
                                <div class="product-price-container">
                                    <h3 class="product-price">$${producto.price}</h3>
                                    <button>
                                        <a href="#!" data-productId="${producto.id}" class="add-to-cart"><ion-icon name="cart-outline"></ion-icon></a>
                                    </button>
                                </div>
                            </div>
                        </a>
                    </div>`);  
                    // <p class="product-description">${description.length > 80 ? description.substring(0, 80).concat(' ... más') : description}</p>

                let productoContainer = $('.product');

                productoContainer.each(() => {
                    $(this).on('click', function () {
                        const link = $(this).find('.link-product');
                        const productUrl = link.attr('href');

                        // Redirige a la URL deseada
                        window.location.href = productUrl;
                    });
                });
            });
        } catch (error) {
            console.log(error);
        };
    };
    fetchProducts('https://fakestoreapi.com/products');
});
























































































































































// $(document).ready(function () {
//     (async () => {
//         try {
//             const rawResponse = await fetch(urlListaProductos, {
//                 method: 'GET',
//                 headers: {
//                     'Accept': 'application/json',
//                     'Content-Type': 'application/json'
//                 },
//                 // No es necesario enviar un body para una solicitud GET
//             });
//             const content = await rawResponse.json();
            
//             if (content.sucess === true) {
//                 mostrarProductos(content.data);
//             } else {
//                 alert('No se pudieron obtener los productos');
//             }
//         } catch (error) {
//             console.error('Error al obtener productos: ', error);
//         }
//     })();

//     function mostrarProductos(products) {
//         const productos = $('.products');
    
//         $.each(products, function (index, producto) {
//             productos.append(`
//             <div class="product" id="product-${producto.idProducto}">
//                 <a href="../index.html" class="link-product">
//                     <img src="${producto.imagen_1}" alt="${producto.nombre_categoria}" class="product-img">
//                     <div class="product-info">
//                         <h2 class="product-title">${producto.nombre_producto}</h2>
//                         <h4 class="product-category">${producto.nombre_categoria}</h4>
//                         <div class="product-price-container">
//                             <h3 class="product-price">$${producto.precio}</h3>
//                             <button>
//                                 <a href="#!" data-productId="${producto.idProducto}" class="add-to-cart"><ion-icon name="cart-outline"></ion-icon></a>
//                             </button>
//                         </div>
//                     </div>
//                 </a>
//             </div>`);
//         });
//     }; 
// });