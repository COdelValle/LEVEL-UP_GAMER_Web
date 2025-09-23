// ====================================
// USUARIOS ADMIN - LEVEL-UP GAMER
// ====================================

let usuariosData = null;
let regionesData = null;

document.addEventListener('DOMContentLoaded', function() {
    console.log('👥 Sistema de usuarios cargado');
    
    // Verificar autenticación
    checkAdminAuth();
    
    // Cargar datos desde JSON
    loadDataFromJSON();
});

// ====================================
// CARGA DE DATOS DESDE JSON
// ====================================

async function loadDataFromJSON() {
    try {
        // Cargar el archivo JSON desde assets
        const response = await fetch('../assets/usuarios.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        usuariosData = data.usuarios;
        regionesData = data.regiones;
        
        console.log('Datos cargados:', usuariosData.length, 'usuarios');
        
        // Cargar datos iniciales
        loadUsersData();
        loadUserStats();
        loadUserActivity();
        
    } catch (error) {
        console.error('Error al cargar datos desde JSON:', error);
        showMessage('Error al cargar los datos de usuarios. Usando datos de ejemplo.', 'warning');
        
        // Fallback: usar datos de ejemplo si no se puede cargar el JSON
        loadFallbackData();
    }
}

function loadFallbackData() {
    // Datos de ejemplo como fallback
    usuariosData = [
        {
            run: '12345678-9',
            nombre: 'Juan Carlos',
            apellidos: 'Pérez García',
            correo: 'juan.perez@email.com',
            fechaNacimiento: '1990-03-15',
            tipoUsuario: 'Cliente',
            region: 'Región Metropolitana',
            comuna: 'Santiago',
            direccion: 'Av. Libertador 123'
        },
        {
            run: '98765432-1',
            nombre: 'María Fernanda',
            apellidos: 'González López',
            correo: 'maria.gonzalez@email.com',
            fechaNacimiento: '1985-07-22',
            tipoUsuario: 'Cliente',
            region: 'Valparaíso',
            comuna: 'Viña del Mar',
            direccion: 'Calle Los Pinos 456'
        }
    ];
    
    loadUsersData();
    loadUserStats();
    loadUserActivity();
}

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
    const tableBody = document.getElementById('users-table');
    if (!tableBody || !usuariosData) return;

    tableBody.innerHTML = '';
    updateUsersCount(usuariosData.length);

    usuariosData.forEach(user => {
        const row = document.createElement('tr');
        
        // Formatear RUN para mostrar con puntos y guion
        const formattedRun = formatRun(user.run);
        
        // Formatear fecha de nacimiento
        const fechaNac = user.fechaNacimiento ? formatDate(user.fechaNacimiento) : 'No especificada';
        
        // Determinar el tipo de badge según el tipo de usuario
        const tipoBadgeClass = getTipoUsuarioBadgeClass(user.tipoUsuario);
        
        row.innerHTML = `
            <td>${formattedRun}</td>
            <td>${user.nombre}</td>
            <td class="d-none d-lg-table-cell">${user.apellidos}</td>
            <td class="d-none d-md-table-cell">${user.correo}</td>
            <td class="d-none d-xl-table-cell">${fechaNac}</td>
            <td class="d-none d-sm-table-cell">
                <span class="category-badge ${tipoBadgeClass}">
                    ${user.tipoUsuario}
                </span>
            </td>
            <td class="d-none d-xl-table-cell">${user.region}</td>
            <td class="d-none d-xl-table-cell">${user.comuna}</td>
            <td class="d-none d-xxl-table-cell">${user.direccion}</td>
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
    if (!usuariosData) return;
    
    // Calcular estadísticas reales desde los datos
    const totalUsers = usuariosData.length;
    const activeUsers = usuariosData.filter(user => user.tipoUsuario !== 'Inactivo').length;
    
    // Simular nuevos usuarios este mes (últimos datos agregados)
    const newUsersThisMonth = Math.floor(totalUsers * 0.2); // 20% como estimación
    
    // Contar usuarios premium/administrador
    const premiumUsers = usuariosData.filter(user => 
        user.tipoUsuario === 'Administrador' || user.tipoUsuario === 'Vendedor'
    ).length;
    
    // Actualizar estadísticas con animación
    setTimeout(() => {
        animateCounter('total-users-count', totalUsers);
        animateCounter('active-users-count', activeUsers);
        animateCounter('new-users-month', newUsersThisMonth);
        animateCounter('premium-users', premiumUsers);
    }, 500);
}

function loadUserActivity() {
    if (!usuariosData) return;
    
    // Generar actividad basada en usuarios reales
    const activities = usuariosData.slice(0, 4).map((user, index) => {
        const actions = [
            'actualizó su perfil',
            'se registró en la plataforma',
            'cambió su información',
            'realizó una compra'
        ];
        
        const times = [
            'Hace 2 horas',
            'Hace 4 horas',
            'Hace 1 día',
            'Hace 2 días'
        ];
        
        return {
            user: `${user.nombre} ${user.apellidos}`,
            action: actions[index % actions.length],
            time: times[index % times.length]
        };
    });

    const activityContainer = document.getElementById('user-activity');
    if (!activityContainer) return;

    activityContainer.innerHTML = '';

    activities.forEach(activity => {
        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item';
        activityItem.innerHTML = `
            <div>
                <strong>${activity.user}</strong> ${activity.action}
            </div>
            <div class="activity-time">${activity.time}</div>
        `;
        activityContainer.appendChild(activityItem);
    });
}

// ====================================
// FUNCIONES DE NAVEGACIÓN
// ====================================

function viewUser(run) {
    // Limpiar el RUN para la URL
    const cleanRun = run.replace(/[.-]/g, '');
    window.location.href = `ver_usuario.html?run=${cleanRun}`;
}

function editUser(run) {
    // Limpiar el RUN para la URL  
    const cleanRun = run.replace(/[.-]/g, '');
    window.location.href = `editar_usuario.html?run=${cleanRun}`;
}

function addNewUser() {
    window.location.href = 'agregar_usuarios.html';
}

// ====================================
// FUNCIONES AUXILIARES
// ====================================

function formatRun(run) {
    // Si el RUN ya tiene formato, devolverlo tal como está
    if (run.includes('.') && run.includes('-')) {
        return run;
    }
    
    // Formatear RUN: 12345678-9 -> 12.345.678-9
    const cleanRun = run.replace(/[.-]/g, '');
    if (cleanRun.length >= 8) {
        const numbers = cleanRun.slice(0, -1);
        const dv = cleanRun.slice(-1);
        
        // Agregar puntos cada 3 dígitos desde la derecha
        const formattedNumbers = numbers.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        return `${formattedNumbers}-${dv}`;
    }
    return run;
}

function formatDate(dateString) {
    if (!dateString) return 'No especificada';
    
    const date = new Date(dateString);
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    
    return date.toLocaleDateString('es-CL', options);
}

function getTipoUsuarioBadgeClass(tipoUsuario) {
    switch(tipoUsuario) {
        case 'Administrador':
            return 'type-premium'; // Azul
        case 'Vendedor':
            return 'type-premium'; // Azul
        case 'Cliente':
            return 'type-basic'; // Verde
        default:
            return 'category-badge'; // Default
    }
}

function animateCounter(elementId, targetValue) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    let currentValue = 0;
    const increment = Math.ceil(targetValue / 20);
    const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= targetValue) {
            currentValue = targetValue;
            clearInterval(timer);
        }
        element.textContent = currentValue;
    }, 50);
}

// ====================================
// BÚSQUEDA Y FILTROS ADICIONALES
// ====================================

function clearFilters() {
    document.getElementById('search-input').value = '';
    document.getElementById('filter-tipo').value = 'todos';
    loadUsersData();
    updateUsersCount(usuariosData.length);
}

function updateUsersCount(count) {
    const usersCountEl = document.getElementById('users-count');
    if (usersCountEl) {
        usersCountEl.textContent = `${count} usuario${count !== 1 ? 's' : ''}`;
    }
}

function searchUsers(query) {
    if (!usuariosData) return;
    
    const filtered = usuariosData.filter(user => {
        const searchTerm = query.toLowerCase();
        return (
            user.nombre.toLowerCase().includes(searchTerm) ||
            user.apellidos.toLowerCase().includes(searchTerm) ||
            user.correo.toLowerCase().includes(searchTerm) ||
            user.run.includes(searchTerm) ||
            user.tipoUsuario.toLowerCase().includes(searchTerm)
        );
    });
    
    // Actualizar tabla con resultados filtrados
    displayFilteredUsers(filtered);
}

function filterByTipo(tipo) {
    if (!usuariosData) return;
    
    if (tipo === 'todos') {
        loadUsersData();
        return;
    }
    
    const filtered = usuariosData.filter(user => user.tipoUsuario === tipo);
    displayFilteredUsers(filtered);
}

function displayFilteredUsers(users) {
    const tableBody = document.getElementById('users-table');
    if (!tableBody) return;

    tableBody.innerHTML = '';
    updateUsersCount(users.length);

    if (users.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="10" class="text-center text-secondary">
                    No se encontraron usuarios con los criterios especificados
                </td>
            </tr>
        `;
        return;
    }

    users.forEach(user => {
        const row = document.createElement('tr');
        const formattedRun = formatRun(user.run);
        const fechaNac = user.fechaNacimiento ? formatDate(user.fechaNacimiento) : 'No especificada';
        const tipoBadgeClass = getTipoUsuarioBadgeClass(user.tipoUsuario);
        
        row.innerHTML = `
            <td>${formattedRun}</td>
            <td>${user.nombre}</td>
            <td class="d-hide-md">${user.apellidos}</td>
            <td class="d-hide-md">${user.correo}</td>
            <td class="d-hide-sm">${fechaNac}</td>
            <td class="d-hide-sm">
                <span class="category-badge ${tipoBadgeClass}">
                    ${user.tipoUsuario}
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