# 🧪 GUÍA DE TESTING - Migración BD

**Fecha**: Diciembre 2, 2025
**Objetivo**: Verificar que todas las páginas cargan datos desde la BD correctamente

---

## ✅ Requisitos Previos

- Backend corriendo en `http://localhost:8080`
- BD Oracle conectada y con datos
- Frontend corriendo en `http://localhost:5173`
- Estar logueado como usuario válido

---

## 📋 Casos de Prueba

### 1️⃣ Página de Productos Públicos

**URL**: `http://localhost:5173/productos`

**Pasos**:
1. Abrir la página
2. Esperar a que cargue (debe haber spinner)
3. Verificar que se muestran productos
4. Abrir DevTools → Network
5. Buscar request a `/api/v1/productos`

**Validaciones**:
- [x] Spinner visible mientras carga
- [x] Products renderizados desde BD
- [x] Request a `/api/v1/productos` con status 200
- [x] Los productos tienen IDs correctos
- [x] Filtros funcionan con datos de BD
- [x] Búsqueda funciona

**Error**: Si no muestra nada
```
→ Verificar que backend está en 8080
→ Verificar que hay productos en BD (ejecutar GET en Postman)
→ Verificar token en localStorage
```

---

### 2️⃣ Página de Blogs

**URL**: `http://localhost:5173/blog`

**Pasos**:
1. Abrir página
2. Esperar loading
3. Verificar que se muestran blogs
4. DevTools → Network → buscar `/api/v1/blogs`

**Validaciones**:
- [x] Spinner visible
- [x] Blogs mostrados desde BD
- [x] Categorías filtran correctamente
- [x] Búsqueda funciona
- [x] Estadísticas calculadas (total posts, likes, views)
- [x] Request GET `/api/v1/blogs` con 200

**Esperar**: Request debe tardar menos de 2 segundos

---

### 3️⃣ Detalle de Blog Individual

**URL**: `http://localhost:5173/blog/1` (reemplazar 1 por ID real)

**Pasos**:
1. Desde página de blogs, click en un blog
2. Esperar loading
3. Verificar que cargó el blog específico
4. DevTools → Network → verificar `/api/v1/blogs`

**Validaciones**:
- [x] Blog encontrado en BD
- [x] Contenido mostrado correctamente
- [x] Posts relacionados cargados
- [x] Navigation anterior/siguiente funciona
- [x] Contador de vistas incrementa

**Error**: "Blog no encontrado"
```
→ Verificar que el ID existe en BD
→ Verificar que `/api/v1/blogs` retorna ese ID
→ Revisar console.log en browser
```

---

### 4️⃣ Admin - Productos Críticos

**URL**: `http://localhost:5173/admin/productos/criticos`

**Pasos**:
1. Login como admin
2. Ir a Admin → Productos → Críticos
3. Esperar loading
4. Verificar que muestra productos con stock bajo

**Validaciones**:
- [x] Loading spinner visible
- [x] Productos críticos mostrados
- [x] Filtros funcionan (todos, agotados, críticos)
- [x] Botón "Aumentar Stock" funciona
- [x] Al aumentar stock, se actualiza en BD

**Aumentar Stock**:
1. Click en "Aumentar Stock"
2. Ingresar cantidad
3. Confirmar
4. Verificar en DevTools que se envió PUT a `/api/v1/productos/{id}`
5. Verificar que el stock se actualizó en la tabla
6. Refrescar página → stock debe mantenerse (persistido en BD)

---

### 5️⃣ Admin - Crear Producto

**URL**: `http://localhost:5173/admin/productos/nuevo-producto`

**Pasos**:
1. Login como admin
2. Ir a Admin → Productos → Nuevo Producto
3. Llenar formulario
4. Click "Crear Producto"

**Validaciones**:
- [x] Se envía POST a `/api/v1/productos`
- [x] Producto guardado en BD
- [x] Redirecciona a lista de productos
- [x] Nuevo producto aparece en lista
- [x] Refrescar → producto sigue ahí (persistido)

---

### 6️⃣ Admin - Editar Producto

**URL**: `http://localhost:5173/admin/productos/{id}/editar-producto`

**Pasos**:
1. Login como admin
2. Ir a Admin → Productos → Editar un producto
3. Cambiar algún campo
4. Click "Guardar Cambios"

**Validaciones**:
- [x] Se envía GET a `/api/v1/productos/{id}` para cargar
- [x] Se envía PUT a `/api/v1/productos/{id}` para guardar
- [x] Cambios guardados en BD
- [x] Redirecciona a lista
- [x] Refrescar → cambios persisten

---

### 7️⃣ Admin - Crear Usuario

**URL**: `http://localhost:5173/admin/usuarios/nuevo-usuario`

**Pasos**:
1. Login como admin
2. Ir a Admin → Usuarios → Nuevo Usuario
3. Llenar formulario
4. Click "Crear Usuario"

**Validaciones**:
- [x] POST a `/api/v1/usuarios`
- [x] Usuario guardado en BD
- [x] Refrescar → usuario sigue ahí

---

### 8️⃣ Admin - Editar Usuario + Cambiar Contraseña

**URL**: `http://localhost:5173/admin/usuarios/{id}/editar-usuario`

**Pasos A - Editar Datos**:
1. Cambiar nombre, email, rol
2. Dejar campos de contraseña vacíos
3. Click "Guardar"

**Validaciones A**:
- [x] PUT a `/api/v1/usuarios/{id}` SIN password
- [x] Datos actualizados en BD
- [x] Contraseña no cambió

**Pasos B - Cambiar Contraseña**:
1. Editar usuario nuevamente
2. Dejar datos en blanco, llenar solo:
   - Nueva Contraseña: "nuevapass123"
   - Confirmar: "nuevapass123"
3. Click "Guardar"

**Validaciones B**:
- [x] PUT a `/api/v1/usuarios/{id}` CON password en payload
- [x] Contraseña cambió en BD
- [x] Usuario puede loguearse con nueva contraseña

**Pasos C - Cambiar Datos + Contraseña Juntos**:
1. Cambiar nombre Y llenar contraseña
2. Click "Guardar"

**Validaciones C**:
- [x] PUT incluye AMBOS cambios
- [x] Datos actualizados AND contraseña actualizada

---

### 9️⃣ Admin - Aprobar/Rechazar Boletas

**URL**: `http://localhost:5173/admin/boletas`

**Pasos**:
1. Login como admin
2. Ir a Admin → Boletas
3. Encontrar boleta con estado "pendiente"
4. Click "Aprobar"

**Validaciones**:
- [x] GET `/api/v1/ordenes` retorna boletas
- [x] PUT `/api/v1/ordenes/{id}` con `{ estado: 'aprobado' }`
- [x] Estado cambia en BD
- [x] Color cambia en UI (amarillo → verde)
- [x] Refrescar → estado persiste

**Rechazar**:
1. Encontrar otra boleta
2. Click "Rechazar"
3. PUT con `{ estado: 'rechazado' }`
4. Color cambia a rojo
5. Refrescar → persiste

---

## 🔴 Pruebas de Error Handling

### Escenario 1: Backend Apagado

**Pasos**:
1. Apagar backend
2. Ir a `/productos`
3. Esperar a que intente cargar

**Esperado**:
- [x] Spinner visible por unos segundos
- [x] Error message: "Error cargando productos de la BD"
- [x] Botón o link para volver atrás
- [x] NO debe fallback a JSON
- [x] Console muestra error de conexión

### Escenario 2: BD Sin Datos

**Pasos**:
1. Asegurar que backend está OK
2. Ir a `/blog` con BD vacía

**Esperado**:
- [x] Carga correctamente
- [x] Muestra lista vacía
- [x] No crashes
- [x] Estadísticas muestran 0

### Escenario 3: Post No Encontrado

**Pasos**:
1. Intentar ir a `/blog/99999` (ID inexistente)

**Esperado**:
- [x] Spinner visible
- [x] Error message: "Blog no encontrado"
- [x] Botón "Volver atrás" funciona
- [x] No crash

---

## 📊 Verificaciones en DevTools

### Network Tab

**Verificar en cada test**:

```
GET /api/v1/productos       → Status 200, Response es array
GET /api/v1/blogs          → Status 200, Response es array
POST /api/v1/usuarios      → Status 201, Response es objeto
PUT /api/v1/productos/{id} → Status 200, Response actualizado
PUT /api/v1/ordenes/{id}   → Status 200, Response con estado nuevo
```

### Console Tab

**Verificar**:
- No hay errores de "Cannot read property of undefined"
- No hay warnings de JSON fallback
- No hay requests a `/src/assets/data/`

**Búsqueda de errores comunes**:
```javascript
// En console, no debe haber:
"falling back to"
"fallback"
"JSON"
// Sí debe haber:
"Loading..."
"useProducts:"
"useBlog:"
```

### Local Storage

**Verificar**:
```javascript
// En DevTools > Application > LocalStorage
{
  "token": "eyJ0eXAi...",
  "user": {
    "id": 1,
    "nombre": "Admin",
    "role": "admin"
  }
}
```

---

## ✅ Checklist Final

### ✅ Productos
- [ ] Página pública carga desde BD
- [ ] Admin - Nuevo funciona
- [ ] Admin - Editar funciona
- [ ] Admin - Ver funciona
- [ ] Admin - Críticos carga desde BD

### ✅ Blogs
- [ ] Página pública carga desde BD
- [ ] Detalle carga desde BD
- [ ] Categorías filtran
- [ ] Búsqueda funciona
- [ ] Relacionados carga desde BD

### ✅ Usuarios
- [ ] Admin - Nuevo funciona
- [ ] Admin - Editar funciona
- [ ] Admin - Cambio de contraseña funciona

### ✅ Órdenes
- [ ] Admin - Boletas carga desde BD
- [ ] Admin - Aprobar actualiza BD
- [ ] Admin - Rechazar actualiza BD

### ✅ Error Handling
- [ ] Sin backend: muestra error
- [ ] BD vacía: muestra lista vacía
- [ ] Post no existe: muestra error
- [ ] No hay crashes

### ✅ Performance
- [ ] Carga <2 segundos
- [ ] Filtros responden rápido
- [ ] Búsqueda es fluida

---

## 📸 Screenshots Esperados

### Productos (Loading)
```
[Spinner girando]
Cargando productos...
```

### Productos (Cargado)
```
[Grid de productos]
RTX 4090 - $1,999
RTX 4080 - $1,199
...
```

### Blog (Error)
```
❌ Error cargando blogs de la BD
Por favor intenta más tarde

[Botón: Volver atrás]
```

---

## 🐛 Debugging Tips

### Si muestra "undefined" en lista:

```javascript
// DevTools Console
// Verificar qué devuelve la API
fetch('http://localhost:8080/api/v1/productos', {
  headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
}).then(r => r.json()).then(d => console.log(d))
```

### Si no carga:

```javascript
// Verificar token
localStorage.getItem('token')

// Verificar endpoint
// Ir a http://localhost:8080/api/v1/productos en Postman/Thunder Client
```

### Si aparece JSON local:

```
❌ PROBLEMA: La página está importando de JSON
✅ SOLUCIÓN: Usar el hook (useProducts, useBlog)
```

---

## 📞 Soporte Rápido

| Problema | Solución |
|----------|----------|
| "No se carga nada" | ¿Backend en 8080? ¿Hay datos en BD? |
| "Error 401" | Token expirado, hacer login |
| "Error 404" | Endpoint no existe en backend |
| "Error 500" | Error en backend, revisar logs |
| "Muestra JSON" | No debe pasar, revisar imports |

---

## ✨ Éxito

Cuando TODO funcione correctamente:

✅ Todas las páginas públicas cargan desde BD
✅ Todos los admin CRUD usan API
✅ Error handling funciona
✅ Loading states visibles
✅ No hay imports de JSON
✅ Datos persisten en BD
✅ Refrescar mantiene los cambios

🎉 **Migración 100% Completada**

