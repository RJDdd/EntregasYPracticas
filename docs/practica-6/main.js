// 1. Crear un Arreglo de Productos (Modelos 3D):
let productos = [
  { nombre: "Kohaku - Dr. Stone", precio: 20, stock: 5 },
  { nombre: "Senku - Dr. Stone", precio: 25, stock: 7 },
  { nombre: "Fushi - To Your Eternity", precio: 30, stock: 4 },
  { nombre: "Hayase - To Your Eternity", precio: 10, stock: 20 },
  { nombre: "Parona - To Your Eternity", precio: 300, stock: 0 },
  { nombre: "Jotaro Kujo - JoJo's Bizarre Adventure", precio: 35, stock: 6 },
  { nombre: "Dio Brando - JoJo's Bizarre Adventure", precio: 40, stock: 3 },
  { nombre: "Seiya - Saint Seiya", precio: 22, stock: 8 },
  { nombre: "Ikki - Saint Seiya", precio: 24, stock: 6 },
  { nombre: "Inuyasha - Inuyasha", precio: 28, stock: 5 },
  { nombre: "Kagome - Inuyasha", precio: 26, stock: 7 },
  { nombre: "Shinji Ikari - Evangelion", precio: 32, stock: 4 },
  { nombre: "Rei Ayanami - Evangelion", precio: 34, stock: 5 },
];

// 2. Agregar Productos al Carrito:
let carrito = [];

function agregarAlCarrito(productoNombre, cantidad) {
  for (let producto of productos) {
      if (producto.nombre === productoNombre) {
          if (producto.stock >= cantidad) {
              // Verificar si el producto ya está en el carrito
              let productoEnCarrito = carrito.find(item => item.nombre === productoNombre);
              if (productoEnCarrito) {
                  // Si ya está, aumentar la cantidad
                  productoEnCarrito.cantidad += cantidad;
              } else {
                  // Si no está, agregarlo al carrito
                  carrito.push({
                      nombre: productoNombre,
                      cantidad: cantidad,
                      precio: producto.precio,
                  });
              }
              producto.stock -= cantidad;
              console.log(`* ${cantidad} "${productoNombre}" agregado(s) al carrito.`);
          } else {
              console.log(`No hay suficiente stock del modelo "${productoNombre}".`);
              return;
          }
      }
  }
  console.log("Modelos disponibles:", productos);
  console.log("Carrito actual:", carrito);
  console.log("***************************");
}

// 3. Eliminar Productos del Carrito:
function eliminarDelCarrito(productoNombre, cantidad) {
  for (let i = 0; i < carrito.length; i++) {
      if (carrito[i].nombre === productoNombre) {
          if (carrito[i].cantidad > cantidad) {
              // Reducir la cantidad en el carrito
              carrito[i].cantidad -= cantidad;
              console.log(`* ${cantidad} "${productoNombre}" eliminado(s) del carrito.`);
          } else {
              // Eliminar el producto del carrito
              let productoEliminado = carrito.splice(i, 1)[0];
              console.log(`* ${productoEliminado.cantidad} "${productoNombre}" eliminado(s) del carrito.`);
          }
          // Devolver el stock al arreglo de productos
          let producto = productos.find(p => p.nombre === productoNombre);
          producto.stock += cantidad;
          console.log("Modelos disponibles:", productos);
          console.log("Carrito actual:", carrito);
          console.log("***************************");
          return;
      }
  }
  console.log(`El modelo "${productoNombre}" no está en el carrito.`);
}

// 4. Calcular el Total del Carrito:
function calcularTotal() {
  let total = 0;
  for (let item of carrito) {
      total += item.precio * item.cantidad;
  }
  return total;
}

// 5. Aplicar Descuentos:
function aplicarDescuento(total) {
  if (total > 100) {
      return total * 0.9;
  }
  return total;
}

// 6. Mostrar cuenta regresiva antes de confirmar la compra:
function mostrarCuentaRegresiva(segundos) {
  let contador = segundos;
  const intervalo = setInterval(() => {
      if (contador > 0) {
          console.log(`Compra confirmada en ${contador}...`);
          contador--;
      } else {
          clearInterval(intervalo);
          procesarCompra(); // Llamar a la función procesarCompra después de la cuenta regresiva
      }
  }, 1000); // Ejecutar cada segundo (1000 ms)
}

// 7. Simular el Proceso de Compra:
function procesarCompra() {
  console.log("Procesando compra...");
  setTimeout(function () {
      let total = calcularTotal();
      total = aplicarDescuento(total);
      console.log(`Compra completada. Total a pagar: $${total.toFixed(2)}`);
  }, 3000);
}

// 8. Ejecuta el Código:
agregarAlCarrito("Kohaku - Dr. Stone", 2);
agregarAlCarrito("Fushi - To Your Eternity", 1);
agregarAlCarrito("Jotaro Kujo - JoJo's Bizarre Adventure", 1);
eliminarDelCarrito("Kohaku - Dr. Stone", 1); // Eliminar 1 Kohaku del carrito

// Mostrar cuenta regresiva antes de confirmar la compra
mostrarCuentaRegresiva(3); // Cuenta regresiva de 3 segundos