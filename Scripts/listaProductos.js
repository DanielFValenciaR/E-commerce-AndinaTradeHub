const urlListaProductos = new URL("http://localhost:3000/lista-productos");

const iconCart = $(".icon-cart");
const productos = $('.products');
const contador = $(".iconCartSpan");

let listProductsApi=[];
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


// let info = "";
// const V_productosBD=[];

// const producto = {
//     id:0,
//     nombre:"",
//     categoria:"",
//     precio:"",
//     descripcion:""
// }

// const productoBD = {
//     id:0,
//     nombre:"",
//     categoria:"",
//     precio:""
// }

// function addcar (id) {
//     // debugger;
//     let reg = info.filter(x=> x.id===id);
//     let regs = info.filter(y=> y.id===id);

//     producto.id = reg[0].id;
//     producto.nombre = reg[0].title;
//     producto.categoria = reg[0].category;
//     producto.precio = reg[0].price;
//     producto.descripcion = reg[0].description;

//     V_productosApi.push(producto);

//     productoBD.id = regs[0].idproducto;
//     productoBD.nombre = regs[0].nombre_producto;
//     productoBD.descripcion = regs[0].nombre_categoria;
//     productoBD.precio = regs[0].precio;

//     V_productosBD.push(productoBD);

//     let cant= V_productosApi.length;
//     document.getElementById('cant').innerHTML= cant.toString();
//     localStorage.setItem("DataCarro",JSON.stringify(V_productosApi));
// }

$(document).ready(function () {
    //Traemos los elementos necesarios que extraemos de la api
    async function fetchProducts(url) {
        try {
            let res = await fetch(url);
            let data = await res.json();
            listProductsApi = data;
            console.log(listProductsApi);
            data.forEach(producto => {
                productos.append(`
                    <div class="producto" id="product-${producto.id}">
                        <a href="../Views/producto.html" class="link-producto" data-id="${producto.id}">
                            <img src="${producto.image}" alt="${producto.category}" class="producto-img">
                            <div class="producto-info">
                                <h2 class="producto-title">${producto.title}</h2>
                                <h4 class="producto-category">${producto.category}</h4>
                                <p class="producto-description">${producto.description}</p>
                                <div class="producto-price-container">
                                    <h3 class="producto-price">$${producto.price}</h3>
                                    <button>
                                        <a href="javascript:addToCart(${producto.id});" data-productId="${producto.id}" class0-rt class="add-to-car"><ion-icon name="cart-outline"></ion-icon></a>
                                    </button>
                                </div>
                            </div>
                        </a>
                    </div>`);  

                    let productContainer = $('.producto');

                    productContainer.each(function (index, element) {
                        $(element).on('click', function (event) {
                            const enlaceProducto = $('.link-producto');
                            const productUrl = enlaceProducto.attr('href');

                            // Obtén el valor del atributo "data-id" utilizando data()
                            let idProducto = $(this).find('.link-producto').data('id');
                            let title = $(this).find('.producto-title').text();
                            let category = $(this).find('.producto-category').text();
                            let image = $(this).find('.producto-img').attr('src');
                            let price = $(this).find('.producto-price').text();
                            let description = $(this).find('.producto-description').text();

                            localStorage.setItem("Data",JSON.stringify({
                                id: idProducto,
                                title: title,
                                category: category,
                                image: image,
                                price: price,
                                description: description
                            }));

                            if (event.target !== this) return;
                            
                            // Redirige a la URL deseada
                            window.location.href = productUrl;
                            
                        });
                    });
            });
        } catch (error) {
            console.error('Error al obtener productos de la API: ', error);
        };
    };
    fetchProducts('https://fakestoreapi.com/products');

    productosBD();
});


function productosBD() {
    (async () => {
        try {
            const rawResponse = await fetch(urlListaProductos, {
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
                info = content.data;
            } else {
                alert('No se pudieron obtener los productos de la base de datos');
            }
        } catch (error) {
            console.error('Error al obtener productos de la base de datos: ', error);
        }
    })();

    function mostrarProductos(products) {
        $.each(products, function (index, producto) {
            productos.append(`
            <div class="product" id="product-${producto.idproducto}">
                <a href="../Views/producto.html" class="link-product">
                    <img src="${producto.imagen_1}" alt="${producto.nombre_categoria}" class="product-img bd-img">
                    <div class="product-info">
                        <h2 class="product-title">${producto.nombre_producto}</h2>
                        <h4 class="product-category">${producto.nombre_categoria}</h4>
                        <div class="product-price-container">
                            <h3 class="product-price">$${producto.precio}</h3>
                            <button>
                                <a href="javascript:addToCart(${producto.idproducto});" data-id="${producto.idproducto}" class="add-to-cart"><ion-icon name="cart-outline"></ion-icon></a>
                            </button>
                        </div>
                    </div>
                </a>
            </div>`);

            let productoContainer = $(".product");

            productoContainer.each(function (index, element) {
                $(element).on("click", function (event) {
                    const enlaceProduct = $('.link-product');
                    const productoUrl = enlaceProduct.attr('href');

                    // Obtén el valor del atributo "data-id" utilizando data()
                    let idProducto = $(this).find('.add-to-cart').data('id');
                    console.log(idProducto);
                    localStorage.setItem("IdProducto",JSON.stringify(idProducto));

                    if (event.target !== this) return;

                    // Redirige a la URL deseada
                    window.location.href = productoUrl;
                    
                });
            });
        });
    }; 

    if (localStorage.getItem('Cart')) {
        contadorCart = JSON.parse(localStorage.getItem('Cart'));
        contador.text(contadorCart.length);
    }
};
