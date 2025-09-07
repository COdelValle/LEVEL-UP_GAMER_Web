# 🎮 Level-Up Gamer

**Level-Up Gamer** — Tienda online chilena especializada en productos para gamers.  
Ofrecemos consolas, periféricos, computadores, sillas ergonómicas y merchandising, con despacho a todo el país.

---

## 📌 Contenido
- [Descripción](#descripción)  
- [Características principales](#características-principales)  
- [Estructura del proyecto](#estructura-del-proyecto)  
- [Catálogo (ejemplo)](#catálogo-ejemplo)  
- [Diseño y estilo](#diseño-y-estilo)  
- [Roadmap](#roadmap)  

---

## Descripción
Level-Up Gamer es un e-commerce enfocado en la comunidad gamer chilena. Nació como respuesta al aumento de la demanda durante la pandemia y busca entregar una experiencia de compra rápida, con identidad gamer y un programa de fidelización basado en gamificación.

**Misión:** ofrecer productos de alta calidad para gamers en Chile, con una experiencia de compra personalizada.  
**Visión:** ser la tienda online líder en Chile para el público gamer, con innovación y servicio al cliente de primer nivel.

> **Nota:** Los requerimientos funcionales y el alcance estarán sujetos a priorización y validación (p. ej. por docente o product owner). No todos los puntos del backlog necesariamente serán implementados en la primera versión.

---

## Características principales
- Registro y autenticación (solo mayores de 18 años).  
- Descuento permanente del **20%** para usuarios registrados con correo institucional **Duoc**.  
- Perfiles de usuario y preferencias personalizadas.  
- Catálogo con categorías y filtros avanzados.  
- Carrito de compras, resumen de precios y cálculo de totales.  
- Programa de referidos y puntos **LevelUp** (gamificación y canje por descuentos/productos).  
- Reseñas y calificaciones por producto.  
- Integración de soporte vía WhatsApp (chat que redirecciona).  
- Blog / sección de comunidad con noticias y guías (opcional).

---

## Estructura del proyecto

```
LEVEL-UP_GAMER
┬
├-> /assets
|   ├-> /img # Contiene imagenes colo logos, etc.
|   ├-> /json # Contiene archivos .json para simular base de datos.
|   ├-> estilos.css # Diseño general para la página.
|   └-> script.js # Código generico para el funcionamiento de la página.
|
├-> /src
|   ├-> /admin # Contiene todas las páginas necesarias para la sección de administradores
|   |   ├-> /JS # Contiene los códigos necesarios para la sección de administradores.
|   |   └-> home.html # Ejemplo de página.
|   |
|   └-> /tienda # Contiene todas las páginas necesarias para la sección de la tienda.
|        ├-> /JS # Contiene los códigos necesarios para la sección de la tienda.
|        └-> productos.html # Ejemplo de página.
|
├-> .gitignore
├-> index.html # Página de entrada al sitio web.
└-> README.md
```

---

## Catálogo (ejemplo)

**Categorías principales:**  
Juegos de mesa, Accesorios, Consolas, Computadores gamers, Sillas gamers, Mouse, Mousepad, Poleras / Polerones personalizados, Servicio técnico.

**Productos (muestra):**

| Código | Categoría      | Nombre                                  | Precio (CLP)      |
|--------|----------------|-----------------------------------------|------------------|
| JM001  | Juegos de Mesa | Catan                                   | $29.990          |
| AC002  | Accesorios     | Auriculares Gamer HyperX Cloud II       | $79.990          |
| CO001  | Consolas       | PlayStation 5                           | $549.990         |
| CG001  | Computadores   | PC Gamer ASUS ROG Strix                 | $1.299.990       |
| SG001  | Sillas Gamers  | Silla Gamer Secretlab Titan             | $349.990         |

---

## Diseño y estilo

- **Paleta:** Fondo negro `#000000`, acentos en Azul Eléctrico `#1E90FF` y Verde Neón `#39FF14`.  
- **Tipografías:** Roboto (texto), Orbitron (encabezados).  
- **Contraste:** Texto principal en blanco `#FFFFFF`, secundario en gris claro `#D3D3D3`.  
- **UI:** Estética moderna, componentes claros, buen contraste para accesibilidad.

---

## Roadmap

- Autenticación + validación edad + descuento Duoc  
- Catálogo básico + filtros y búsqueda  
- Carrito y flujo de compra (checkout)  
- Perfil de usuario y gestión de pedidos  
- Sistema de puntos LevelUp y referidos  
- Reseñas y calificaciones  
- Integración WhatsApp y soporte en vivo  
- Blog / sección comunidad y mapa de eventos
