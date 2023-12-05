
const urlListaProductos = new URL("http://localhost:3000/lista-productos");
let info="";

const V_productos=[];

const producto={
id:0,
nombre:"",
descripcion:"",
precio:""

}
function  addcar(id){
    debugger;
    let reg= info.filter(x=> x.id===id);
    producto.id=   reg[0].id;
    producto.nombre= reg[0].title;
    producto.descripcion= reg[0].description;
    producto.precio=reg[0].price;

    V_productos.push(producto);
    let cant= V_productos.length;
    document.getElementById('cant').innerHTML= cant.toString();
    localStorage.setItem("data",JSON.stringify(V_productos));
  

}


$(document).ready(function () {
    async function fetchProducts(url) {
        try {
            let res = await fetch(url);
            let data = await res.json();
            info=data;
            data.forEach(producto => {
                // let description = producto.description;
                productos.append(`
                    <div class="product" id="product-${producto.id}">
                        <a href="#" class="link-product">
                            <img src="${producto.image}" alt="${producto.category}" class="product-img">
                            <div class="product-info">
                                <h2 class="product-title">${producto.title}</h2>
                                <h4 class="product-category">${producto.category}</h4>
                                <div class="product-price-container">
                                    <h3 class="product-price">$${producto.price}</h3>
                                    <button>
                                        <a href="javascript:addcar(${producto.id});" data-productId="${producto.id}" class0-rt"><ion-icon name="cart-outline"></ion-icon></a>
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


let iconCart = document.querySelector()
























































































































































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