# CRUD Admin - Migración a API ✅

## Resumen
Se han migrado **TODOS** los CRUD del panel admin para usar la API real en `http://localhost:8080`. Cada operación (crear, actualizar, eliminar) ahora hace una llamada al backend y persiste los datos en la base de datos Oracle según corresponda.

---

## 📦 Componentes Actualizados

### 1. **Productos** 🛍️

#### `src/pages/admin/Productos/NuevoProducto.jsx`
- ✅ **Cambio**: `localStorage` → `api.post('/api/v1/productos')`
- ✅ Validación de campos
- ✅ Manejo de errores con mensajes claros
- ✅ Redirección a `/admin/productos` después de crear

**Payload enviado al backend:**
```json
{
  "nombre": "string",
  "precio": "number",
  "categoria": "string",
  "descripcion": "string",
  "stock": "integer",
  "imagen": "string (URL)"
}
```

---

#### `src/pages/admin/Productos/EditarProducto.jsx`
- ✅ **Cambio**: Cargar del backend con `api.get('/api/v1/productos/{id}')`
- ✅ Actualizar con `api.put('/api/v1/productos/{id}')`
- ✅ Manejo de loading state mientras se cargan datos
- ✅ Error handling y notificaciones

**Operación:**
```javascript
// Cargar
const res = await api.get(`/api/v1/productos/${id}`);

// Guardar cambios
const updated = await api.put(`/api/v1/productos/${id}`, payload);
```

---

#### `src/pages/admin/Productos/VerProducto.jsx`
- ✅ **Cambio**: Datos simulados → `api.get('/api/v1/productos/{id}')`
- ✅ Loading state mejorado
- ✅ Error handling con botón para volver
- ✅ Muestra información real del producto

---

### 2. **Usuarios** 👥

#### `src/pages/admin/Usuario/NuevoUsuario.jsx`
- ✅ **Cambio**: `localStorage` → `api.post('/api/v1/usuarios')`
- ✅ Validación mejorada (email, RUT, contraseña)
- ✅ Campos adaptados al modelo backend

**Payload:**
```json
{
  "nombre": "string",
  "apellido": "string",
  "email": "string",
  "password": "string",
  "rol": "user|admin",
  "activo": "boolean",
  "telefono": "string",
  "rut": "string"
}
```

---

#### `src/pages/admin/Usuario/EditarUsuario.jsx`
- ✅ **Cambio**: Datos simulados → `api.get('/api/v1/usuarios/{id}')`
- ✅ Actualizar datos del usuario con `api.put('/api/v1/usuarios/{id}')`
- ✅ **NUEVO**: Cambio de contraseña integrado ✨
  - Campo para nueva contraseña (opcional)
  - Confirmación de contraseña
  - Validación de coincidencia
  - Si se proporciona, se incluye en el payload

**Cambio de contraseña:**
```javascript
if (passwordData.newPassword) {
  payload.password = passwordData.newPassword;
}

// PUT a /api/v1/usuarios/{id} incluirá el nuevo password
```

---

### 3. **Boletas/Órdenes** 📋

#### `src/pages/admin/Boleta/Boletas.jsx`
- ✅ **Cambio**: `getOrders()` (localStorage) → `api.get('/api/v1/ordenes')`
- ✅ Cargar boletas/órdenes desde el backend
- ✅ **NUEVO**: Aprobar/Rechazar pagos con `api.put('/api/v1/ordenes/{id}')`
- ✅ Loading state y error handling
- ✅ Búsqueda y filtrado en lista

**Operaciones:**
```javascript
// Listar todas las órdenes
const res = await api.get('/api/v1/ordenes');

// Aprobar una orden
await api.put(`/api/v1/ordenes/${orderId}`, { estado: 'aprobado' });

// Rechazar una orden
await api.put(`/api/v1/ordenes/${orderId}`, { estado: 'rechazado' });
```

---

## 🔑 Endpoints Backend Requeridos

El backend debe tener los siguientes endpoints implementados:

### Productos
- `GET /api/v1/productos` - Listar todos
- `GET /api/v1/productos/{id}` - Obtener por ID
- `POST /api/v1/productos` - Crear
- `PUT /api/v1/productos/{id}` - Actualizar
- `DELETE /api/v1/productos/{id}` - Eliminar

### Usuarios
- `GET /api/v1/usuarios` - Listar todos
- `GET /api/v1/usuarios/{id}` - Obtener por ID
- `POST /api/v1/usuarios` - Crear
- `PUT /api/v1/usuarios/{id}` - Actualizar (incluyendo cambio de contraseña)
- `DELETE /api/v1/usuarios/{id}` - Eliminar

### Órdenes/Boletas
- `GET /api/v1/ordenes` - Listar todas
- `GET /api/v1/ordenes/{id}` - Obtener por ID
- `PUT /api/v1/ordenes/{id}` - Actualizar estado

---

## 🔐 Autenticación

Todos los requests incluyen automáticamente el header:
```
Authorization: Bearer {token}
```

El token se obtiene y almacena en `AuthContext` cuando el usuario hace login.

---

## ✨ Features Nuevos

### 1. **Cambio de Contraseña**
En `EditarUsuario`, ahora hay una sección dedicada para cambiar la contraseña del usuario:
- Campos opcionales (puede dejar vacío para no cambiar)
- Validación de coincidencia
- Validación de longitud mínima (6 caracteres)

### 2. **Manejo de Errores Mejorado**
- Mensajes de error claros en cada formulario
- Alerts con emojis para mejor UX
- Estados de loading para todas las operaciones

### 3. **Operaciones de Boletas**
- Aprobar/Rechazar pagos desde la lista
- Visualización del estado actual
- Colores indicadores por estado (verde=aprobado, rojo=rechazado, amarillo=pendiente)

---

## 🧪 Cómo Probar

### 1. **Asegurate que el backend esté corriendo**
```bash
# En la terminal del backend
java -jar nivel-up-gamer.jar
# Debe estar en http://localhost:8080
```

### 2. **Inicia el frontend**
```bash
# En la carpeta del frontend
npm run dev
```

### 3. **Prueba los CRUD**

#### Crear Producto
1. Login como admin
2. Ir a `Panel Admin` → `Productos` → `Nuevo Producto`
3. Llenar formulario
4. Hacer clic en "Crear Producto"
5. ✅ Verificar que aparezca en la lista y en BD

#### Editar Usuario
1. Ir a `Panel Admin` → `Usuarios`
2. Hacer clic en un usuario (o crear uno nuevo)
3. Cambiar datos básicos o contraseña
4. Hacer clic en "Guardar Cambios"
5. ✅ Verificar que se actualice en BD

#### Aprobar/Rechazar Boleta
1. Ir a `Panel Admin` → `Boletas`
2. Hacer clic en "Aprobar" o "Rechazar"
3. Confirmar acción
4. ✅ Verificar que el estado cambie y se actualice en BD

---

## 📝 Cambios Técnicos

### Hooks Actualizados
- **`useProducts`**: Ahora usa `api.get('/api/v1/productos')` con fallback a JSON local
- **`useOrders`**: Nuevo hook para listar órdenes del usuario o admin
- **`useBlog`**: Nuevo hook para listar posts de blog desde API

### AuthContext
- `api` expuesto para usar en componentes
- `authenticate(email, password)` disponible para login

### Validaciones
- Campos requeridos marcados con `*`
- Validación de email, teléfono, RUT, contraseña
- Mensajes de error claros en tiempo real

---

## ⚠️ Notas Importantes

1. **Persistencia**: Todos los datos se guardan en la BD Oracle, no en localStorage
2. **Fallback**: Si la API no está disponible, algunos hooks usan datos locales como fallback
3. **Errores**: Cada operación muestra mensaje de error si falla
4. **Redirecciones**: Después de operaciones exitosas, se redirige a la lista correspondiente
5. **Cambios en base de datos**: Asegurate que el backend esté sincronizado con los esquemas esperados

---

## 🎯 Próximos Pasos (Opcionales)

1. Implementar paginación en listas
2. Agregar filtros avanzados (fecha, estado, categoría)
3. Exportar a PDF/Excel
4. Confirmaciones más detalladas antes de operaciones peligrosas
5. Auditoría de cambios (quién cambió qué y cuándo)

---

**Estado**: ✅ COMPLETADO - TODO el CRUD funciona con API real
**Última actualización**: Diciembre 2025
