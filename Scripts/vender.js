const urlVender = new URL("http://localhost:3000/vender");
let labels = document.querySelectorAll(".label");

labels.forEach(label => {
    label.innerHTML = label.innerText.split('').map((letras, i) => `<span style="transition-delay: ${i*30}ms">${letras}</span>`).join('');
})

//Al momento de que cargue la pagina, nos muestre en el select las categorias traidas de la bd
$(document).ready(function () {
    function llenarSelect(categorias) {
        const selectCategoria = $('#selectCategoria');
    
        $.each(categorias, function (index, categoria) {
            selectCategoria.append($('<option>', {
                value: categoria.idcategoria,
                text: categoria.nombre_categoria
            }));
        });
    }; 

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


let files = document.querySelectorAll("input[type='file']");
let vistaPrevia = document.querySelectorAll('.img-preview');
// let imagesBase64 = [];

// Agrega un evento de cambio a cada input [type:file]
files.forEach((input, index) => {
    input.addEventListener("change", function() {
        // Verifica si hay al menos un archivo seleccionado
        if (input.files && input.files[0]) {
            const file = input.files[0];
            const reader = new FileReader();

            // Cuando la lectura del archivo esté completa, muestra la vista previa
            reader.onload = function (e) {
                // imagesBase64[index] = reader.result;
                vistaPrevia[index].src = e.target.result;
                vistaPrevia[index].style.display = "block";
                // console.log(reader.result);
            };
            // Lee el contenido del archivo como una URL de datos
            reader.readAsDataURL(file);
            // Deshabilitar el input después de cargar la imagen
            input.disabled = true;
        } else {
            console.log("No se ha seleccionado ninguna imagen");
        };
    });
});


$('#btn-confirmar').on('click', function (e) {
    e.preventDefault();

    const selectCategoria = $('#selectCategoria').val();
    const titulo = $('#textNombre').val();
    const descripcion = $('#textDescripcion').val();
    const precio = $('#textPrecio').val();
    const cantidad =  $('#textCantidad').val();
    const imagen1 = $('#imagen1').attr('src');
    const imagen2 = $('#imagen2').attr('src');
    const imagen3 = $('#imagen3').attr('src');

    let validar = true;
    let campos = "";

    const fields = [
        { valor: selectCategoria, nombre: "selectCategoria" },
        { valor: titulo, nombre: "titulo" },
        { valor: descripcion, nombre: "descripcion" },
        { valor: precio, nombre: "precio" },
        { valor: cantidad, nombre: "cantidad" },
        { valor: imagen1, nombre: "imagen1" },
        // { valor: imagen2, nombre: "imagen2" },
        // { valor: imagen3, nombre: "imagen3" },
    ];

    fields.forEach(campo => {
        if (campo.valor === null || campo.valor === "") {
            validar = false;
            campos += campo.nombre + ", ";
        }
    });
    
    if (validar === true) {
        (async () => {
            const rawResponse = await fetch(urlVender, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    idCategoria: selectCategoria, 
                    nombreProducto: titulo, 
                    descripcion: descripcion, 
                    precio: precio, 
                    cantidad: cantidad, 
                    imagen1: imagen1, 
                    imagen2: imagen2, 
                    imagen3: imagen3 })
            });

            const content = await rawResponse.json();
            console.log(content);

            if (content.sucess === true) {
                alert("Producto creado exitosamente!");
                limpiarProducto();
            } else {
                alert("No pudo ser creado el producto");
                limpiarProducto();
            }
        })();
    } else {
        alert(`Hay un campo vacío, no se puede continuar. Llene los campos: ${campos}`);
    }
});

function limpiarProducto() {
    $("#selectCategoria").val("");
    $('#textNombre').val("");
    $('#textDescripcion').val("");
    $('#textPrecio').val("");
    $("#textCantidad").val("");

    files.forEach((input) => {
        input.value = '';  // Limpiar el valor del input
        input.disabled = false;  // Habilitar el input
    });

    $("#imagen1").attr('src', '').attr('alt', '');
    $("#imagen1").hide();

    $("#imagen2").attr('src', '').attr('alt', '');
    $("#imagen2").hide();

    $("#imagen3").attr('src', '').attr('alt', '');
    $("#imagen3").hide();

};





