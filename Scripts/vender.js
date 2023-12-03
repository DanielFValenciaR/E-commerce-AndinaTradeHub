let labels = document.querySelectorAll(".label");
let files = document.querySelectorAll("input[type='file']");
let vistaFoto = document.querySelectorAll('.img-preview');

labels.forEach(label => {
    label.innerHTML = label.innerText.split('').map((letras, i) => `<span style="transition-delay: ${i*30}ms">${letras}</span>`).join('');
})

// Agrega un evento de cambio a cada input
files.forEach((input, index) => {
    input.addEventListener("change", function() {
        mostrarImagen(input, vistaFoto[index]);
        // Deshabilitar el input después de cargar la imagen
        input.disabled = true;
    });
});

function mostrarImagen(input, vistaFoto) {
    // Verifica si hay al menos un archivo seleccionado
    if (input.files && input.files[0]) {
        let reader = new FileReader();

        // Cuando la lectura del archivo esté completa, muestra la vista previa
        reader.onload = function (e) {
            vistaFoto.src = e.target.result;
            vistaFoto.style.display = "block";
        };
        // Lee el contenido del archivo como una URL de datos
        reader.readAsDataURL(input.files[0]);
    }
}

const urlVender = new URL("http://localhost:3000/vender");

//Al momneto de que cargue la pagina, nos muestre en el select las categorias traidas de la bd
$(document).ready(function () {
    (async () => {
        try {
            const rawResponse = await fetch(urlVender, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                // No es necesario enviar un body para una solicitud GET
            });
            const content = await rawResponse.json();

            if (content.sucess === true) {
                llenarSelect(content.data);
            } else {
                alert('No se pudieron obtener las categorías');
            }
        } catch (error) {
            console.error('Error al obtener categorías: ', error);
        }
    })();
});

function llenarSelect(categorias) {
    const selectCategoria = $('#selectCategoria');

    $.each(categorias, function (index, categoria) {
        selectCategoria.append($('<option>', {
            value: categoria.idcategoria,
            text: categoria.nombre_categoria
        }));
    });
} 