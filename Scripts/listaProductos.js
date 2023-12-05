const productos = document.querySelector('.products');
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


document.addEventListener('DOMContentLoaded', function() {
    async function fetchProducts(url) {
        try {
            let res = await fetch(url);
            let data = await res.json();
            info=data;
            data.forEach(producto => {
                // let description = producto.description;
                productos.innerHTML += `
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
                    </div>`;  
                    // <p class="product-description">${description.length > 80 ? description.substring(0, 80).concat(' ... más') : description}</p>

                let productoContainer = document.querySelectorAll('.product');

                productoContainer.forEach(container => {
                    container.addEventListener('click', function () {
                        const link = container.querySelector('.link-product');
                        const productUrl = link.getAttribute('href');

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
