# ⚡ INSTRUCCIONES RÁPIDAS - Registro Arreglado

## 🎯 Lo Que Pasó

Se mejoró el formulario de registro (`Register.jsx`) para:
1. ✅ Enviar todos los campos requeridos a la BD
2. ✅ Limpiar datos antes de enviar (sin puntos en RUT, sin guiones en teléfono)
3. ✅ Logging detallado para debugging
4. ✅ Mejor manejo de errores

---

## 🚀 Qué Hacer Ahora

### OPCIÓN 1: Test Automático (Recomendado)

```bash
# En terminal, en la raíz del proyecto:
node testRegister.js
```

**Qué hace**:
- Verifica que backend está activo
- Intenta registrar un usuario de prueba
- Valida que todo funcione

**Resultado esperado**:
```
✅ Backend está activo en http://localhost:8080
✅ Registro exitoso (Status 201)
✅ Validación de email duplicado funciona correctamente
```

### OPCIÓN 2: Prueba Manual en Navegador

1. Abre: `http://localhost:5173/session/register`
2. Llena el formulario:
   ```
   Nombre: Juan
   Apellido: Pérez
   Nickname: juanperez
   Email: juan@test.com
   RUT: 11.111.111-1 (cualquier RUT válido)
   Teléfono: 987654321
   Contraseña: Password123
   Confirmar: Password123
   ```

3. Abre DevTools: `F12`
4. Ve a Console
5. Click "Registrarse"
6. Busca logs con 📤, ✅ o ❌

---

## ✅ Si Todo Funciona

Deberías ver en Console:
```
📤 Enviando registro a BD: {nombre: "Juan", ...}
✅ Registro exitoso en BD: {usuarioId: 123, ...}
✅ Autenticación exitosa: {token: "eyJ...", ...}
```

Y te redirigirá a Home automáticamente.

---

## ❌ Si Falla

### Caso 1: "Cannot connect to server"
```
Backend no está corriendo
Solución: En otra terminal, corre: mvn spring-boot:run
```

### Caso 2: "Email already exists"
```
El email ya está registrado
Solución: Usa otro email: juan2@test.com
```

### Caso 3: "Status 500"
```
Error en el backend
Solución: Revisa logs del backend terminal
```

---

## 📚 Documentación Creada

| Archivo | Propósito |
|---------|-----------|
| `testRegister.js` | Script automático de test |
| `DEBUG_REGISTRO.md` | Guía de debugging |
| `PASOS_ARREGLAR_REGISTRO.md` | Pasos prácticos |
| `CAMBIOS_REGISTER.md` | Qué cambió en el código |
| `GUIA_TESTING_COMPLETA.md` | Manual completo de testing |
| `README_REGISTRO_SOLUCION.md` | Resumen general |

---

## 🔍 Verificar en Base de Datos

Después de registrarse exitosamente, ejecuta:

```sql
-- Para Oracle:
SELECT * FROM USUARIOS WHERE EMAIL = 'juan@test.com';

-- Debes ver el usuario creado:
-- ID | NOMBRE | APELLIDO | EMAIL | RUT | TELEFONO | ROL | ACTIVO
```

---

## 🎬 Flujo Resumido

```
1. Llenar formulario
   ↓
2. Click "Registrarse"
   ↓
3. Frontend valida
   ↓
4. Frontend limpia datos (RUT, teléfono)
   ↓
5. Envía POST /api/v1/auth/register
   ↓
6. Backend crea usuario en BD
   ↓
7. Frontend intenta login automático
   ↓
8. Si OK → Redirige a Home ✅
9. Si Falla → Redirige a Login ⚠️
```

---

## 📞 Próximo Paso

1. Corre: `node testRegister.js`
2. Comparte resultado
3. Si falla, lee: `DEBUG_REGISTRO.md`
4. Si funciona, prueba en navegador

---

## 💡 Recuerda

- **Backend debe estar en**: `http://localhost:8080`
- **Frontend debe estar en**: `http://localhost:5173`
- **Ambos** deben estar corriendo
- **DevTools es tu amigo**: F12 → Console → Console Logs

¡Listo para probar! 🚀
