const urlListaProductos = new URL("http://localhost:3000/lista-productos");

let info="";

const V_productos=[];

const producto = {
    id:0,
    nombre:"",
    categoria:"",
    precio:""
}

function addcar (id) {
    debugger;
    let reg = info.filter(x=> x.id===id);
    let regs = info.filter(y=> y.id===id);

    producto.id = reg[0].id;
    producto.nombre = reg[0].title;
    producto.categoria = reg[0].category;
    producto.precio = reg[0].price;

    producto.id = regs[0].idproducto;
    producto.nombre = regs[0].nombre_producto;
    producto.descripcion = regs[0].nombre_categoria;
    producto.precio = regs[0].precio;

    V_productos.push(producto);
    let cant= V_productos.length;
    document.getElementById('cant').innerHTML= cant.toString();
    localStorage.setItem("data",JSON.stringify(V_productos));
}


$(document).ready(function () {
    const productos = $('.products');

    //Traemos los elementos necesarios que extraemos de la api
    async function fetchProducts(url) {
        try {
            let res = await fetch(url);
            let data = await res.json();
            info = data;
            data.forEach(producto => {
                productos.append(`
                    <div class="product" id="product-${producto.id}">
                        <a href="#!" class="link-product">
                            <img src="${producto.image}" alt="${producto.category}" class="product-img">
                            <div class="product-info">
                                <h2 class="product-title">${producto.title}</h2>
                                <h4 class="product-category">${producto.category}</h4>
                                <div class="product-price-container">
                                    <h3 class="product-price">$${producto.price}</h3>
                                    <button>
                                        <a href="javascript:addcar(${producto.id});" data-productId="${producto.id}" class0-rt class="add-to-cart"><ion-icon name="cart-outline"></ion-icon></a>
                                    </button>
                                </div>
                            </div>
                        </a>
                    </div>`);  

                    let productoContainer = $('.product');

                    productoContainer.each(() => {
                        $(this).on('click', function () {
                            const link = $(this).find('.link-product');
                            const productUrl = link.attr('href');
    
                            // Redirige a la URL deseada
                            // window.location.href = productUrl;
                        });
                    });
            });
        } catch (error) {
            console.log('Error al obtener productos de la API: ', error);
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
        const productos = $('.products');
    
        $.each(products, function (index, producto) {
            productos.append(`
            <div class="product" id="product-${producto.idproducto}">
                <a href="#" class="link-product">
                    <img src="${producto.imagen_1}" alt="${producto.nombre_categoria}" class="product-img bd-img">
                    <div class="product-info">
                        <h2 class="product-title">${producto.nombre_producto}</h2>
                        <h4 class="product-category">${producto.nombre_categoria}</h4>
                        <div class="product-price-container">
                            <h3 class="product-price">$${producto.precio}</h3>
                            <button>
                                <a href="javascript:addcar(${producto.idproducto});" data-productId="${producto.idproducto}" class="add-to-cart"><ion-icon name="cart-outline"></ion-icon></a>
                            </button>
                        </div>
                    </div>
                </a>
            </div>`);

            let productoContainer = $(".product");

            productoContainer.each(() => {
                $(this).on("click", function () {
                const link = $(this).find(".link-product");
                const productUrl = link.attr("href");

                // Redirige a la URL deseada
                // window.location.href = productUrl;
                });
            });
        });
    }; 
};