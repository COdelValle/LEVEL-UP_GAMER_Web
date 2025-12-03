# 🔍 Guía de Debugging - Registro no Funciona

**Problema Reportado**: Al registrarse, el usuario no se crea en la BD

---

## 🧪 Pasos para Debuggear

### 1️⃣ Abre DevTools
```
Presiona: F12 o Ctrl+Shift+I
```

### 2️⃣ Ve a la pestaña Console
```
Busca los logs que empiezan con:
- 📤 Enviando registro a BD:
- ✅ Registro exitoso en BD:
- ❌ Error en registro de BD:
```

### 3️⃣ Revisa la pestaña Network
```
1. Abre DevTools (F12)
2. Ve a Network
3. Intenta registrarte
4. Busca el request a /api/v1/auth/register
5. Mira el Status (debe ser 200 o 201)
6. Mira la Response
```

---

## 🎯 Casos Comunes

### CASO 1: Error "Cannot connect"
```
Status: ❌ Conexión rechazada

SOLUCIÓN:
✓ Backend no está corriendo en http://localhost:8080
✓ Abre terminal: npm start (en proyecto backend)
```

### CASO 2: Error "400 Bad Request"
```
Response: {"message": "Campos requeridos faltando"}

SOLUCIÓN:
El backend espera ciertos campos. Verifica que envíes:
✓ nombre (string)
✓ apellido (string)  
✓ email (string, formato email)
✓ password (string, mín 6)
✓ rut (string, sin puntos)
✓ telefono (string, números limpios)
✓ rol (string, default "user")
✓ activo (boolean, default true)
```

### CASO 3: Error "409 Conflict"
```
Response: {"message": "Email ya existe"}

SOLUCIÓN:
✓ El email ya está registrado en BD
✓ Usa otro email
✓ O limpia la BD si es un test
```

### CASO 4: Registro "exitoso" pero no autentica
```
Console: ✅ Registro exitoso en BD:
Console: ⚠ Autenticación después del registro falló:

SOLUCIÓN:
✓ El usuario se creó en BD correctamente
✓ Pero el login falló (credenciales no coinciden)
✓ Intenta hacer login manual con email/password

VERIFICA:
- ¿El password se envió correctamente?
- ¿El email en la BD es idéntico?
- ¿El usuario está activo (activo=true)?
```

### CASO 5: No hay logs en Console
```
Significado: El submit ni siquiera se ejecutó

SOLUCIÓN:
✓ La validación falló (formulario incompleto)
✓ Revisa que todos los campos estén llenos
✓ Revisa errores rojos en el formulario
✓ Valida:
  - Email formato correcto (user@example.com)
  - RUT formato chileno (11.111.111-1)
  - Teléfono al menos 9 dígitos
  - Contraseña mínimo 6 caracteres
  - Contraseñas coincidan
```

---

## 📊 Payload que se Envía

Cuando haces clic en "Registrarse", se envía esto a `/api/v1/auth/register`:

```javascript
{
  nombre: "Juan",
  apellido: "Pérez",
  rut: "11111111-1",           // Limpió puntos automáticamente
  email: "juan@example.com",
  password: "miPassword123",
  telefono: "987654321",       // Solo números
  activo: true,
  rol: "user"
}
```

---

## 🔗 Endpoint Esperado en Backend

**Ruta**: `POST /api/v1/auth/register`

**Debe retornar** (ejemplo):
```javascript
// En caso de éxito (201):
{
  usuarioId: 123,
  nombre: "Juan",
  apellido: "Pérez",
  email: "juan@example.com",
  rol: "user",
  message: "Usuario registrado exitosamente"
}

// En caso de error (400/409):
{
  message: "Email ya existe" 
  // o
  message: "RUT inválido"
  // o
  message: "Campos requeridos: nombre, email, password"
}
```

---

## ✅ Checklist para Backend

Verifica que tu backend:

- [ ] Tiene endpoint `POST /api/v1/auth/register`
- [ ] Acepta campos: nombre, apellido, email, password, rut, telefono, rol, activo
- [ ] Valida email único en BD
- [ ] Valida RUT único en BD
- [ ] Crea usuario en tabla `usuarios`
- [ ] Retorna status 200/201 en éxito
- [ ] Retorna status 400/409 en error
- [ ] Incluye mensaje descriptivo en response

---

## 🐛 Debug Paso a Paso

### Paso 1: Verifica Backend Corriendo
```bash
# En otra terminal, ve a proyecto backend:
curl http://localhost:8080/api/v1/health
# Debe retornar: {"status":"UP"} o similar
```

### Paso 2: Intenta Registrarse Desde Frontend
```
1. Rellena formulario correctamente
2. Abre DevTools (F12)
3. Ve a Console
4. Click "Registrarse"
5. Busca logs con 📤, ✅ o ❌
```

### Paso 3: Revisa Network
```
1. DevTools → Network
2. Busca POST request a /api/v1/auth/register
3. Click en el request
4. Ve tab "Response"
5. Revisa qué error retorna (si hay)
```

### Paso 4: Valida Payload
```
En Network request:
1. Click en request
2. Tab "Request"
3. Ve "Request Payload"
4. Verifica campos sean correctos
5. Compara con lo que backend espera
```

---

## 💡 Soluciones Rápidas

| Síntoma | Solución |
|---------|----------|
| "Cannot reach server" | Backend no está corriendo |
| "Email required" | Falta email en formulario |
| "Invalid RUT" | RUT no pasa validación chilena |
| "Passwords don't match" | Confirmación de password diferente |
| "Email already exists" | Cambia el email de prueba |
| "Regresa a login después" | Usuario se creó, debe loguearse manualmente |
| No aparecen logs | Validación falló, revisa errores del form |

---

## 🎬 Video Mental del Flujo

```
Usuario llena form
        ↓
Click "Registrarse"
        ↓
Valida todos los campos (si falla → stop)
        ↓
Limpia datos (RUT, teléfono, etc)
        ↓
POST /api/v1/auth/register
        ↓
Backend responde ¿exitoso?
        ├─ SÍ (200/201) → Intenta autenticar
        │  ├─ Autenticación exitosa → Redirige a home
        │  └─ Autenticación falló → Redirige a login
        │
        └─ NO (400/409) → Muestra error específico
           └─ Fallback local (si lo necesita)
```

---

## 📝 Información que Reportar si Falla

Si aún no funciona, reporta:

1. **Error exacto en Console**: (copiar-pegar)
2. **Status del Network request**: (200, 404, 500, etc)
3. **Response del servidor**: (copiar-pegar JSON)
4. **Pasos exactos que seguiste**: (para reproducir)
5. **¿Backend está corriendo?**: (sí/no)

---

## 🚀 Si Todo Funciona

Verás esto en Console:

```
📤 Enviando registro a BD: {nombre: "Juan", ...}
✅ Registro exitoso en BD: {usuarioId: 123, ...}
✅ Autenticación exitosa: {token: "eyJ...", user: {...}}
```

Y luego te redirigirá a Home automáticamente.

---

**Próximo paso**: Copia los logs de Console y comparte qué error exacto ves 👇
