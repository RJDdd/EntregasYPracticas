// Variables globales
let carrito = [];

// Seleccionar elementos del DOM
const productos = document.querySelectorAll(".producto");
const listaCarrito = document.getElementById("lista-carrito");
const totalCarrito = document.getElementById("total-carrito");
const btnCompra = document.getElementById("btn-compra");
const mensajeCompra = document.getElementById("mensaje-compra");

// Función para agregar productos al carrito
function agregarAlCarrito(id, nombre, precio, cantidad) {
    const productoEnCarrito = carrito.find(item => item.id === id);
    if (productoEnCarrito) {
        productoEnCarrito.cantidad += cantidad;
    } else {
        carrito.push({ id, nombre, precio, cantidad });
    }
    actualizarCarrito();
}

// Función para eliminar productos del carrito
function eliminarDelCarrito(id, cantidad) {
    const productoEnCarrito = carrito.find(item => item.id === id);
    if (productoEnCarrito) {
        productoEnCarrito.cantidad -= cantidad;
        if (productoEnCarrito.cantidad <= 0) {
            carrito = carrito.filter(item => item.id !== id);
        }
    }
    actualizarCarrito();
}

// Función para actualizar el carrito en la interfaz
function actualizarCarrito() {
    listaCarrito.innerHTML = "";
    let total = 0;

    carrito.forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${item.nombre} - $${item.precio} x ${item.cantidad} = $${(item.precio * item.cantidad).toFixed(2)}</span>
            <div class="controles-carrito">
                <button onclick="eliminarDelCarrito('${item.id}', 1)">-</button>
                <button onclick="agregarAlCarrito('${item.id}', '${item.nombre}', ${item.precio}, 1)">+</button>
            </div>
        `;
        listaCarrito.appendChild(li);
        total += item.precio * item.cantidad;
    });

    totalCarrito.textContent = total.toFixed(2);
}

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

// Eventos para los botones de "+" y "-"
productos.forEach(producto => {
    const btnMas = producto.querySelector(".btn-mas");
    const btnMenos = producto.querySelector(".btn-menos");
    const cantidadElemento = producto.querySelector(".cantidad");

    btnMas.addEventListener("click", () => {
        const id = producto.getAttribute("data-id");
        const nombre = producto.getAttribute("data-nombre");
        const precio = parseFloat(producto.getAttribute("data-precio"));
        agregarAlCarrito(id, nombre, precio, 1);
        cantidadElemento.textContent = parseInt(cantidadElemento.textContent) + 1;
    });

    btnMenos.addEventListener("click", () => {
        const id = producto.getAttribute("data-id");
        const cantidad = parseInt(cantidadElemento.textContent);
        if (cantidad > 0) {
            eliminarDelCarrito(id, 1);
            cantidadElemento.textContent = cantidad - 1;
        }
    });
});

// Evento para el botón de compra
btnCompra.addEventListener("click", procesarCompra);