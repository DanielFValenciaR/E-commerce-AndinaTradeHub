const imagenes = $('.image-container');
const infoProducto = $('.info-product');
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


