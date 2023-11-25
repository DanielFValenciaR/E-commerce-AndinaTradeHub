const productos = document.querySelector('.products');

document.addEventListener('DOMContentLoaded', function() {
    async function fetchProducts(url) {
        try {
            let res = await fetch(url);
            let data = await res.json();

            data.forEach(producto => {
                // let description = producto.description;
                productos.innerHTML += `
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
