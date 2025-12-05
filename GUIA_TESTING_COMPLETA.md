# 🧪 Guía Completa de Testing - Registro

## 📋 Índice

1. Test automático del backend
2. Debugging en el navegador
3. Verificación en BD
4. Soluciones para problemas comunes

---

## 🤖 TEST 1: Automático (Recomendado Primero)

### Paso 1: Corre el script de test

```bash
# En la terminal del proyecto frontend (en la raíz)
node testRegister.js
```

### Paso 2: Interpreta los resultados

#### Resultado EXITOSO:
```
✅ Backend está activo en http://localhost:8080
✅ Registro exitoso (Status 201)
ℹ️  Response:
{
  "usuarioId": 123,
  "nombre": "Test",
  ...
}
✅ Validación de email duplicado funciona correctamente
```
**Significa**: Backend está corriendo y endpoint funciona. Problema es en frontend.

#### Resultado: "Cannot connect to backend"
```
❌ No se puede conectar a http://localhost:8080
ℹ️  Asegúrate que el backend esté corriendo
```
**Significa**: Backend no está activo. Necesitas iniciarlo.

#### Resultado: Status 400/409
```
⚠️  Registro falló (Status 400)
ℹ️  Response:
{
  "message": "Email already exists"
}
```
**Significa**: Endpoint existe pero rechazó el usuario. Prueba con otro email.

---

## 🌐 TEST 2: Navegador (Frontend)

### Paso 1: Abre las DevTools

```
Presiona: F12 (o Ctrl+Shift+I)
```

### Paso 2: Ve a pestaña Console

```
DevTools → Console
```

Limpia los logs anteriores:
```
Botón "Clear" o escribe: clear()
```

### Paso 3: Ve a la página de Registro

```
http://localhost:5173/session/register
```

### Paso 4: Llena el formulario

```
Nombre: Juan
Apellido: Pérez
Nickname: juanperez
Email: juanperez@test.com
RUT: 11.111.111-1 (o 11111111-1)
Teléfono: 987654321 (9 dígitos)
Contraseña: Password123 (mín 6 chars)
Confirmar: Password123 (debe coincidir)
```

### Paso 5: Abre Network Tab

```
DevTools → Network
```

Ahora verás todos los requests en tiempo real.

### Paso 6: Click "Registrarse"

Busca en Console:

```javascript
// DEBES VER ESTO (en orden):

📤 Enviando registro a BD: {
  nombre: "Juan",
  apellido: "Pérez",
  rut: "11111111-1",     // ← Sin puntos (fue limpiado)
  email: "juanperez@test.com",
  password: "Password123",
  telefono: "987654321", // ← Solo números (fue limpiado)
  activo: true,
  rol: "user"
}

// Luego VE en Network:
// POST /api/v1/auth/register
// Status: 201 ✅ (o 200)
// Response: { usuarioId: 123, ... }

✅ Registro exitoso en BD: {
  usuarioId: 123,
  nombre: "Juan",
  ...
}

✅ Autenticación exitosa: {
  token: "eyJhbGciOi...",
  user: { id: 123, ... }
}
```

### Paso 7: Verifica Redirección

Si ves ✅ para todo, deberías estar en:
```
http://localhost:5173/
```

(Home page)

---

## 🗄️ TEST 3: Base de Datos

### Para Oracle SQL Client:

```sql
-- Conéctate a tu base de datos Oracle

-- Busca el usuario que acabas de registrar
SELECT * FROM USUARIOS 
WHERE EMAIL = 'juanperez@test.com';

-- Debes ver algo como:
-- ID  | NOMBRE | APELLIDO | EMAIL | RUT | TELEFONO | ROL | ACTIVO
-- 123 | Juan   | Pérez    | juan..| ... | ...      | user| 1/Y
```

### Para MongoDB (si lo usas):

```javascript
// En MongoDB Compass o cli:
db.usuarios.findOne({ email: "juanperez@test.com" })

// Debe retornar:
{
  _id: ObjectId(...),
  nombre: "Juan",
  apellido: "Pérez",
  email: "juanperez@test.com",
  rut: "11111111-1",
  telefono: "987654321",
  rol: "user",
  activo: true,
  createdAt: ISODate(...)
}
```

---

## 🐛 DEBUGGING DE PROBLEMAS

### ❌ Problema: "Cannot reach server"

**Síntomas**:
```
network tab → Rojo
Console: GET /api/v1/health → Error
```

**Solución**:

1. Verifica que backend está corriendo:
```bash
# En nueva terminal, ve a tu proyecto Spring Boot
mvn spring-boot:run
# O con Gradle:
./gradlew bootRun
```

2. Verifica puerto 8080 disponible:
```bash
# En PowerShell:
Get-NetTCPConnection -LocalPort 8080 | Select-Object State

# Si algo usa el puerto:
netstat -ano | findstr :8080
```

3. Mata el proceso usando puerto 8080:
```bash
# En PowerShell (como admin):
Get-Process -Id (Get-NetTCPConnection -LocalPort 8080).OwningProcess | Stop-Process -Force
```

---

### ❌ Problema: "Email already exists"

**Síntomas**:
```
❌ Error en registro de BD: Email ya existe
Console: Status 409
```

**Solución**:

Opción 1 - Usa otro email:
```
Email: juantest2@test.com
```

Opción 2 - Limpia BD (solo para testing):
```sql
-- Oracle:
DELETE FROM USUARIOS WHERE EMAIL = 'juanperez@test.com';
COMMIT;

-- MongoDB:
db.usuarios.deleteOne({ email: "juanperez@test.com" })
```

Opción 3 - Limpia BD completamente:
```sql
-- Oracle:
DELETE FROM USUARIOS;
COMMIT;
```

---

### ❌ Problema: "RUT already exists"

**Síntomas**:
```
❌ Error en registro de BD: RUT ya existe
```

**Solución**:

Usa un RUT diferente:
```
RUT: 22.222.222-2
```

O genera uno aleatorio:
```
11111111-1  (válido)
22222222-2  (válido)
33333333-3  (válido)
```

---

### ❌ Problema: No aparecen logs en Console

**Síntomas**:
```
Hago click en Registrarse pero no veo logs 📤
```

**Causas**:

1. Validación del formulario falla:
   ```
   Revisa que TODOS los campos estén llenos y válidos
   Debe haber errores rojos en cada campo
   ```

2. Console estaba limpiada:
   ```
   Click "Clear"
   Luego Registrarse
   Verifica logs aparezcan
   ```

3. JavaScript deshabilitado:
   ```
   DevTools → Settings → (busca "disable JavaScript")
   Si está checked, desmarca
   ```

**Solución**:
```bash
# Recarga la página
F5 (o Ctrl+R)

# Abre Console limpia
Botón "Clear"

# Intenta de nuevo
```

---

### ❌ Problema: "Network request shows 500"

**Síntomas**:
```
Network tab → Status 500
Console: Error del servidor
```

**Solución**:

1. Revisa logs del backend:
```bash
# En la terminal donde corre Spring Boot:
# Busca líneas con:
# ERROR, Exception, SQLException, etc
```

2. Causas comunes:
```
❌ Database connection failed
   → Verifica Oracle/MongoDB está corriendo

❌ Column not found error
   → Backend espera campos diferentes
   → Revisa schema de tabla USUARIOS

❌ SQL constraint violation
   → Hay validación en BD
   → Revisa archivo de constraints

❌ Null Pointer Exception
   → Código del backend tiene bug
   → Contacta con dev backend
```

---

### ⚠️ Problema: "Registro exitoso pero auth falló"

**Síntomas**:
```
Console: ✅ Registro exitoso en BD
Console: ⚠️  Autenticación después del registro falló
Te redirige a login
```

**Significado**:
```
✅ El usuario se creó en BD correctamente
❌ Pero el login falló con esas credenciales
```

**Causas**:

1. Password no se guardó correctamente:
   ```
   Intenta hacer login manual
   Si no funciona, password no se guardó
   ```

2. Email no coincide:
   ```
   Verifica que email en formulario y BD sean idénticos
   (sin espacios, mismo case)
   ```

3. Usuario no está activo:
   ```sql
   SELECT ACTIVO FROM USUARIOS WHERE EMAIL = '...';
   -- Debe ser Y/1/true
   ```

**Solución**:
```
Intenta hacer login manualmente:
http://localhost:5173/session/login

Email: (el que usaste en registro)
Password: (el que usaste en registro)
```

Si eso funciona, está todo bien.

---

## ✅ Checklist de Verificación

Antes de reportar un problema, verifica:

- [ ] Backend está corriendo (`mvn spring-boot:run` o similar)
- [ ] Frontend está corriendo (`npm run dev` o `vite`)
- [ ] Abriste DevTools (F12)
- [ ] Fuiste a la Console
- [ ] Formulario tiene todos los campos llenos
- [ ] No hay errores rojos en el formulario
- [ ] Hiciste clic en "Registrarse"
- [ ] Viste logs en Console (📤 o ❌)
- [ ] Esperaste a que termine el request (Network tab)

---

## 📞 Si Todo Falla

Copia y comparte:

1. **Output de test automático**:
   ```bash
   node testRegister.js
   # Copia TODO el output
   ```

2. **Console log exacto**:
   ```
   F12 → Console → Copia todos los logs
   ```

3. **Network response**:
   ```
   F12 → Network → POST /api/v1/auth/register
   → Response tab → Copia JSON
   ```

4. **Backend logs**:
   ```
   Últimas 20 líneas de la terminal donde corre backend
   ```

5. **Pasos exactos**:
   ```
   ¿Qué data usaste?
   ¿Qué error exacto ves?
   ¿En qué página estás?
   ```

Con esta información puedo resolver el problema en 5 minutos. ⚡

---

## 🎬 Video Mental del Flujo Correcto

```
1. Abres http://localhost:5173/session/register
   ↓
2. Llenas: nombre, apellido, email, password, etc
   ↓
3. Haces click "Registrarse"
   ↓
4. Frontend valida (LocalStorage)
   ↓
5. Abre DevTools
   ↓
6. Console: 📤 Enviando registro a BD: {...}
   ↓
7. Network: POST /api/v1/auth/register
   ↓
8. Status: 201 ✅
   ↓
9. Console: ✅ Registro exitoso en BD
   ↓
10. Console: ✅ Autenticación exitosa
   ↓
11. Te redirige a Home
   ↓
12. ¡ÉXITO! 🎉 Usuario creado en BD
```

Si cualquier paso falla, detén ahí y reporta.

---

## 🚀 Próximo Paso

Corre ahora:
```bash
node testRegister.js
```

Y comparte los resultados.
