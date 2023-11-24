document.addEventListener('DOMContentLoaded', function() {
    let productos = document.querySelector('.products');

    async function fetchProducts(url) {
        try {
            let res = await fetch(url);
            let data = await res.json();

            data.forEach(producto => {
                // let description = producto.description;
                let title = producto.title;

                productos.innerHTML += `
                    <div class="product">
                        <a href="" class="link-product">
                            <img src="${producto.image}" alt="${producto.category}" class="product-img">
                            <div class="product-info">
                                <h2 class="product-title">${title}</h2>
                                <h4 class="product-category">${producto.category}</h4>
                                <div class="product-price-container">
                                    <h3 class="product-price">$${producto.price}</h3>
                                    <a href="#!" data-productId="${producto.id}" class="add-to-cart"><ion-icon name="cart-outline"></ion-icon></a>
                                </div>
                            </div>
                        </a>
                    </div>`;  
                    // <p class="product-description">${description.length > 80 ? description.substring(0, 80).concat(' ... más') : description}</p>
            });
        } catch (error) {
            console.log(error);
        };
    };
    fetchProducts('https://fakestoreapi.com/products');
});