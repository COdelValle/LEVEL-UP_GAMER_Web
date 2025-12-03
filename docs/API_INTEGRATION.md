# Integración API — LEVEL-UP GAMER

Este documento explica cómo usar la fábrica `createAPI` y la instancia `api` expuesta por el `AuthContext` para registrar/loguear usuarios y llamar a endpoints protegidos (ej. `/api/v1/usuarios/bulk`).

---

## Archivos relevantes
- `src/lib/APIHelper.js` — fábrica `createAPI(baseURL)` (export default).
- `src/context/AuthContext.jsx` — crea una instancia `api` y la expone en el contexto (`useAuth().api`). También guarda el `token` en `localStorage` cuando `authenticate` recibe `token`.

## Backend DTO esperado

El backend debe aceptar:

### Registro: POST `/api/v1/auth/register`
Body esperado (basado en `RegisterRequest` del backend):
```json
{
  "nombre": "Juan Pérez",
  "rut": "12345678-5",
  "email": "usuario@gmail.com",
  "password": "MiPassword123",
  "passwordConfirm": "MiPassword123"
}
```

Respuesta ideal (200/201):
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "usuarioId": 1,
  "email": "usuario@gmail.com",
  "nombre": "Juan Pérez",
  "rol": "USER"
}
```

### Login: POST `/api/v1/auth/login`
Body esperado:
```json
{
  "email": "usuario@gmail.com",
  "password": "MiPassword123"
}
```

Respuesta ideal:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "usuarioId": 1,
  "email": "usuario@gmail.com",
  "nombre": "Juan Pérez",
  "rol": "USER"
}
```

## Configurar URL del backend
A través de Vite usa la variable `VITE_API_URL` en `.env` (opcional, por defecto `http://localhost:8080`):

```powershell
# .env (en la raíz del proyecto)
VITE_API_URL=http://localhost:8080
```

Reinicia el dev server si cambias ese archivo.

## Uso desde un componente React (ejemplo admin para crear usuarios en bulk)

```jsx
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function BulkCreateUsers() {
  const { api } = useAuth(); // instancia con token si el AuthContext ya autenticó
  const [creating, setCreating] = useState(false);

  const handleCreate = async () => {
    setCreating(true);
    try {
      const users = [
        { nombre: 'A', email: 'a@x', password: '123456', rol: 'USER' },
        { nombre: 'B', email: 'b@x', password: '123456', rol: 'USER' }
      ];

      const res = await api.post('/api/v1/usuarios/bulk', users);
      console.log('Bulk created:', res);
      alert('Usuarios creados');
    } catch (err) {
      console.error('Error creating users:', err);
      alert('Error: ' + (err.message || err));
    } finally {
      setCreating(false);
    }
  };

  return (
    <button onClick={handleCreate} disabled={creating}>
      {creating ? 'Creando...' : 'Crear usuarios en bulk'}
    </button>
  );
}
```

Notas:
- Asegúrate de que el usuario actual (sesión) tenga permisos admin. El `api` añade `Authorization: Bearer <token>` si `api.setToken` fue llamado (AuthContext lo hace en `authenticate`).

## Uso desde cualquier módulo (instancia directa)
Si prefieres usar una instancia independiente:

```js
import createAPI from '../lib/APIHelper';

const api = createAPI(import.meta.env.VITE_API_URL || 'http://localhost:8080');
await api.login('admin@local', 'adminpass');
await api.post('/api/v1/usuarios/bulk', [{ nombre: 'A', email: 'a@x', password: '123456', rol: 'USER' }]);
```

Notas:
- `api.login(email, password)` hace POST a `/api/v1/auth/login` (según la implementación) y llama `api.setToken` si la respuesta contiene `token`.
- Si llamas a `createAPI()` manualmente en el navegador console, ten en cuenta que `import`/ESM restrictions pueden aplicar; mejor usarlo dentro de código del proyecto.

## Qué revisar si "no funciona"
1. Revisa DevTools > Network: la petición `POST /api/v1/usuarios/bulk` se envía y devuelve 2xx?
2. Revisa la respuesta: ¿devuelve `{ token }` o `{ user }` cuando corresponde?
3. CORS: el backend debe permitir orígenes (`Access-Control-Allow-Origin`) para tu `http://localhost:5173`.
4. Rutas: si tu backend usa rutas diferentes (`/users` en vez de `/usuarios`), actualiza las llamadas.
5. Autorización: el endpoint `/api/v1/usuarios/bulk` probablemente requiere token con role=ADMIN; asegúrate de loguearte primero como admin y que `api.login` haya guardado el token.

## Recomendaciones de seguridad
- Guardar token en `localStorage` funciona para demos, pero es vulnerable a XSS. Preferible usar cookies HttpOnly en producción.
- Validar en backend roles/permissions para endpoints sensibles.

---

Si quieres, puedo:
- Añadir un componente admin `/admin/BulkUsuarios.jsx` listo para usar (que llame a `/api/v1/usuarios/bulk`).
- O cambiar `AuthContext` para **no** inferir `user` automáticamente (guardar sólo si viene `data.user`), lo cual es más seguro.

Dime qué prefieres y lo implemento.
