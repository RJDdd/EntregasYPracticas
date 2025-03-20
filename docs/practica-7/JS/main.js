// Variables globales
let carrito = [];

// Seleccionar elementos del DOM
const productos = document.querySelectorAll(".producto");
const listaCarrito = document.getElementById("lista-carrito");
const totalCarrito = document.getElementById("total-carrito");
const btnCompra = document.getElementById("btn-compra");
const mensajeCompra = document.getElementById("mensaje-compra");

// Función para agregar productos al carrito
function agregarAlCarrito(event) {
    const producto = event.target;
    const id = producto.getAttribute("data-id");
    const nombre = producto.getAttribute("data-nombre");
    const precio = parseFloat(producto.getAttribute("data-precio"));

    // Verificar si el producto ya está en el carrito
    const productoEnCarrito = carrito.find(item => item.id === id);
    if (productoEnCarrito) {
        productoEnCarrito.cantidad += 1;
    } else {
        carrito.push({ id, nombre, precio, cantidad: 1 });
    }

    // Actualizar la interfaz
    actualizarCarrito();
}

// Función para actualizar el carrito en la interfaz
function actualizarCarrito() {
    // Limpiar la lista del carrito
    listaCarrito.innerHTML = "";

    // Calcular el total
    let total = 0;

    // Recorrer los productos en el carrito
    carrito.forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${item.nombre} - $${item.precio} x ${item.cantidad} = $${(item.precio * item.cantidad).toFixed(2)}
            <button onclick="eliminarDelCarrito('${item.id}')">Eliminar</button>
        `;
        listaCarrito.appendChild(li);
        total += item.precio * item.cantidad;
    });

    // Actualizar el total
    totalCarrito.textContent = total.toFixed(2);
}

// Función para eliminar productos del carrito
function eliminarDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id);
    actualizarCarrito();
}

// Función para procesar la compra
function procesarCompra() {
    if (carrito.length === 0) {
        alert("El carrito está vacío. Agrega productos antes de comprar.");
        return;
    }

    // Mostrar mensaje de compra exitosa
    mensajeCompra.classList.remove("hidden");

    // Limpiar el carrito
    carrito = [];
    actualizarCarrito();

    // Ocultar el mensaje después de 3 segundos
    setTimeout(() => {
        mensajeCompra.classList.add("hidden");
    }, 3000);
}

// Eventos
productos.forEach(producto => {
    producto.addEventListener("click", agregarAlCarrito);
});

btnCompra.addEventListener("click", procesarCompra);