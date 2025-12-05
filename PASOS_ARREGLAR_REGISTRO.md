# 🚀 Pasos para Arreglar el Registro

## ✋ PRIMERO: Corre el Test Automático

```bash
# En la terminal del proyecto frontend:
node testRegister.js
```

Este script va a:
1. ✅ Verificar que el backend esté activo
2. ✅ Intentar registrar un usuario de test
3. ✅ Validar que rechace emails duplicados
4. ✅ Mostrar errores exactos si algo falla

**Comparte los resultados de este test** 👇

---

## 🔧 SI FALLA: "Cannot connect to backend"

### Acción 1: Verifica el Backend

```bash
# En terminal nueva, ve a tu proyecto Spring Boot y corre:
mvn spring-boot:run
# O si usas Gradle:
./gradlew bootRun
```

**Verifica que veas**:
```
  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_|\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 
Tomcat started on port(s): 8080 (http)
```

**Si ves error de puerto**:
```bash
# Si algo está usando el puerto 8080:
netstat -ano | findstr :8080
# O en PowerShell:
Get-NetTCPConnection -LocalPort 8080
```

### Acción 2: Recorre el Test

```bash
node testRegister.js
```

---

## 🎯 SI FALLA: "Email required" o campos faltando

### El Backend espera estos campos **EXACTOS**:

```javascript
{
  nombre: string,        // ✅ Requerido
  apellido: string,      // ✅ Requerido  
  email: string,         // ✅ Requerido, debe ser email válido
  password: string,      // ✅ Requerido, mín 6 chars
  rut: string,          // ✅ Requerido (ej: "11111111-1")
  telefono: string,     // ✅ Requerido (solo números)
  rol: "user",          // ✅ Requerido, default "user"
  activo: true          // ✅ Requerido, default true
}
```

**En el archivo**: `src/pages/public/Session/Register.jsx`

**Asegúrate que envíe EXACTAMENTE esto** al backend.

---

## 🐛 SI FALLA: "Email ya existe" o "RUT inválido"

Esto significa que:
- ✅ Backend está corriendo
- ✅ Endpoint existe
- ✅ Validaciones del BD están activas

**Soluciones**:

1. **Email ya existe**: Usa otro email en el test
   ```bash
   node testRegister.js
   # Crea un test con email único cada vez
   ```

2. **RUT inválido**: Asegúrate el formato sea correcto
   ```
   Chile: XX.XXX.XXX-K
   Sin puntos: XXXXXXXX-K  (Esto es lo que enviar)
   ```

---

## 📝 SI FALLA: Otros Errores

Copia estos datos exactos:

1. **Status del request** (200, 400, 404, 500, etc)
2. **Mensaje de error exacto** (copiar-pegar del test output)
3. **Backend logs** (últimas líneas donde ves el error)
4. **URL del backend** (debe ser `http://localhost:8080`)

---

## ✅ SI TODO FUNCIONA

Verás en el test:

```
✅ Backend está activo en http://localhost:8080
✅ Registro exitoso (Status 201)
ℹ️  Response:
{
  "usuarioId": 123,
  "nombre": "Test",
  "email": "test...",
  "rol": "user",
  "message": "Usuario registrado exitosamente"
}
✅ Validación de email duplicado funciona correctamente
✅ Error esperado: Email ya existe
```

Entonces **el backend funciona correctamente**.

**Ahora prueba en el frontend**:
1. Abre `http://localhost:5173` (o tu puerto frontend)
2. Ve a "Registrarse"
3. Llena el formulario
4. Abre DevTools (F12)
5. Ve a Console
6. Click "Registrarse"
7. Busca logs con 📤, ✅ o ❌

---

## 🎬 Flujo Completo de Debugging

```
1. ¿Backend está activo?
   └─ NO → Inicia backend con mvn/gradle
   └─ SÍ → Continúa

2. ¿El test automático pasa?
   └─ NO → Revisa mensaje de error
   └─ SÍ → Continúa

3. ¿El formulario frontend funciona?
   └─ NO → Revisa console logs
   └─ SÍ → ¡Éxito! 🎉
```

---

## 📞 Si Necesitas Ayuda

Comparte:
1. Output completo de `node testRegister.js`
2. Error exacto del formulario (pantalla)
3. Logs de backend (console)
4. Logs del navegador (F12 → Console)

Así puedo resolver el problema específicamente.
