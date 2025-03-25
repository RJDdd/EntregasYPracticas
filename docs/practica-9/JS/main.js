const d = document;
const API_URL = 'https://fakestoreapi.com/products';

// Elementos del DOM
const $productosContainer = d.getElementById('productos-container');
const $listaCarrito = d.getElementById('lista-carrito');
const $totalCarrito = d.getElementById('total-carrito');
const $btnCompra = d.getElementById('btn-compra');
const $loader = d.getElementById('loader');

let carrito = [];
let productos = [];

// Función para hacer peticiones AJAX
function hacerPeticion(url, metodo = 'GET', datos = null) {
    showLoader();
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        
        xhr.open(metodo, url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        
        xhr.onload = () => {
            hideLoader();
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(JSON.parse(xhr.response));
            } else {
                reject(new Error(`Error ${xhr.status}: ${xhr.statusText}`));
            }
        };
        
        xhr.onerror = () => {
            hideLoader();
            reject(new Error('Error de conexión'));
        };
        
        xhr.send(datos ? JSON.stringify(datos) : null);
    });
}

// Cargar productos con AJAX
async function cargarProductos() {
    try {
        productos = await hacerPeticion(API_URL);
        mostrarProductos(productos);
    } catch (error) {
        console.error('Error al cargar productos:', error);
        $productosContainer.innerHTML = `
            <div class="error-api">
                <p>No se pudieron cargar los productos</p>
                <button id="reintentar">Reintentar</button>
            </div>
        `;
        d.getElementById('reintentar').addEventListener('click', cargarProductos);
    }
}

// Mostrar productos en el DOM
function mostrarProductos(productos) {
    $productosContainer.innerHTML = productos.map(producto => `
        <article class="producto-card" data-id="${producto.id}">
            <img src="${producto.image}" alt="${producto.title}" class="producto-img">
            <div class="producto-info">
                <h3 class="producto-title">${producto.title}</h3>
                <p class="producto-price">$${producto.price.toFixed(2)}</p>
                <p class="producto-category">${producto.category}</p>
                <button class="btn-agregar" data-id="${producto.id}">
                    Agregar al carrito
                </button>
            </div>
        </article>
    `).join('');

    // Agregar event listeners
    d.querySelectorAll('.btn-agregar').forEach(btn => {
        btn.addEventListener('click', agregarAlCarrito);
    });
}

// Funciones del carrito (se mantienen igual que antes)
function agregarAlCarrito(e) {
    const id = parseInt(e.target.getAttribute('data-id'));
    const producto = productos.find(p => p.id === id);
    
    if (!producto) return;
    
    const productoEnCarrito = carrito.find(item => item.id === id);
    
    if (productoEnCarrito) {
        productoEnCarrito.cantidad += 1;
    } else {
        carrito.push({ 
            ...producto, 
            cantidad: 1 
        });
    }
    
    actualizarCarrito();
}

function actualizarCarrito() {
    $listaCarrito.innerHTML = carrito.map(item => `
        <li>
            <span>${item.title}</span>
            <div class="controles-carrito">
                <button class="btn-menos" data-id="${item.id}">-</button>
                <span>${item.cantidad}</span>
                <button class="btn-mas" data-id="${item.id}">+</button>
                <span>$${(item.price * item.cantidad).toFixed(2)}</span>
                <button class="btn-eliminar" data-id="${item.id}">×</button>
            </div>
        </li>
    `).join('');
    
    const total = carrito.reduce((sum, item) => sum + (item.price * item.cantidad), 0);
    $totalCarrito.textContent = total.toFixed(2);
    
    // Agregar event listeners
    d.querySelectorAll('.btn-mas').forEach(btn => {
        btn.addEventListener('click', e => {
            const id = parseInt(e.target.getAttribute('data-id'));
            const item = carrito.find(item => item.id === id);
            if (item) item.cantidad += 1;
            actualizarCarrito();
        });
    });
    
    d.querySelectorAll('.btn-menos').forEach(btn => {
        btn.addEventListener('click', e => {
            const id = parseInt(e.target.getAttribute('data-id'));
            const item = carrito.find(item => item.id === id);
            if (item) {
                item.cantidad -= 1;
                if (item.cantidad <= 0) {
                    carrito = carrito.filter(item => item.id !== id);
                }
            }
            actualizarCarrito();
        });
    });
    
    d.querySelectorAll('.btn-eliminar').forEach(btn => {
        btn.addEventListener('click', e => {
            const id = parseInt(e.target.getAttribute('data-id'));
            carrito = carrito.filter(item => item.id !== id);
            actualizarCarrito();
        });
    });
}

// Funciones del loader
function showLoader() {
    $loader.classList.remove('hidden');
}

function hideLoader() {
    $loader.classList.add('hidden');
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();
    
    $btnCompra.addEventListener('click', () => {
        if (carrito.length === 0) {
            alert('El carrito está vacío');
            return;
        }
        
        showLoader();
        setTimeout(() => {
            hideLoader();
            alert('Compra realizada con éxito!');
            carrito = [];
            actualizarCarrito();
        }, 1500);
    });
});