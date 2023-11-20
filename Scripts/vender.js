let labels = document.querySelectorAll(".add-image");
let files = document.querySelectorAll("input[type='file']");
let vistaFoto = document.querySelectorAll('.img-preview');

// Agrega un evento de cambio a cada input
files.forEach(function(input, index) {
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