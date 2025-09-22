// Fade-in del body al cargar la página (antes estaba inline en producto.html)
function fadeInBody() {
    document.body.classList.remove("opacity-0");
    document.body.classList.add("opacity-100");
}

// Ejecutar fadeInBody al cargar la página
window.addEventListener('load', fadeInBody);
// Utilidad debounce para evitar múltiples llamadas rápidas
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// Utilidad showMessage para mostrar mensajes flotantes
function showMessage(text, type = 'info') {
    const msg = document.createElement('div');
    msg.textContent = text;
    let bg = 'bg-blue-600';
    if (type === 'success') bg = 'bg-green-600';
    if (type === 'error') bg = 'bg-red-600';
    if (type === 'warning') bg = 'bg-yellow-500 text-black';
    msg.className = `fixed top-20 left-1/2 transform -translate-x-1/2 ${bg} text-white px-6 py-3 rounded-lg shadow-lg z-50 fade-in`;
    document.body.appendChild(msg);
    setTimeout(() => {
        msg.classList.add('fade-out');
        setTimeout(() => msg.remove(), 400);
    }, 2200);
}
// ====================================
// PRODUCTOS.JS - Funcionalidad para la página de productos
// ====================================

// Estado global de la aplicación
let allProducts = [];
let filteredProducts = [];
let currentPage = 1;
const productsPerPage = 12;

// Datos de productos (simulando base de datos)
const productsData = [
    // PC Gamers
    {
        id: 1,
        name: "PC Gamer ASUS ROG Strix",
        category: "pc-gamers",
        price: 1299990,
        originalPrice: 1499990,
        image: "🖥️",
        description: "PC Gaming de alta gama con RTX 4070, Ryzen 7 7700X, 32GB RAM",
        specs: ["AMD Ryzen 7 7700X", "RTX 4070 12GB", "32GB DDR5", "1TB NVMe SSD"],
        stock: 5,
        isNew: true,
        featured: true
    },
    {
        id: 2,
        name: "PC Gamer HP OMEN 45L",
        category: "pc-gamers",
        price: 899990,
        image: "💻",
        description: "PC Gaming intermedio perfecto para 1440p gaming",
        specs: ["Intel i5-13400F", "RTX 4060 8GB", "16GB DDR4", "512GB NVMe"],
        stock: 8,
        featured: true
    },

    // Periféricos
    {
        id: 3,
        name: "Mouse Logitech G Pro X Superlight",
        category: "perifericos",
        price: 149990,
        image: "🖱️",
        description: "Mouse gaming profesional ultra-liviano para esports",
        specs: ["25,600 DPI", "63g peso", "70h batería", "Sensor HERO 25K"],
        stock: 15,
        isNew: true
    },
    {
        id: 4,
        name: "Teclado Razer BlackWidow V4",
        category: "perifericos",
        price: 179990,
        originalPrice: 199990,
        image: "⌨️",
        description: "Teclado mecánico gaming con switches Green",
        specs: ["Switches Razer Green", "RGB Chroma", "Media Keys", "USB-C"],
        stock: 12
    },
    {
        id: 5,
        name: "Auriculares SteelSeries Arctis 7P",
        category: "perifericos",
        price: 199990,
        image: "🎧",
        description: "Auriculares inalámbricos premium para gaming",
        specs: ["Audio 7.1 surround", "24h batería", "Micrófono retráctil", "Wireless 2.4GHz"],
        stock: 20
    },

    // Consolas
    {
        id: 6,
        name: "PlayStation 5 Standard",
        category: "consolas",
        price: 549990,
        image: "🎮",
        description: "La consola next-gen de Sony con unidad de disco",
        specs: ["AMD Zen 2", "Ray Tracing", "4K Gaming", "825GB SSD"],
        stock: 3,
        featured: true
    },
    {
        id: 7,
        name: "Xbox Series X",
        category: "consolas",
        price: 499990,
        image: "📦",
        description: "La consola más poderosa de Xbox con 4K nativo",
        specs: ["AMD Zen 2", "12 TFLOPS", "4K/120fps", "1TB SSD"],
        stock: 4
    },

    // Sillas Gaming
    {
        id: 8,
        name: "Silla Secretlab Titan Evo 2022",
        category: "sillas",
        price: 449990,
        originalPrice: 499990,
        image: "🪑",
        description: "Silla gaming premium con soporte lumbar magnético",
        specs: ["Cuero PU premium", "Soporte lumbar 4D", "Brazos 4D", "Hasta 180kg"],
        stock: 6,
        featured: true
    },
    {
        id: 9,
        name: "Silla DXRacer Formula Series",
        category: "sillas",
        price: 299990,
        image: "💺",
        description: "Silla gaming ergonómica estilo racing",
        specs: ["Diseño racing", "Reclinable 90-135°", "Cojines memoria", "Hasta 100kg"],
        stock: 10
    },

    // Accesorios
    {
        id: 10,
        name: "Monitor ASUS TUF Gaming 27\"",
        category: "accesorios",
        price: 349990,
        image: "📺",
        description: "Monitor gaming 1440p 165Hz con G-Sync compatible",
        specs: ["27\" QHD", "165Hz", "1ms", "G-Sync Compatible"],
        stock: 8,
        isNew: true
    },
    {
        id: 11,
        name: "Mousepad SteelSeries QcK XXL",
        category: "accesorios",
        price: 39990,
        image: "🖲️",
        description: "Mousepad gaming extra grande para setup completo",
        specs: ["900x400mm", "Base antideslizante", "Superficie tela", "3mm grosor"],
        stock: 25
    },
    {
        id: 12,
        name: "Webcam Logitech C920 HD Pro",
        category: "accesorios",
        price: 89990,
        image: "📹",
        description: "Webcam Full HD para streaming y videollamadas",
        specs: ["1080p 30fps", "Micrófono dual", "Enfoque automático", "Corrección luz"],
        stock: 15
    }
];

// ====================================
// INICIALIZACIÓN
// ====================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🛒 Página de Productos cargada');
    
    // Inicializar datos
    allProducts = [...productsData];
    filteredProducts = [...allProducts];
    
    // Inicializar componentes
    initFilters();
    initSearch();
    initSort();
    initCart();
    
    // Renderizar productos iniciales
    renderProducts();
    updateCartCounter();
});

// ====================================
// RENDERIZADO DE PRODUCTOS
// ====================================

function renderProducts() {
    const grid = document.getElementById('products-grid');
    const loading = document.getElementById('loading');
    const noResults = document.getElementById('no-results');
    const loadMore = document.getElementById('load-more');
    
    // Mostrar loading
    loading.classList.remove('hidden');
    grid.innerHTML = '';
    
    setTimeout(() => {
        loading.classList.add('hidden');
        
        if (filteredProducts.length === 0) {
            noResults.classList.remove('hidden');
            loadMore.style.display = 'none';
            return;
        }
        
        noResults.classList.add('hidden');
        
        // Calcular productos a mostrar
        const startIndex = (currentPage - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        const productsToShow = filteredProducts.slice(0, endIndex);
        
        // Renderizar cada producto
        productsToShow.forEach(product => {
            const productCard = createProductCard(product);
            grid.appendChild(productCard);
        });
        
        // Mostrar/ocultar botón "Cargar más"
        if (endIndex < filteredProducts.length) {
            loadMore.style.display = 'block';
        } else {
            loadMore.style.display = 'none';
        }
        
    }, 500);
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card border-2 border-blue-500 rounded-2xl shadow-lg bg-[#181f2a]';
    
    const hasDiscount = product.originalPrice && product.originalPrice > product.price;
    const discountPercent = hasDiscount ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
    
    card.innerHTML = `
        <div class="relative h-full flex flex-col">
            <!-- Imagen del producto -->
            <div class="h-48 bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-6xl relative">
                ${product.image}
                <!-- Badges -->
                <div class="absolute top-2 left-2 space-y-1">
                    ${product.isNew ? '<span class="px-2 py-1 bg-green-500 text-white text-xs rounded">NUEVO</span>' : ''}
                    ${product.featured ? '<span class="px-2 py-1 bg-yellow-500 text-black text-xs rounded">DESTACADO</span>' : ''}
                    ${hasDiscount ? `<span class="px-2 py-1 bg-red-500 text-white text-xs rounded">-${discountPercent}%</span>` : ''}
                </div>
                <!-- Stock bajo -->
                ${product.stock <= 5 ? '<div class="absolute top-2 right-2"><span class="px-2 py-1 bg-orange-500 text-white text-xs rounded">¡Últimos!</span></div>' : ''}
            </div>
            <!-- Contenido -->
            <div class="p-4 flex flex-col flex-1">
                <h3 class="text-lg font-bold mb-2 text-white hover:text-blue-400 cursor-pointer" onclick="openProductModal(${product.id})">
                    ${product.name}
                </h3>
                <p class="text-secondary text-sm mb-3 line-clamp-2">${product.description}</p>
                <!-- Precio -->
                <div class="mb-4">
                    ${hasDiscount ? `<span class="text-gray-500 line-through text-sm">$${formatPrice(product.originalPrice)}</span>` : ''}
                    <div class="text-2xl font-bold gradient-text">$${formatPrice(product.price)}</div>
                </div>
                <!-- Stock -->
                <div class="mb-4">
                    <span class="text-secondary text-sm">Stock: </span>
                    <span class="${product.stock > 10 ? 'text-green-400' : product.stock > 5 ? 'text-yellow-400' : 'text-red-400'} text-sm font-semibold">
                        ${product.stock > 0 ? `${product.stock} disponibles` : 'Agotado'}
                    </span>
                </div>
                <!-- Botones -->
                <div class="flex flex-col items-center gap-2 mt-auto">
                    <button 
                        onclick="addToCart(${product.id})"
                        class="btn-primary rounded-2xl border border-[#39FF14] bg-[#181f2a] text-white font-bold py-3 px-8 min-w-[200px] max-w-full transition-all duration-150 hover:bg-[#232b3a] hover:text-[#39FF14] hover:border-[#1E90FF] ${product.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''}"
                        style="border-width:1.5px;"
                        ${product.stock === 0 ? 'disabled' : ''}
                    >
                        ${product.stock === 0 ? 'Agotado' : 'Agregar al Carrito 🛒'}
                    </button>
                    <button 
                        onclick="openProductModal(${product.id})"
                        class="rounded-2xl border border-[#39FF14] bg-transparent text-[#39FF14] font-bold py-3 px-8 min-w-[200px] max-w-full transition-all duration-150 hover:bg-[#232b3a] hover:text-white hover:border-[#1E90FF] btn-secondary"
                        style="border-width:1.5px;"
                    >
                        Ver Detalles
                    </button>
                </div>
            </div>
        </div>
    `;
    
    return card;
}

// ====================================
// SISTEMA DE FILTROS
// ====================================

function initFilters() {
    // Filtros de categoría
    const categoryFilters = document.querySelectorAll('.category-filter');
    categoryFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            // Actualizar botones activos
            categoryFilters.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            
            // Aplicar filtro
            const category = this.dataset.category;
            applyFilters();
        });
    });
    
    // Filtro de precio
    document.getElementById('price-filter').addEventListener('change', applyFilters);
}

function applyFilters() {
    const activeCategory = document.querySelector('.category-filter.active').dataset.category;
    const priceRange = document.getElementById('price-filter').value;
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    
    filteredProducts = allProducts.filter(product => {
        // Filtro de categoría
        const categoryMatch = activeCategory === 'todos' || product.category === activeCategory;
        
        // Filtro de precio
        let priceMatch = true;
        if (priceRange !== 'all') {
            const [min, max] = priceRange.split('-').map(Number);
            if (max) {
                priceMatch = product.price >= min && product.price <= max;
            } else {
                priceMatch = product.price >= min;
            }
        }
        
        // Filtro de búsqueda
        const searchMatch = product.name.toLowerCase().includes(searchTerm) ||
                          product.description.toLowerCase().includes(searchTerm) ||
                          product.specs.some(spec => spec.toLowerCase().includes(searchTerm));
        
        return categoryMatch && priceMatch && searchMatch;
    });
    
    // Aplicar ordenamiento
    applySorting();
    
    // Resetear paginación y renderizar
    currentPage = 1;
    renderProducts();
}

// ====================================
// SISTEMA DE BÚSQUEDA
// ====================================

function initSearch() {
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', debounce(applyFilters, 300));
}

// ====================================
// SISTEMA DE ORDENAMIENTO
// ====================================

function initSort() {
    document.getElementById('sort-select').addEventListener('change', function() {
        applySorting();
        currentPage = 1;
        renderProducts();
    });
}

function applySorting() {
    const sortBy = document.getElementById('sort-select').value;
    
    switch(sortBy) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'newest':
            filteredProducts.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
            break;
        case 'featured':
        default:
            filteredProducts.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
            break;
    }
}

// ====================================
// SISTEMA DE CARRITO
// ====================================

function initCart() {
    // Botón "Cargar más"
    document.getElementById('load-more').addEventListener('click', function() {
        currentPage++;
        renderProducts();
    });
    
    // Modal del carrito
    document.getElementById('cart-btn').addEventListener('click', openCartModal);
}

function addToCart(productId) {
    const product = allProducts.find(p => p.id === productId);
    if (!product || product.stock === 0) return;
    
    // Obtener carrito actual
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Buscar si el producto ya existe
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        if (existingItem.quantity < product.stock) {
            existingItem.quantity += 1;
            showMessage(`${product.name} agregado al carrito (${existingItem.quantity})`, 'success');
        } else {
            showMessage('No hay más stock disponible', 'error');
            return;
        }
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1,
            maxStock: product.stock
        });
        showMessage(`${product.name} agregado al carrito`, 'success');
    }
    
    // Guardar carrito
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCounter();
    
    // Efecto visual en el botón
    const button = event.target;
    const originalText = button.textContent;
    button.textContent = '¡Agregado! ✅';
    button.classList.add('bg-green-500');
    
    setTimeout(() => {
        button.textContent = originalText;
        button.classList.remove('bg-green-500');
    }, 1500);
}

function updateCartCounter() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const counter = document.getElementById('cart-counter');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    counter.textContent = totalItems;
    counter.style.display = totalItems > 0 ? 'flex' : 'none';
}

function openCartModal() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        showMessage('Tu carrito está vacío', 'info');
        return;
    }
    
    const modal = document.getElementById('product-modal');
    const modalContent = document.getElementById('modal-content');
    
    let cartHTML = `
        <div class="p-6">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold gradient-text">Carrito de Compras</h2>
                <button onclick="closeModal()" class="text-gray-400 hover:text-white text-2xl">&times;</button>
            </div>
            
            <div class="space-y-4 mb-6 max-h-60 overflow-y-auto">
    `;
    
    let total = 0;
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        cartHTML += `
            <div class="flex items-center justify-between p-4 bg-gray-800 rounded">
                <div class="flex items-center space-x-4">
                    <span class="text-2xl">${item.image}</span>
                    <div>
                        <h4 class="font-semibold">${item.name}</h4>
                        <p class="text-secondary text-sm">${formatPrice(item.price)} c/u</p>
                    </div>
                </div>
                
                <div class="flex items-center space-x-2">
                    <button onclick="updateCartQuantity(${item.id}, -1)" class="btn-secondary px-2 py-1 text-sm">-</button>
                    <span class="px-3 py-1 bg-gray-700 rounded">${item.quantity}</span>
                    <button onclick="updateCartQuantity(${item.id}, 1)" class="btn-secondary px-2 py-1 text-sm">+</button>
                    <button onclick="removeFromCart(${item.id})" class="text-red-400 hover:text-red-300 ml-2">🗑️</button>
                </div>
            </div>
        `;
    });
    
    cartHTML += `
            </div>
            
            <div class="border-t border-gray-700 pt-4">
                <div class="flex justify-between items-center text-xl font-bold mb-6">
                    <span>Total:</span>
                    <span class="gradient-text">${formatPrice(total)}</span>
                </div>
                
                <div class="flex gap-4">
                    <button onclick="closeModal()" class="btn-secondary flex-1">Seguir Comprando</button>
                    <button onclick="checkout()" class="btn-primary flex-1">Proceder al Pago 💳</button>
                </div>
            </div>
        </div>
    `;
    
    modalContent.innerHTML = cartHTML;
    modal.classList.remove('hidden');
}

function updateCartQuantity(productId, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        const newQuantity = item.quantity + change;
        
        if (newQuantity <= 0) {
            removeFromCart(productId);
            return;
        }
        
        if (newQuantity <= item.maxStock) {
            item.quantity = newQuantity;
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCounter();
            openCartModal(); // Refresh modal
        } else {
            showMessage('No hay más stock disponible', 'error');
        }
    }
}

function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== productId);
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCounter();
    
    if (cart.length === 0) {
        closeModal();
    } else {
        openCartModal(); // Refresh modal
    }
    
    showMessage('Producto eliminado del carrito', 'success');
}

function checkout() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        showMessage('Tu carrito está vacío', 'error');
        return;
    }
    
    // Simular proceso de checkout
    showMessage('Redirigiendo al checkout... (Funcionalidad simulada)', 'info');
    
    setTimeout(() => {
        showMessage('¡Compra realizada con éxito! 🎉', 'success');
        localStorage.removeItem('cart');
        updateCartCounter();
        closeModal();
    }, 2000);
}

// ====================================
// MODAL DE PRODUCTO
// ====================================

function openProductModal(productId) {
    const product = allProducts.find(p => p.id === productId);
    if (!product) return;
    
    const modal = document.getElementById('product-modal');
    const modalContent = document.getElementById('modal-content');
    
    const hasDiscount = product.originalPrice && product.originalPrice > product.price;
    const discountPercent = hasDiscount ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
    
    modalContent.innerHTML = `
        <div class="p-6">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold gradient-text">${product.name}</h2>
                <button onclick="closeModal()" class="text-gray-400 hover:text-white text-2xl">&times;</button>
            </div>
            
            <div class="grid md:grid-cols-2 gap-6">
                <!-- Imagen -->
                <div class="h-64 bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-8xl rounded-lg relative">
                    ${product.image}
                    ${hasDiscount ? `<div class="absolute top-4 left-4"><span class="px-3 py-1 bg-red-500 text-white text-sm rounded">-${discountPercent}%</span></div>` : ''}
                </div>
                
                <!-- Información -->
                <div>
                    <p class="text-secondary mb-4">${product.description}</p>
                    
                    <!-- Precio -->
                    <div class="mb-4">
                        ${hasDiscount ? `<span class="text-gray-500 line-through text-lg">${formatPrice(product.originalPrice)}</span>` : ''}
                        <div class="text-3xl font-bold gradient-text">${formatPrice(product.price)}</div>
                    </div>
                    
                    <!-- Especificaciones -->
                    <div class="mb-4">
                        <h4 class="font-bold mb-2">Especificaciones:</h4>
                        <ul class="text-secondary space-y-1">
                            ${product.specs.map(spec => `<li>• ${spec}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <!-- Stock -->
                    <div class="mb-6">
                        <span class="text-secondary">Stock disponible: </span>
                        <span class="${product.stock > 10 ? 'text-green-400' : product.stock > 5 ? 'text-yellow-400' : 'text-red-400'} font-semibold">
                            ${product.stock > 0 ? `${product.stock} unidades` : 'Agotado'}
                        </span>
                    </div>
                    
                    <!-- Botones -->
                    <div class="space-y-3">
                        <button 
                            onclick="addToCart(${product.id}); closeModal();"
                            class="w-full btn-primary text-lg py-3 ${product.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''}"
                            ${product.stock === 0 ? 'disabled' : ''}
                        >
                            ${product.stock === 0 ? 'Producto Agotado' : 'Agregar al Carrito 🛒'}
                        </button>
                        
                        <button onclick="shareProduct(${product.id})" class="w-full btn-secondary">
                            Compartir Producto 📤
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    modal.classList.remove('hidden');
}

function closeModal() {
    document.getElementById('product-modal').classList.add('hidden');
}

function shareProduct(productId) {
    const product = allProducts.find(p => p.id === productId);
    const url = window.location.href + `?producto=${productId}`;
    
    if (navigator.share) {
        navigator.share({
            title: product.name + ' - Level-Up Gamer',
            text: product.description,
            url: url
        });
    } else {
        // Fallback: copiar al portapapeles
        navigator.clipboard.writeText(url).then(() => {
            showMessage('Enlace copiado al portapapeles', 'success');
        });
    }
}

// ====================================
// UTILIDADES
// ====================================

function formatPrice(price) {
    return new Intl.NumberFormat('es-CL').format(price);
}

// Cerrar modal al hacer clic fuera
document.getElementById('product-modal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// Manejar tecla Escape para cerrar modal
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// ====================================
// FUNCIONES ADICIONALES
// ====================================

// Detectar productos en URL (para enlaces compartidos)
function checkUrlProduct() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('producto');
    
    if (productId) {
        setTimeout(() => {
            openProductModal(parseInt(productId));
        }, 1000);
    }
}

// Inicializar detección de URL
setTimeout(checkUrlProduct, 500);

// Simulador de notificaciones push
function initNotifications() {
    // Solo admins reciben notificación de stock bajo
    const rol = localStorage.getItem('rol');
    if (rol === 'admin') {
        setTimeout(() => {
            const lowStockProducts = allProducts.filter(p => p.stock <= 5 && p.stock > 0);
            if (lowStockProducts.length > 0) {
                const product = lowStockProducts[Math.floor(Math.random() * lowStockProducts.length)];
                showMessage(`⚠️ Stock bajo: ${product.name} (${product.stock} restantes)`, 'warning');
            }
        }, 5000);
    }
}

// Inicializar notificaciones
initNotifications();

console.log('🛒 Sistema de productos inicializado correctamente');