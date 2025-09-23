// ====================================
// VER USUARIO - LEVEL-UP GAMER ADMIN
// ====================================

let usuariosData = null;
let currentUser = null;

document.addEventListener('DOMContentLoaded', function() {
    console.log('👁️ Vista de usuario cargada');
    
    // Verificar autenticación
    checkAdminAuth();
    
    // Cargar datos del usuario desde JSON
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
        
        console.log('Datos de usuarios cargados');
        
        // Cargar datos del usuario específico
        loadUserData();
        loadUserStats();
        loadUserActivity();
        loadUserOrders();
        
    } catch (error) {
        console.error('Error al cargar datos desde JSON:', error);
        showMessage('Error al cargar los datos de usuarios', 'error');
        
        // Fallback: usar datos de ejemplo
        loadFallbackData();
    }
}

function loadFallbackData() {
    usuariosData = [
        {
            run: '19011022-K',
            nombre: 'Catalina',
            apellidos: 'Ormeño Pérez',
            correo: 'catalina.ormeño@duoc.cl',
            fechaNacimiento: '1998-05-12',
            tipoUsuario: 'Cliente',
            region: 'Región Metropolitana',
            comuna: 'Santiago',
            direccion: 'Av. Libertador Bernardo O\'Higgins 1234, Santiago'
        }
    ];
    
    loadUserData();
    loadUserStats();
    loadUserActivity();
    loadUserOrders();
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
// CARGA DE DATOS DEL USUARIO
// ====================================

function loadUserData() {
    // Obtener RUN desde URL
    const urlParams = new URLSearchParams(window.location.search);
    const runParam = urlParams.get('run');
    
    if (!runParam) {
        showMessage('No se especificó un usuario válido', 'error');
        setTimeout(() => {
            window.location.href = 'usuarios.html';
        }, 2000);
        return;
    }
    
    if (!usuariosData) {
        showMessage('Datos de usuarios no disponibles', 'error');
        return;
    }
    
    // Buscar usuario por RUN (limpiando formato)
    currentUser = usuariosData.find(user => {
        const cleanUserRun = user.run.replace(/[.-]/g, '');
        const cleanParamRun = runParam.replace(/[.-]/g, '');
        return cleanUserRun === cleanParamRun;
    });
    
    if (!currentUser) {
        showMessage('Usuario no encontrado', 'error');
        setTimeout(() => {
            window.location.href = 'usuarios.html';
        }, 2000);
        return;
    }

    // Llenar los campos con los datos del usuario
    fillUserData(currentUser);
}

function fillUserData(userData) {
    // Información principal
    document.getElementById('nombre-usuario').textContent = `${userData.nombre} ${userData.apellidos}`;
    document.getElementById('run-usuario').textContent = formatRun(userData.run);
    document.getElementById('correo-usuario').textContent = userData.correo;
    
    // Formatear fecha de nacimiento
    const fechaNac = userData.fechaNacimiento ? formatDate(userData.fechaNacimiento) : 'No especificada';
    document.getElementById('fecha-usuario').textContent = fechaNac;
    
    document.getElementById('region-usuario').textContent = userData.region;
    document.getElementById('comuna-usuario').textContent = userData.comuna;
    document.getElementById('direccion-usuario').textContent = userData.direccion;
    
    // Simular fecha de registro (ya que no está en el JSON)
    const fechaRegistro = new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
    document.getElementById('fecha-registro').textContent = formatDate(fechaRegistro.toISOString());
    
    // Tipo de usuario con estilo apropiado
    const tipoElement = document.getElementById('tipo-usuario');
    tipoElement.textContent = userData.tipoUsuario;
    
    // Aplicar clase CSS según el tipo de usuario
    switch(userData.tipoUsuario) {
        case 'Administrador':
            tipoElement.className = 'category-badge type-premium';
            break;
        case 'Vendedor':
            tipoElement.className = 'category-badge type-premium';
            break;
        case 'Cliente':
            tipoElement.className = 'category-badge type-basic';
            break;
        default:
            tipoElement.className = 'category-badge';
    }
}

// ====================================
// ESTADÍSTICAS DEL USUARIO
// ====================================

function loadUserStats() {
    if (!currentUser) return;
    
    // Simular estadísticas basadas en el tipo de usuario
    let stats = {
        pedidos: 0,
        totalGastado: '$0',
        satisfaccion: '0%'
    };
    
    switch(currentUser.tipoUsuario) {
        case 'Cliente':
            stats = {
                pedidos: Math.floor(Math.random() * 20) + 1,
                totalGastado: `$${(Math.floor(Math.random() * 500000) + 50000).toLocaleString('es-CL')}`,
                satisfaccion: `${Math.floor(Math.random() * 20) + 80}%`
            };
            break;
        case 'Administrador':
            stats = {
                pedidos: Math.floor(Math.random() * 10) + 5,
                totalGastado: `$${(Math.floor(Math.random() * 300000) + 100000).toLocaleString('es-CL')}`,
                satisfaccion: `${Math.floor(Math.random() * 10) + 90}%`
            };
            break;
        case 'Vendedor':
            stats = {
                pedidos: Math.floor(Math.random() * 15) + 3,
                totalGastado: `$${(Math.floor(Math.random() * 400000) + 75000).toLocaleString('es-CL')}`,
                satisfaccion: `${Math.floor(Math.random() * 15) + 85}%`
            };
            break;
    }

    // Actualizar estadísticas con animación
    setTimeout(() => {
        animateCounter('stat-pedidos', parseInt(stats.pedidos));
        document.getElementById('stat-gastado').textContent = stats.totalGastado;
        document.getElementById('stat-satisfaccion').textContent = stats.satisfaccion;
    }, 500);
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
        element.textContent = Math.floor(currentValue);
    }, 50);
}

// ====================================
// ACTIVIDAD DEL USUARIO
// ====================================

function loadUserActivity() {
    if (!currentUser) return;
    
    // Generar actividad basada en el usuario actual
    const activities = generateUserActivities(currentUser);

    const activityContainer = document.getElementById('user-activity-list');
    if (!activityContainer) return;

    activityContainer.innerHTML = '';

    if (activities.length === 0) {
        activityContainer.innerHTML = '<div class="activity-item"><div class="text-secondary">No hay actividad reciente</div></div>';
        return;
    }

    activities.forEach(activity => {
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

function generateUserActivities(user) {
    const activities = [];
    
    switch(user.tipoUsuario) {
        case 'Cliente':
            activities.push(
                {
                    action: 'Compra realizada',
                    description: 'Producto gaming adquirido',
                    time: 'Hace 2 días'
                },
                {
                    action: 'Perfil actualizado',
                    description: 'Información de contacto modificada',
                    time: 'Hace 1 semana'
                },
                {
                    action: 'Reseña publicada',
                    description: '★★★★★ Producto excelente',
                    time: 'Hace 2 semanas'
                }
            );
            break;
        case 'Administrador':
            activities.push(
                {
                    action: 'Sesión iniciada',
                    description: 'Acceso al panel administrativo',
                    time: 'Hace 1 hora'
                },
                {
                    action: 'Usuario gestionado',
                    description: 'Modificación de permisos',
                    time: 'Hace 3 horas'
                },
                {
                    action: 'Producto agregado',
                    description: 'Nuevo item en catálogo',
                    time: 'Hace 1 día'
                }
            );
            break;
        case 'Vendedor':
            activities.push(
                {
                    action: 'Venta procesada',
                    description: 'Pedido #12345 completado',
                    time: 'Hace 3 horas'
                },
                {
                    action: 'Inventario actualizado',
                    description: 'Stock de productos modificado',
                    time: 'Hace 6 horas'
                },
                {
                    action: 'Cliente atendido',
                    description: 'Consulta técnica resuelta',
                    time: 'Hace 1 día'
                }
            );
            break;
    }
    
    return activities;
}

// ====================================
// HISTORIAL DE PEDIDOS
// ====================================

function loadUserOrders() {
    if (!currentUser) return;
    
    // Generar pedidos simulados basados en el usuario
    const orders = generateUserOrders(currentUser);
    
    const ordersTableBody = document.getElementById('orders-table-body');
    if (!ordersTableBody) return;

    ordersTableBody.innerHTML = '';

    if (orders.length === 0) {
        ordersTableBody.innerHTML = `
            <tr>
                <td colspan="6" class="text-center text-secondary">
                    No hay pedidos registrados para este usuario
                </td>
            </tr>
        `;
        return;
    }

    orders.forEach(order => {
        const row = document.createElement('tr');
        
        const estadoBadgeClass = getEstadoPedidoBadgeClass(order.estado);
        
        row.innerHTML = `
            <td>${order.id}</td>
            <td>${order.fecha}</td>
            <td class="d-hide-sm">${order.productos}</td>
            <td>${order.total}</td>
            <td>
                <span class="category-badge ${estadoBadgeClass}">
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

function generateUserOrders(user) {
    const orders = [];
    const numOrders = Math.floor(Math.random() * 5) + 1;
    
    const productos = [
        'PC Gamer ASUS ROG',
        'Mouse Logitech G502',
        'Teclado Gaming RGB',
        'Silla Gaming Pro',
        'Monitor 24" Gaming',
        'Auriculares HyperX'
    ];
    
    const estados = ['Entregado', 'En Proceso', 'Enviado', 'Pendiente'];
    
    for (let i = 0; i < numOrders; i++) {
        const randomDate = new Date();
        randomDate.setDate(randomDate.getDate() - Math.floor(Math.random() * 90));
        
        const producto = productos[Math.floor(Math.random() * productos.length)];
        const estado = estados[Math.floor(Math.random() * estados.length)];
        const total = Math.floor(Math.random() * 500000) + 50000;
        
        orders.push({
            id: `#ORD-2024-${String(i + 1).padStart(3, '0')}`,
            fecha: formatDate(randomDate.toISOString().split('T')[0]),
            productos: producto,
            total: `${total.toLocaleString('es-CL')}`,
            estado: estado
        });
    }
    
    return orders.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
}

function getEstadoPedidoBadgeClass(estado) {
    switch(estado) {
        case 'Entregado':
            return 'type-basic'; // Verde
        case 'En Proceso':
            return 'type-premium'; // Azul
        case 'Enviado':
            return 'status-active'; // Verde
        case 'Pendiente':
            return 'status-inactive'; // Rojo
        default:
            return 'category-badge';
    }
}

// ====================================
// FUNCIONES DE NAVEGACIÓN
// ====================================

function editUser() {
    const urlParams = new URLSearchParams(window.location.search);
    const run = urlParams.get('run');
    if (run) {
        window.location.href = `editar_usuario.html?run=${run}`;
    }
}

function viewOrderDetails(orderId) {
    window.location.href = `ver_pedido.html?id=${orderId}`;
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