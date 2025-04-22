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

