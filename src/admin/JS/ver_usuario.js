// ====================================
// VER USUARIO - LEVEL-UP GAMER ADMIN
// ====================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('👁️ Vista de usuario cargada');
    
    // Verificar autenticación
    checkAdminAuth();
    
    // Cargar datos del usuario
    loadUserData();
    
    // Cargar estadísticas y actividad
    loadUserStats();
    loadUserActivity();
    loadUserOrders();
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
// CARGA DE DATOS DEL USUARIO
// ====================================

function loadUserData() {
    // Obtener RUN desde URL
    const urlParams = new URLSearchParams(window.location.search);
    const run = urlParams.get('run');
    
    if (!run) {
        showMessage('No se especificó un usuario válido', 'error');
        setTimeout(() => {
            window.location.href = 'usuarios.html';
        }, 2000);
        return;
    }
    
    // Base de datos simulada de usuarios
    const usersDatabase = {
        '12345678-9': {
            nombre: 'Juan Carlos Pérez García',
            run: '12.345.678-9',
            correo: 'juan.perez@email.com',
            fechaNac: '15 de marzo, 1990',
            tipo: 'Premium',
            region: 'Metropolitana',
            comuna: 'Santiago',
            direccion: 'Av. Libertador Bernardo O\'Higgins 123, Departamento 45',
            fechaRegistro: '15 de marzo, 2023',
            estado: 'Activo',
            telefono: '+56 9 1234 5678',
            ultimaActividad: '2024-01-15'
        },
        '98765432-1': {
            nombre: 'María Fernanda González López',
            run: '98.765.432-1',
            correo: 'maria.gonzalez@email.com',
            fechaNac: '22 de julio, 1985',
            tipo: 'Básico',
            region: 'Valparaíso',
            comuna: 'Viña del Mar',
            direccion: 'Calle Los Pinos 456, Casa 12',
            fechaRegistro: '8 de enero, 2024',
            estado: 'Activo',
            telefono: '+56 9 8765 4321',
            ultimaActividad: '2024-01-10'
        },
        '11222333-4': {
            nombre: 'Carlos Eduardo Rodríguez Silva',
            run: '11.222.333-4',
            correo: 'carlos.rodriguez@email.com',
            fechaNac: '8 de diciembre, 1992',
            tipo: 'Premium',
            region: 'Biobío',
            comuna: 'Concepción',
            direccion: 'Pasaje Central 789, Block A',
            fechaRegistro: '22 de noviembre, 2023',
            estado: 'Activo',
            telefono: '+56 9 1122 3344',
            ultimaActividad: '2024-01-12'
        }
    };

    const userData = usersDatabase[run];
    
    if (!userData) {
        showMessage('Usuario no encontrado', 'error');
        setTimeout(() => {
            window.location.href = 'usuarios.html';
        }, 2000);
        return;
    }

    // Llenar los campos con los datos del usuario
    fillUserData(userData);
}

function fillUserData(userData) {
    // Información principal
    document.getElementById('nombre-usuario').textContent = userData.nombre;
    document.getElementById('run-usuario').textContent = userData.run;
    document.getElementById('correo-usuario').textContent = userData.correo;
    document.getElementById('fecha-usuario').textContent = userData.fechaNac;
    document.getElementById('region-usuario').textContent = userData.region;
    document.getElementById('comuna-usuario').textContent = userData.comuna;
    document.getElementById('direccion-usuario').textContent = userData.direccion;
    document.getElementById('fecha-registro').textContent = userData.fechaRegistro;
    
    // Tipo de usuario con estilo apropiado
    const tipoElement = document.getElementById('tipo-usuario');
    tipoElement.textContent = userData.tipo;
    if (userData.tipo === 'Básico') {
        tipoElement.style.background = '#39FF14';
        tipoElement.style.color = 'black';
    }
}

// ====================================
// ESTADÍSTICAS DEL USUARIO
// ====================================

function loadUserStats() {
    const urlParams = new URLSearchParams(window.location.search);
    const run = urlParams.get('run');
    
    // Simulación de estadísticas basadas en el usuario
    const statsDatabase = {
        '12345678-9': {
            pedidos: 15,
            totalGastado: '$850.000',
            satisfaccion: '98%'
        },
        '98765432-1': {
            pedidos: 3,
            totalGastado: '$125.000',
            satisfaccion: '95%'
        },
        '11222333-4': {
            pedidos: 8,
            totalGastado: '$450.000',
            satisfaccion: '96%'
        }
    };

    const userStats = statsDatabase[run] || {
        pedidos: 0,
        totalGastado: '$0',
        satisfaccion: '0%'
    };

    // Actualizar estadísticas con animación
    setTimeout(() => {
        animateCounter('stat-pedidos', userStats.pedidos);
        document.getElementById('stat-gastado').textContent = userStats.totalGastado;
        document.getElementById('stat-satisfaccion').textContent = userStats.satisfaccion;
    }, 500);
}

function animateCounter(elementId, targetValue) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    let currentValue = 0;
    const increment = targetValue / 20;
    const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= targetValue) {
            currentValue = targetValue;
            clearInterval(timer);
        }
        element.textContent = Math.floor(currentValue);
    }, 50);
}

// ====================================
// ACTIVIDAD DEL USUARIO
// ====================================

function loadUserActivity() {
    const urlParams = new URLSearchParams(window.location.search);
    const run = urlParams.get('run');
    
    const activitiesDatabase = {
        '12345678-9': [
            {
                action: 'Compra realizada',
                description: 'PC Gamer ASUS ROG',
                time: 'Hace 2 días'
            },
            {
                action: 'Perfil actualizado',
                description: 'Cambió dirección',
                time: 'Hace 1 semana'
            },
            {
                action: 'Reseña publicada',
                description: '⭐⭐⭐⭐⭐ Mouse Logitech',
                time: 'Hace 2 semanas'
            }
        ],
        '98765432-1': [
            {
                action: 'Registro completado',
                description: 'Cuenta verificada',
                time: 'Hace 5 días'
            },
            {
                action: 'Primera compra',
                description: 'Teclado Gaming',
                time: 'Hace 3 días'
            }
        ],
        '11222333-4': [
            {
                action: 'Upgrade a Premium',
                description: 'Suscripción activada',
                time: 'Hace 1 día'
            },
            {
                action: 'Compra realizada',
                description: 'Silla Gaming',
                time: 'Hace 3 días'
            }
        ]
    };

    const userActivities = activitiesDatabase[run] || [];
    
    const activityContainer = document.getElementById('user-activity-list');
    if (!activityContainer) return;

    activityContainer.innerHTML = '';

    if (userActivities.length === 0) {
        activityContainer.innerHTML = '<div class="activity-item">No hay actividad reciente</div>';
        return;
    }

    userActivities.forEach(activity => {
        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item';
        activityItem.innerHTML = `
            <div>
                <strong>${activity.action}</strong>
                <div class="text-secondary small">${activity.description}</div>
            </div>
            <div class="activity-time">${activity.time}</div>
        `;
        activityContainer.appendChild(activityItem);
    });
}

// ====================================
// HISTORIAL DE PEDIDOS
// ====================================

function loadUserOrders() {
    const urlParams = new URLSearchParams(window.location.search);
    const run = urlParams.get('run');
    
    const ordersDatabase = {
        '12345678-9': [
            {
                id: '#ORD-2024-001',
                fecha: '15/01/2024',
                productos: 'PC Gamer ASUS ROG, Mouse Logitech',
                total: '$1.299.990',
                estado: 'Entregado',
                estadoClass: 'success'
            },
            {
                id: '#ORD-2024-002',
                fecha: '05/01/2024',
                productos: 'Silla Gaming',
                total: '$289.990',
                estado: 'En Proceso',
                estadoClass: 'primary'
            }
        ],
        '98765432-1': [
            {
                id: '#ORD-2024-003',
                fecha: '12/01/2024',
                productos: 'Teclado Gaming RGB',
                total: '$89.990',
                estado: 'Entregado',
                estadoClass: 'success'
            }
        ],
        '11222333-4': [
            {
                id: '#ORD-2024-004',
                fecha: '18/01/2024',
                productos: 'Silla Gaming Pro',
                total: '$399.990',
                estado: 'Enviado',
                estadoClass: 'warning'
            }
        ]
    };

    const userOrders = ordersDatabase[run] || [];
    
    const ordersTableBody = document.getElementById('orders-table-body');
    if (!ordersTableBody) return;

    ordersTableBody.innerHTML = '';

    if (userOrders.length === 0) {
        ordersTableBody.innerHTML = `
            <tr>
                <td colspan="6" class="text-center text-secondary">
                    No hay pedidos registrados para este usuario
                </td>
            </tr>
        `;
        return;
    }

    userOrders.forEach(order => {
        const row = document.createElement('tr');
        
        const estadoBadgeStyle = order.estadoClass === 'success' ? 'background: #39FF14; color: black;' : 
                                order.estadoClass === 'warning' ? 'background: #ffaa00; color: black;' : '';
        
        row.innerHTML = `
            <td>${order.id}</td>
            <td>${order.fecha}</td>
            <td>${order.productos}</td>
            <td>${order.total}</td>
            <td>
                <span class="category-badge" style="${estadoBadgeStyle}">
                    ${order.estado}
                </span>
            </td>
            <td>
                <button class="btn btn-secondary btn-sm" onclick="viewOrderDetails('${order.id}')">
                    Ver Detalles
                </button>
            </td>
        `;
        
        ordersTableBody.appendChild(row);
    });
}

// ====================================
// FUNCIONES DE NAVEGACIÓN
// ====================================

function editUser() {
    const urlParams = new URLSearchParams(window.location.search);
    const run = urlParams.get('run') || '12345678-9';
    window.location.href = `editar_usuario.html?run=${run}`;
}

function viewOrderDetails(orderId) {
    window.location.href = `ver_pedido.html?id=${orderId}`;
}

// ====================================
// SISTEMA DE MENSAJES
// ====================================

function showMessage(message, type = 'info') {
    const messageEl = document.createElement('div');
    messageEl.className = `message message-${type}`;
    messageEl.textContent = message;
    
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
    
    document.body.appendChild(messageEl);
    
    setTimeout(() => {
        messageEl.style.transform = 'translateX(0)';
    }, 100);
    
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