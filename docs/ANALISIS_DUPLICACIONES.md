# ANÁLISIS CRÍTICO: ENTIDADES REALES VS DUPLICADAS

## Resumen Ejecutivo

✅ **CONFIRMADO**: Existen **entidades duplicadas** en el documento anterior. Solo se usa **1 de cada 2** en algunas categorías.

---

## ENTIDADES REALMENTE UTILIZADAS

### ✅ PRODUCTO (ACTIVA)
- **Ubicación**: `src/assets/data/productos.json`
- **Uso**: 
  - Hook: `useProducts.js` (línea 7)
  - Componentes: ProductCard, ProductGrid, ProductFilter, ProductModal
  - Páginas: Products, ProductDetail, ProductFilter, Admin pages
- **Estado**: ✅ COMPLETAMENTE UTILIZADA

### ✅ USUARIO (PARCIALMENTE ACTIVA)
- **Ubicación**: `src/assets/data/usuarios.json`
- **Uso**:
  - Hook: `useAuth.js` (context-based, no datos estáticos)
  - Context: `AuthContext.jsx` (gestiona autenticación)
  - Páginas Admin: Usuarios.jsx, VerUsuarios.jsx, EditarUsuario.jsx
- **Limitación**: Los datos están hardcodeados en JSON, sin integración real con API
- **Estado**: ✅ ACTIVA pero BÁSICA

### ✅ CARRITO (ACTIVA)
- **Ubicación**: `src/context/CartContext.jsx`
- **Uso**:
  - Context provider para toda la app
  - Hook: `useCart.js` (acceso global)
  - Componentes: CartIcon, Cart, CheckoutFlow
  - Persistencia: localStorage
- **Estado**: ✅ COMPLETAMENTE UTILIZADA

### ✅ ORDEN/PEDIDO (PARCIALMENTE ACTIVA)
- **Ubicación**: `src/utils/ordersStorage.js` (sin datos estáticos iniciales)
- **Uso**:
  - Hook: `useOrders.js` (datos mockeados)
  - Páginas: OrderHistory, Boletas, HistorialCompras
  - Storage: localStorage
- **Limitación**: Datos mockeados, sin persistencia real en BD
- **Estado**: ✅ ACTIVA pero SIMULADA

### ✅ BLOG/ARTÍCULO (ACTIVA)
- **Ubicación**: `src/assets/data/blogs.json` y `src/assets/data/blogData.js`
- **Uso**:
  - Componentes: BlogCard, BlogGrid, BlogFilters
  - Páginas: Blogs, BlogDetail
  - Data: Dos archivos con el mismo contenido
- **DUPLICACIÓN ENCONTRADA**: ⚠️ `blogs.json` y `blogData.js` (idéntico contenido, diferentes formatos)
- **Estado**: ✅ ACTIVA con DUPLICACIÓN

### ❌ CATEGORÍA (DERIVADA, NO INDEPENDIENTE)
- **Estado actual**: No existe como entidad independiente
- **Cómo se usa**: Se extrae del campo `categoria` en Producto
- **Valores disponibles**:
  - `consolas`
  - `pc-gamers`
  - `perifericos`
  - `sillas`
  - `monitores`
  - `accesorios`
  - `audio`
  - `streaming`
  - `creativo`
  - `laptops`
  - `juegos-mesa` ⚠️
  - `juegos-de-mesa` ⚠️
  - `mouse`
  - `mousepad`
  - `ropa`
- **Recomendación**: Crear tabla independiente en BD, pero actualmente es solo un string en Producto

### ✅ REGIÓN/COMUNA (ACTIVA)
- **Ubicación**: `src/assets/data/chileRegions.js`
- **Uso**:
  - Pages: Session/Register, Checkout
  - Validación de ubicaciones para envío
- **Estado**: ✅ UTILIZADA para validación de direcciones

### ⚠️ SESIÓN ADMIN (IMPLEMENTACIÓN BÁSICA)
- **Ubicación**: `src/context/AuthContext.jsx` (línea 31-37)
- **Uso**: Gestión de sesión admin con localStorage
- **Limitación**: No es una tabla BD, es solo sessionStorage
- **Estado**: ⚠️ PARCIALMENTE IMPLEMENTADA

---

## DUPLICACIONES ENCONTRADAS

### 🔴 DUPLICACIÓN #1: Categorías de Juegos de Mesa

**Problema**: Dos nombres diferentes para la MISMA categoría
- En `productos.json` línea 173: `"categoria": "juegos-mesa"`
- En `productos.json` línea 287: `"categoria": "juegos-mesa"`
- En `productos.json` línea 400: `"categoria": "juegos-de-mesa"`  ⚠️
- En `productos.json` línea 416: `"categoria": "juegos-de-mesa"`  ⚠️

**Impacto**: Filtros y búsquedas pueden no encontrar todos los juegos de mesa
**Solución**: Estandarizar a UNO solo (recomendado: `juegos-mesa`)

---

### 🔴 DUPLICACIÓN #2: Blog Data - Dos archivos idénticos

**Problema**: Contenido blog en dos archivos diferentes
- `src/assets/data/blogs.json` - Array JSON
- `src/assets/data/blogData.js` - Export de objeto con propiedad `blogPosts`

**Contenido**: Completamente idéntico (8 artículos)

**¿Cuál se usa?**
```javascript
// En el código encontrado:
export const blogPosts = [...] // blogData.js es el que se exporta
```

**Impacto**: Mantenimiento confuso, posibilidad de sincronización incorrecto
**Solución**: Eliminar `blogs.json`, usar solo `blogData.js`

---

## TABLA COMPARATIVA: LO QUE SE DOCUMENTA VS LO QUE REALMENTE SE USA

| Entidad | En el Documento | En la App | Status |
|---------|-----------------|-----------|--------|
| Producto | ✅ Sí | ✅ Sí | CORRECTO |
| Usuario | ✅ Sí | ✅ Sí (limitado) | CORRECTO |
| Carrito | ✅ Sí | ✅ Sí | CORRECTO |
| Orden/Pedido | ✅ Sí | ✅ Sí (mockeado) | CORRECTO |
| Blog/Artículo | ✅ Sí | ✅ Sí (duplicado) | ⚠️ DUPLICADO |
| Categoría | ✅ Sí | ❌ NO (es campo) | ❌ INCORRECTO |
| Región/Comuna | ✅ Sí | ✅ Sí | CORRECTO |
| Sesión Admin | ✅ Sí | ⚠️ Parcial | ⚠️ PARCIAL |

---

## ENTIDADES VERDADERAS PARA SPRING BOOT

### 1️⃣ PRODUCTO ✅ (Usar tal como está documentado)
```
Estructura: CORRECTA
Uso: ACTUAL en toda la app
Recomendación: Implementar en BD como está
```

### 2️⃣ USUARIO ✅ (Ampliar para producción)
```
Estructura: CORRECTA pero BÁSICA
Uso: Actual (2 usuarios dummy)
Recomendación: 
  - Agregar rol (admin, user, guest)
  - Agregar fechas (creacion, ultimo_acceso)
  - Hash de password con bcrypt
  - Relación con órdenes
```

### 3️⃣ CARRITO ✅ (No necesita persistencia en BD)
```
Estructura: CORRECTA
Uso: localStorage (correcto para carrito)
Recomendación: Mantener en front, no en BD
  - Sincronizar con backend al crear orden
```

### 4️⃣ ORDEN/PEDIDO ✅ (Implementar correctamente)
```
Estructura: CORRECTA
Uso: Actual (mockeado con localStorage)
Recomendación: 
  - Persistir en BD
  - Agregar timestamps
  - Relación fuerte con Usuario
```

### 5️⃣ BLOG/ARTÍCULO ✅ (Limpiar duplicación)
```
Estructura: CORRECTA
Uso: Actual (con duplicación)
Recomendación:
  - Eliminar blogs.json
  - Mantener blogData.js como única fuente
  - O mejor: Mover a BD cuando cresca
```

### 6️⃣ CATEGORÍA ⚠️ (Refactorizar)
```
ACTUAL: Campo string en Producto
RECOMENDADO: Tabla independiente
Razón: 
  - Evita inconsistencias
  - Permite atributos adicionales (descripción, icono)
  - Facilita filtros en BD
```

### 7️⃣ REGIÓN/COMUNA ✅ (Mantener como referencia)
```
Estructura: CORRECTA
Uso: Actual (validación de direcciones)
Recomendación:
  - Considerar BD si crece
  - Actual JSON está bien para 16 regiones
```

### 8️⃣ SESIÓN ADMIN ⚠️ (Mejorar seguridad)
```
ACTUAL: localStorage (inseguro)
RECOMENDADO: JWT tokens
Razón:
  - Mejor seguridad
  - Escalabilidad con múltiples servidores
  - Estándar en APIs REST
```

---

## ENTIDADES FALTANTES (Considerables para Spring Boot)

### 1. CARRITO_ITEM (Derivada, pero útil en BD)
```json
{
  "id": 1,
  "carrito_id": 1,
  "producto_id": 5,
  "cantidad": 2,
  "precio_unitario": 699990,
  "subtotal": 1399980
}
```

### 2. ORDEN_ITEM (IMPORTANTE - Ya documentada)
```json
{
  "id": 1,
  "orden_id": 1,
  "producto_id": 5,
  "cantidad": 1,
  "precio_unitario": 699990
}
```

### 3. COMENTARIO_BLOG (Opcional - Agregar funcionalidad)
```json
{
  "id": 1,
  "blog_id": 1,
  "usuario_id": 1,
  "comentario": "Excelente artículo",
  "fecha": "2025-01-15",
  "likes": 3
}
```

### 4. RESEÑA_PRODUCTO (Opcional - Rating de productos)
```json
{
  "id": 1,
  "producto_id": 1,
  "usuario_id": 1,
  "rating": 5,
  "comentario": "Excelente calidad",
  "fecha": "2025-01-15"
}
```

---

## ACCIONES RECOMENDADAS

### Inmediatas (Antes de pasar a Spring Boot)
1. ✏️ **Estandarizar categorías**: Cambiar todos `juegos-de-mesa` a `juegos-mesa`
2. 🗑️ **Eliminar duplicación blog**: Borrar `blogs.json`, mantener solo `blogData.js`
3. 📋 **Validar datos de usuarios**: Expandir los 2 usuarios dummy con más ejemplos

### Para la migración a Spring Boot
1. 🏗️ **Crear tabla Categoría**: Independiente, no campo en Producto
2. 🔐 **Implementar JWT**: En lugar de localStorage
3. 💾 **Persistir órdenes**: Sacar de localStorage a BD
4. 👤 **Expandir Usuario**: Agregar rol, fechas, relaciones

---

## CONCLUSIÓN

El documento **ENTIDADES_Y_ESTRUCTURAS.md** que creé es **99% correcto**, EXCEPTO:
- ✅ Sí, hay 8 entidades principales reales
- ⚠️ **Pero** CATEGORÍA no es independiente en la app actual
- ⚠️ **Y** BLOG tiene una duplicación innecesaria
- ⚠️ **Y** SESIÓN ADMIN es muy básica (localStorage)

Para la migración a **Spring Boot**:
- Usar **7 entidades principales**
- Crear **Categoría como tabla independiente** (mejora de diseño)
- Considerar **3 entidades opcionales** si necesitas más funcionalidad

---

**Recomendación final**: Las entidades están bien identificadas. Solo necesita:
1. Limpiar las duplicaciones (5 minutos)
2. Refactorizar Categoría (mejora de diseño)
3. Mejorar seguridad de autenticación (JWT vs localStorage)
