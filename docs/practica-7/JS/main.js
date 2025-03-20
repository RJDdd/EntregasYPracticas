// Función para procesar la compra
function procesarCompra() {
    if (carrito.length === 0) {
        alert("El carrito está vacío. Agrega productos antes de comprar.");
        return;
    }

    // Mostrar el loader
    const loader = document.getElementById("loader");
    loader.classList.remove("hidden");

    // Simular la compra durante 5 segundos
    setTimeout(() => {
        // Ocultar el loader
        loader.classList.add("hidden");

        // Mostrar mensaje de compra exitosa
        mensajeCompra.classList.remove("hidden");

        // Limpiar el carrito
        carrito = [];
        actualizarCarrito();

        // Ocultar el mensaje después de 3 segundos
        setTimeout(() => {
            mensajeCompra.classList.add("hidden");
        }, 3000);
    }, 5000); // 5 segundos
}