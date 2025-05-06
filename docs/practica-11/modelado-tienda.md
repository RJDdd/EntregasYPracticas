# Tienda Online: AnimeFig Store

## Descripción
Tienda especializada en la venta de figuras de anime, model kits (como Bandai, Figure-Rise Standard), y merchandising de series populares (One Piece, Digimon, etc.). Ofrecemos productos importados y ediciones limitadas.

---

## Inventario de Productos

| ID   | Nombre                          | Categoría       | Precio   | Stock | Descripción                                  |
|------|---------------------------------|-----------------|----------|-------|----------------------------------------------|
| B001 | Figure-Rise Wargreymon          | Model Kit       | $45.99   | 15    | Model kit Bandai de Digimon, 18cm altura     |
| OP05 | One Piece Luffy Sun God Nika    | Figura Premium  | $129.99  | 8     | Edición especial con efectos de luz          |
| B002 | Bandai Hubby Goku               | Figura Colección| $75.50   | 20    | Figura articulada de 25cm                   |
| D003 | Demon Slayer Nezuko Figma       | Figura Articulada| $89.99  | 12    | Incluye accesorios intercambiables           |

---

## Moodboard
![Moodboard AnimeFig](/docs/practica-10/assets/moodboard-animefig.png)  
*Estilo visual: Colores vibrantes (rojo #E63946, azul oscuro #1D3557), tipografía bold para títulos (Bebas Neue), fondos con texturas de manga.*

---

## Algoritmo de Proceso de Compra
1. Usuario visita la tienda y explora categorías (Model Kits, Figuras, Merchandising).  
2. Filtra productos por serie (One Piece, Digimon, etc.) o precio.  
3. Selecciona producto → ve detalles (fotos 360°, disponibilidad).  
4. Agrega al carrito (el sistema valida stock).  
5. **Flujo de checkout**:  
   - Ver/editar carrito (cambiar cantidades).  
   - Ingresar datos de envío (con opción "envío express").  
   - Selección de pago (tarjeta/PayPal, con validación en tiempo real).  
   - Confirmación → email con tracking y guía de armado (para model kits).  

---

## Diagrama de Flujo
![Diagrama de Flujo AnimeFig](/docs/practica-10/assets/diagrama-flujo-animefig.png)  
*Procesos clave:*  
- **Administrador**: Actualizar catálogo/marcar como "preorden".  
- **Cliente**: Solicitar reembolsos por figuras dañadas.  
- **Logística**: Integración con agente marítimo para importaciones.  

---

# Modelado de Datos - AnimeFig Store

## 1. Modelo Entidad–Relación

### Entidades y atributos:

#### Cliente
- ID_Cliente (PK)
- Nombre
- Correo Electrónico
- Dirección
- Teléfono

#### Producto
- ID_Producto (PK)
- Nombre
- Categoría
- Precio
- Stock
- Descripción

#### Pedido
- ID_Pedido (PK)
- Fecha
- Total
- Estado
- ID_Cliente (FK)

#### Detalle_Pedido
- ID_Detalle (PK)
- ID_Pedido (FK)
- ID_Producto (FK)
- Cantidad
- Precio_Unitario

#### Admin
- ID_Admin (PK)
- Nombre
- Usuario
- Contraseña

#### Reembolso
- ID_Reembolso (PK)
- Motivo
- Fecha_Solicitud
- Estado
- ID_Pedido (FK)

---

## 2. Diagrama Relacional

![Diagrama Relacional AnimeFig](/docs/practica-11/assets/Diagrama%20Relacional.png)

*Este diagrama muestra las relaciones entre clientes, productos, pedidos y otros procesos clave de la tienda*.
---

## Relaciones:
- Un **cliente** puede tener varios **pedidos**.
- Un **pedido** puede tener varios **productos** a través de **detalle_pedido**.
- Un **producto** puede estar en varios **detalles_pedido**.
- Un **pedido** puede tener **un reembolso** (opcional).
- Un **admin** gestiona la tienda y actualiza los productos.

## 2. Diagrama Relacional en supabase

![Diagrama Relacional AnimeFig](/docs/practica-11/assets/SupabaseDiagrama.png)