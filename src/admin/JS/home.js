// ====================================
// ADMIN HOME - LEVEL-UP GAMER
// ====================================

document.addEventListener('DOMContentLoaded', function() {
    // Proteger acceso solo admin
    const rol = localStorage.getItem('rol');
    const logueado = localStorage.getItem('logueado');
    if (rol !== 'admin' || logueado !== 'true') {
        window.location.href = '../login/login.html';
        return;
    }
    mostrarNombreAdmin();
    configurarLogout();
    setupNavigation();
    showSection('dashboard');
    loadDashboardData();
});

// ====================================
// AUTENTICACIÓN
// ====================================

// Transición visual al cargar
function fadeInBody() {
  document.body.classList.remove("opacity-0");
  document.body.classList.add("opacity-100");
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("Panel Admin cargado");

  fadeInBody();
  validarSesionAdmin();
  mostrarNombreAdmin();
  configurarLogout();
});

// Mostrar nombre del admin
function mostrarNombreAdmin() {
    const nombre = localStorage.getItem("loginExitoso") || "Administrador";
    const nombreElemento = document.getElementById("admin-name");
    if (nombreElemento) nombreElemento.textContent = nombre;
}

// Cerrar sesión
function configurarLogout() {
    const btnLogout = document.getElementById("logoutBtn");
    if (btnLogout) {
        btnLogout.addEventListener("click", () => {
            if (confirm("¿Cerrar sesión?")) {
                localStorage.clear();
                window.location.href = "../../index.html";
            }
        });
    }
}

// ====================================
// NAVEGACIÓN
// ====================================

function setupNavigation() {
    document.querySelectorAll('.admin-nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('onclick')) {
                return;
            }
            if (this.getAttribute('href').startsWith('http') || this.getAttribute('href').includes('.html')) return;
            e.preventDefault();
        });
    });
}

function showSection(sectionName) {
    // Fade out la sección visible
    const allSections = document.querySelectorAll('.admin-section');
    let currentSection = null;
    allSections.forEach(section => {
        if (section.style.display !== 'none') {
            currentSection = section;
        }
    });
    if (currentSection) {
        currentSection.classList.remove('fade-in');
        currentSection.classList.add('fade-out');
        setTimeout(() => {
            currentSection.style.display = 'none';
            currentSection.classList.remove('fade-out');
            showTargetSection(sectionName);
        }, 400);
    } else {
        showTargetSection(sectionName);
    }
}

function showTargetSection(sectionName) {
    const targetSection = document.getElementById(sectionName + '-section');
    if (targetSection) {
        targetSection.style.display = 'block';
        setTimeout(() => {
            targetSection.classList.add('fade-in');
        }, 10);
    }
    // Actualizar navegación activa
    document.querySelectorAll('.admin-nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('onclick') && link.getAttribute('onclick').includes(sectionName)) {
            link.classList.add('active');
        }
        if (sectionName === 'dashboard' && link.textContent.includes('Dashboard')) {
            link.classList.add('active');
        }
    });
    // Cargar datos según la sección
    switch(sectionName) {
        case 'products':
            loadProductsData();
            break;
        case 'orders':
            loadOrdersData();
            break;
        case 'users':
            loadUsersData();
            break;
        case 'dashboard':
        default:
            loadDashboardData();
    }
}

// ====================================
// DASHBOARD
// ====================================

function loadDashboardData() {
    // Datos más realistas y compactos
    const stats = {
        products: 42,
        orders: 156,
        users: 89,
        revenue: 2450000
    };
    
    // Actualizar estadísticas con animación
    animateCounter('total-products', stats.products);
    animateCounter('total-orders', stats.orders);
    animateCounter('total-users', stats.users);
    animateCounterMoney('total-revenue', stats.revenue);
    
    // Cargar productos más vendidos
    loadTopProducts();
    loadRecentActivity();
}

function animateCounter(elementId, finalValue) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    let current = 0;
    const increment = finalValue / 30; // Menos pasos para animación más rápida
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= finalValue) {
            current = finalValue;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 40);
}

function animateCounterMoney(elementId, finalValue) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    // Añadir clase para styling especial de dinero
    element.classList.add('money');
    
    let current = 0;
    const increment = finalValue / 30;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= finalValue) {
            current = finalValue;
            clearInterval(timer);
        }
        element.textContent = formatPriceCompact(Math.floor(current));
    }, 40);
}

function loadRecentActivity() {
    const activities = [
        {
            action: 'Nuevo pedido #1001',
            time: 'Hace 5 minutos',
            icon: '🛒'
        },
        {
            action: 'Producto agregado',
            time: 'Hace 1 hora',
            icon: '📦'
        },
        {
            action: 'Usuario registrado',
            time: 'Hace 2 horas',
            icon: '👤'
        },
        {
            action: 'Pedido completado',
            time: 'Hace 3 horas',
            icon: '✅'
        }
    ];
    
    const container = document.getElementById('recent-activity');
    if (!container) return;
    
    container.innerHTML = activities.map(activity => `
        <div class="activity-item">
            <div class="d-flex align-items-center">
                <span class="me-2">${activity.icon}</span>
                <div class="flex-grow-1">
                    <div>${activity.action}</div>
                    <div class="activity-time">${activity.time}</div>
                </div>
            </div>
        </div>
    `).join('');
}

function loadTopProducts() {
    const products = [
        {
            id: 1,
            name: 'PlayStation 5',
            category: 'Consolas',
            sales: 45,
            stock: 12,
            status: 'Activo'
        },
        {
            id: 2,
            name: 'Xbox Series X',
            category: 'Consolas',
            sales: 38,
            stock: 8,
            status: 'Activo'
        },
        {
            id: 3,
            name: 'FIFA 24',
            category: 'Juegos',
            sales: 67,
            stock: 25,
            status: 'Activo'
        },
        {
            id: 4,
            name: 'DualSense Controller',
            category: 'Accesorios',
            sales: 89,
            stock: 5,
            status: 'Stock Bajo'
        }
    ];
    
    const tbody = document.getElementById('top-products-table');
    if (!tbody) return;
    
    tbody.innerHTML = products.map(product => `
        <tr>
            <td>${product.name}</td>
            <td><span class="category-badge">${product.category}</span></td>
            <td>${product.sales}</td>
            <td>
                <span class="badge ${product.stock < 10 ? 'bg-warning text-dark' : 'bg-success'}">
                    ${product.stock}
                </span>
            </td>
            <td>
                <button class="btn btn-sm btn-primary me-1" onclick="editProduct(${product.id})">
                    ✏️
                </button>
                <button class="btn btn-sm btn-info" onclick="viewProduct(${product.id})">
                    👁️
                </button>
            </td>
        </tr>
    `).join('');
}

// ====================================
// GESTIÓN DE PRODUCTOS
// ====================================

function loadProductsData() {
    const products = [
        {
            id: 1,
            name: 'PlayStation 5',
            category: 'Consolas',
            price: 699990,
            stock: 12,
            status: 'Activo'
        },
        {
            id: 2,
            name: 'Xbox Series X',
            category: 'Consolas',
            price: 649990,
            stock: 8,
            status: 'Activo'
        },
        {
            id: 3,
            name: 'Nintendo Switch',
            category: 'Consolas',
            price: 399990,
            stock: 15,
            status: 'Activo'
        },
        {
            id: 4,
            name: 'FIFA 24',
            category: 'Juegos',
            price: 69990,
            stock: 25,
            status: 'Activo'
        },
        {
            id: 5,
            name: 'Call of Duty: Modern Warfare III',
            category: 'Juegos',
            price: 79990,
            stock: 0,
            status: 'Agotado'
        }
    ];
    
    const tbody = document.getElementById('products-table');
    if (!tbody) return;
    
    tbody.innerHTML = products.map(product => `
        <tr>
            <td>#${product.id}</td>
            <td>${product.name}</td>
            <td><span class="category-badge">${product.category}</span></td>
            <td>${formatPrice(product.price)}</td>
            <td>
                <span class="badge ${product.stock === 0 ? 'bg-danger' : product.stock < 10 ? 'bg-warning text-dark' : 'bg-success'}">
                    ${product.stock}
                </span>
            </td>
            <td>
                <span class="badge ${product.status === 'Activo' ? 'bg-success' : 'bg-danger'}">
                    ${product.status}
                </span>
            </td>
            <td>
                <button class="btn btn-sm btn-primary me-1" onclick="editProduct(${product.id})" title="Editar">
                    ✏️
                </button>
                <button class="btn btn-sm btn-info me-1" onclick="viewProduct(${product.id})" title="Ver">
                    👁️
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteProduct(${product.id})" title="Eliminar">
                    🗑️
                </button>
            </td>
        </tr>
    `).join('');
}

// ====================================
// GESTIÓN DE PEDIDOS
// ====================================

function loadOrdersData() {
    const orders = [
        {
            id: 1001,
            customer: 'Juan Pérez',
            date: '2024-03-15',
            total: 699990,
            status: 'Pendiente'
        },
        {
            id: 1000,
            customer: 'María González',
            date: '2024-03-15',
            total: 149980,
            status: 'Enviado'
        },
        {
            id: 999,
            customer: 'Carlos López',
            date: '2024-03-14',
            total: 399990,
            status: 'Entregado'
        },
        {
            id: 998,
            customer: 'Ana Martínez',
            date: '2024-03-14',
            total: 79990,
            status: 'Completado'
        }
    ];
    
    const tbody = document.getElementById('orders-table');
    if (!tbody) return;
    
    tbody.innerHTML = orders.map(order => `
        <tr>
            <td>#${order.id}</td>
            <td>${order.customer}</td>
            <td>${formatDate(order.date)}</td>
            <td>${formatPrice(order.total)}</td>
            <td>
                <span class="badge ${getOrderStatusClass(order.status)}">
                    ${order.status}
                </span>
            </td>
            <td>
                <button class="btn btn-sm btn-primary me-1" onclick="viewOrder(${order.id})" title="Ver Detalles">
                    👁️
                </button>
                <button class="btn btn-sm btn-success me-1" onclick="updateOrderStatus(${order.id})" title="Actualizar Estado">
                    📝
                </button>
            </td>
        </tr>
    `).join('');
}

function getOrderStatusClass(status) {
    switch(status) {
        case 'Pendiente': return 'bg-warning text-dark';
        case 'Enviado': return 'bg-info';
        case 'Entregado': return 'bg-success';
        case 'Completado': return 'bg-primary';
        default: return 'bg-secondary';
    }
}

// ====================================
// GESTIÓN DE USUARIOS
// ====================================

function loadUsersData() {
    const users = [
        {
            id: 1,
            name: 'Juan Pérez',
            email: 'juan@email.com',
            registrationDate: '2024-01-15',
            status: 'Activo'
        },
        {
            id: 2,
            name: 'María González',
            email: 'maria@email.com',
            registrationDate: '2024-02-10',
            status: 'Activo'
        },
        {
            id: 3,
            name: 'Carlos López',
            email: 'carlos@email.com',
            registrationDate: '2024-02-28',
            status: 'Inactivo'
        },
        {
            id: 4,
            name: 'Ana Martínez',
            email: 'ana@email.com',
            registrationDate: '2024-03-05',
            status: 'Activo'
        }
    ];
    
    const tbody = document.getElementById('users-table');
    if (!tbody) return;
    
    tbody.innerHTML = users.map(user => `
        <tr>
            <td>#${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${formatDate(user.registrationDate)}</td>
            <td>
                <span class="badge ${user.status === 'Activo' ? 'bg-success' : 'bg-secondary'}">
                    ${user.status}
                </span>
            </td>
            <td>
                <button class="btn btn-sm btn-info me-1" onclick="viewUser(${user.id})" title="Ver">
                    👁️
                </button>
                <button class="btn btn-sm btn-primary me-1" onclick="editUser(${user.id})" title="Editar">
                    ✏️
                </button>
                <button class="btn btn-sm ${user.status === 'Activo' ? 'btn-warning' : 'btn-success'}" onclick="toggleUserStatus(${user.id})" title="${user.status === 'Activo' ? 'Desactivar' : 'Activar'}">
                    ${user.status === 'Activo' ? '🔒' : '🔓'}
                </button>
            </td>
        </tr>
    `).join('');
}

// ====================================
// ACCIONES DE PRODUCTOS
// ====================================

function editProduct(id) {
    showMessage(`Editando producto #${id}`, 'info');
}

function viewProduct(id) {
    showMessage(`Viendo detalles del producto #${id}`, 'info');
}

function deleteProduct(id) {
    if (confirm(`¿Estás seguro de eliminar el producto #${id}?`)) {
        showMessage(`Producto #${id} eliminado correctamente`, 'success');
        setTimeout(() => {
            loadProductsData();
        }, 1000);
    }
}

// ====================================
// ACCIONES DE PEDIDOS
// ====================================

function viewOrder(id) {
    showMessage(`Viendo detalles del pedido #${id}`, 'info');
}

function updateOrderStatus(id) {
    const newStatus = prompt('Nuevo estado del pedido:', 'Enviado');
    if (newStatus) {
        showMessage(`Estado del pedido #${id} actualizado a: ${newStatus}`, 'success');
        setTimeout(() => {
            loadOrdersData();
        }, 1000);
    }
}

// ====================================
// ACCIONES DE USUARIOS
// ====================================

function viewUser(id) {
    showMessage(`Viendo detalles del usuario #${id}`, 'info');
}

function editUser(id) {
    showMessage(`Editando usuario #${id}`, 'info');
}

function toggleUserStatus(id) {
    if (confirm(`¿Cambiar el estado del usuario #${id}?`)) {
        showMessage(`Estado del usuario #${id} actualizado correctamente`, 'success');
        setTimeout(() => {
            loadUsersData();
        }, 1000);
    }
}

// ====================================
// UTILIDADES
// ====================================

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-CL', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function formatPrice(price) {
    return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
        minimumFractionDigits: 0
    }).format(price);
}

// Nueva función para formatear precios de manera más compacta
function formatPriceCompact(price) {
    if (price >= 1000000) {
        return `$${(price / 1000000).toFixed(1)}M`;
    } else if (price >= 1000) {
        return `$${(price / 1000).toFixed(0)}K`;
    } else {
        return `$${price}`;
    }
}

function generateReport() {
    showMessage('Generando reporte...', 'info');
    
    setTimeout(() => {
        showMessage('Reporte generado correctamente', 'success');
        
        const reportData = {
            fecha: new Date().toLocaleDateString('es-CL'),
            productos: 42,
            pedidos: 156,
            usuarios: 89,
            ingresos: 2450000
        };
        
        const reportContent = `
REPORTE LEVEL-UP GAMER
=====================
Fecha: ${reportData.fecha}

RESUMEN GENERAL:
- Total Productos: ${reportData.productos}
- Total Pedidos: ${reportData.pedidos}
- Total Usuarios: ${reportData.usuarios}
- Ingresos Totales: ${formatPrice(reportData.ingresos)}

PRODUCTOS MÁS VENDIDOS:
1. PlayStation 5 - 45 ventas
2. Xbox Series X - 38 ventas
3. FIFA 24 - 67 ventas
4. DualSense Controller - 89 ventas

ESTADO DE PEDIDOS:
- Pendientes: 12
- Enviados: 8
- Entregados: 136

Generado automáticamente por Level-Up Gamer Admin Panel
        `;
        
        downloadReport(reportContent, 'reporte-levelup-gamer.txt');
    }, 2000);
}

function downloadReport(content, filename) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
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
        max-width: 300px;
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
    
    setTimeout(() => {
        messageEl.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(messageEl)) {
                document.body.removeChild(messageEl);
            }
        }, 300);
    }, 3000);
}