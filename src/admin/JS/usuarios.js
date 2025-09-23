// ====================================
// USUARIOS ADMIN - LEVEL-UP GAMER
// ====================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('👥 Sistema de usuarios cargado');
    
    // Verificar autenticación
    checkAdminAuth();
    
    // Cargar datos iniciales
    loadUsersData();
    loadUserStats();
    loadUserActivity();
});

// ====================================
// AUTENTICACIÓN
// ====================================

function checkAdminAuth() {
    const adminSession = JSON.parse(localStorage.getItem('adminSession'));
    
    if (!adminSession || !adminSession.isAuthenticated) {
        window.location.href = 'login.html';
        return;
    }
    
    // Verificar si la sesión ha expirado
    const now = new Date().getTime();
    if (now > adminSession.expiresAt) {
        localStorage.removeItem('adminSession');
        showMessage('Sesión expirada. Por favor inicia sesión nuevamente.', 'error');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
        return;
    }
    
    // Mostrar nombre del admin
    const adminNameEl = document.getElementById('admin-name');
    if (adminNameEl) {
        adminNameEl.textContent = adminSession.username;
    }
}

function logout() {
    if (confirm('¿Estás seguro que deseas cerrar sesión?')) {
        localStorage.removeItem('adminSession');
        showMessage('Sesión cerrada correctamente', 'success');
        setTimeout(() => {
            window.location.href = '../src/tienda/blogs.html';
        }, 1000);
    }
}

// ====================================
// CARGA DE DATOS
// ====================================

function loadUsersData() {
    // Datos de ejemplo - en producción vendría de API
    const users = [
        {
            run: '12.345.678-9',
            nombre: 'Juan Carlos',
            apellidos: 'Pérez García',
            correo: 'juan.perez@email.com',
            fechaNac: '15/03/1990',
            tipo: 'Premium',
            region: 'Metropolitana',
            comuna: 'Santiago',
            direccion: 'Av. Libertador 123',
            estado: 'Activo'
        },
        {
            run: '98.765.432-1',
            nombre: 'María Fernanda',
            apellidos: 'González López',
            correo: 'maria.gonzalez@email.com',
            fechaNac: '22/07/1985',
            tipo: 'Básico',
            region: 'Valparaíso',
            comuna: 'Viña del Mar',
            direccion: 'Calle Los Pinos 456',
            estado: 'Activo'
        },
        {
            run: '11.222.333-4',
            nombre: 'Carlos Eduardo',
            apellidos: 'Rodríguez Silva',
            correo: 'carlos.rodriguez@email.com',
            fechaNac: '08/12/1992',
            tipo: 'Premium',
            region: 'Biobío',
            comuna: 'Concepción',
            direccion: 'Pasaje Central 789',
            estado: 'Activo'
        },
        {
            run: '55.666.777-8',
            nombre: 'Ana Sofía',
            apellidos: 'Martínez Torres',
            correo: 'ana.martinez@email.com',
            fechaNac: '30/05/1988',
            tipo: 'Premium',
            region: 'Antofagasta',
            comuna: 'Antofagasta',
            direccion: 'Boulevard Norte 321',
            estado: 'Inactivo'
        }
    ];

    const tableBody = document.getElementById('users-table');
    if (!tableBody) return;

    tableBody.innerHTML = '';

    users.forEach(user => {
        const row = document.createElement('tr');
        
        const tipoBadgeClass = user.tipo === 'Premium' ? 'category-badge' : 'category-badge';
        const tipoBadgeStyle = user.tipo === 'Básico' ? 'background: #39FF14; color: black;' : '';
        
        row.innerHTML = `
            <td>${user.run}</td>
            <td>${user.nombre}</td>
            <td class="d-hide-md">${user.apellidos}</td>
            <td class="d-hide-md">${user.correo}</td>
            <td class="d-hide-sm">${user.fechaNac}</td>
            <td class="d-hide-sm">
                <span class="${tipoBadgeClass}" style="${tipoBadgeStyle}">
                    ${user.tipo}
                </span>
            </td>
            <td class="d-hide-md">${user.region}</td>
            <td class="d-hide-md">${user.comuna}</td>
            <td class="d-hide-md">${user.direccion}</td>
            <td>
                <div class="btn-group-table">
                    <button class="btn btn-primary btn-sm" onclick="viewUser('${user.run}')">
                        Ver
                    </button>
                    <button class="btn btn-edit btn-sm" onclick="editUser('${user.run}')">
                        Editar
                    </button>
                </div>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

function loadUserStats() {
    // Simular carga de estadísticas
    setTimeout(() => {
        document.getElementById('total-users-count').textContent = '124';
        document.getElementById('active-users-count').textContent = '98';
        document.getElementById('new-users-month').textContent = '12';
        document.getElementById('premium-users').textContent = '45';
    }, 500);
}

function loadUserActivity() {
    const activities = [
        {
            user: 'Juan Pérez',
            action: 'actualizó su perfil',
            time: 'Hace 2 horas'
        },
        {
            user: 'María González',
            action: 'se registró en la plataforma',
            time: 'Hace 4 horas'
        },
        {
            user: 'Carlos Rodríguez',
            action: 'cambió a suscripción Premium',
            time: 'Hace 1 día'
        },
        {
            user: 'Ana Martínez',
            action: 'realizó una compra',
            time: 'Hace 2 días'
        }
    ];

    const activityContainer = document.getElementById('user-activity');
    if (!activityContainer) return;

    activityContainer.innerHTML = '';

    activities.forEach(activity => {
        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item';
        activityItem.innerHTML = `
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <strong>${activity.user}</strong> ${activity.action}
                </div>
                <div class="activity-time">${activity.time}</div>
            </div>
        `;
        activityContainer.appendChild(activityItem);
    });
}

// ====================================
// FUNCIONES DE NAVEGACIÓN
// ====================================

function viewUser(run) {
    // Remover puntos y guiones del RUN para la URL
    const cleanRun = run.replace(/[.-]/g, '');
    window.location.href = `ver_usuario.html?run=${cleanRun}`;
}

function editUser(run) {
    // Remover puntos y guiones del RUN para la URL  
    const cleanRun = run.replace(/[.-]/g, '');
    window.location.href = `editar_usuario.html?run=${cleanRun}`;
}

function addNewUser() {
    window.location.href = 'agregar_usuarios.html';
}

// ====================================
// SISTEMA DE MENSAJES
// ====================================

function showMessage(message, type = 'info') {
    // Crear elemento de mensaje
    const messageEl = document.createElement('div');
    messageEl.className = `message message-${type}`;
    messageEl.textContent = message;
    
    // Estilos del mensaje
    messageEl.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        color: white;
        font-weight: 600;
        z-index: 9999;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 350px;
        white-space: pre-line;
    `;
    
    // Colores según tipo
    switch(type) {
        case 'success':
            messageEl.style.background = 'linear-gradient(135deg, #39FF14, #1E90FF)';
            break;
        case 'error':
            messageEl.style.background = 'linear-gradient(135deg, #ff4444, #cc0000)';
            break;
        case 'warning':
            messageEl.style.background = 'linear-gradient(135deg, #ffaa00, #ff7700)';
            break;
        default:
            messageEl.style.background = 'linear-gradient(135deg, #1E90FF, #39FF14)';
    }
    
    // Añadir al DOM
    document.body.appendChild(messageEl);
    
    // Animar entrada
    setTimeout(() => {
        messageEl.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover después de tiempo según tipo
    const duration = type === 'error' ? 5000 : 3000;
    setTimeout(() => {
        messageEl.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(messageEl)) {
                document.body.removeChild(messageEl);
            }
        }, 300);
    }, duration);
}