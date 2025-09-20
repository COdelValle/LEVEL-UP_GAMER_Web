// ====================================
// DETALLE PRODUCTO - JAVASCRIPT
// ====================================

// Variables globales
let currentProduct = null;
let relatedProducts = [];

// Datos simulados de productos
const productsData = [
    {
        id: 1,
        name: "PlayStation 5",
        price: 599990,
        originalPrice: 699990,
        category: "Consolas",
        description: "La consola de videojuegos más avanzada de PlayStation. Experimenta la carga ultrarrápida con el SSD personalizado de alta velocidad, una inmersión más profunda con retroalimentación háptica, gatillos adaptativos y audio 3D, además de una nueva generación de increíbles juegos de PlayStation.",
        image: "../../assets/img/ps5.jpg",
        images: [
            "../../assets/img/ps5.jpg",
            "../../assets/img/ps5-2.jpg",
            "../../assets/img/ps5-3.jpg"
        ],
        stock: 15,
        specs: {
            "Procesador": "AMD Zen 2 de 8 núcleos a 3.5 GHz",
            "GPU": "AMD RDNA 2, 10.28 TFLOPs",
            "Memoria": "16 GB GDDR6",
            "Almacenamiento": "825 GB SSD personalizado",
            "Resolución": "Hasta 4K a 120fps"
        },
        features: [
            "Carga ultrarrápida con SSD personalizado",
            "Retroalimentación háptica inmersiva",
            "Gatillos adaptativos DualSense",
            "Audio 3D Tempest",
            "Compatibilidad con la mayoría de juegos de PS4",
            "Ray Tracing en tiempo real"
        ]
    },
    {
        id: 2,
        name: "Xbox Series X",
        price: 549990,
        category: "Consolas",
        description: "La Xbox más rápida y potente de la historia. Juega miles de títulos de cuatro generaciones de consolas: todos se ven y se sienten mejor en Xbox Series X.",
        image: "../../assets/img/xbox-series-x.jpg",
        images: [
            "../../assets/img/xbox-series-x.jpg",
            "../../assets/img/xbox-series-x-2.jpg"
        ],
        stock: 8,
        specs: {
            "Procesador": "AMD Zen 2 de 8 núcleos a 3.8 GHz",
            "GPU": "AMD RDNA 2, 12 TFLOPs",
            "Memoria": "16 GB GDDR6",
            "Almacenamiento": "1 TB SSD personalizado",
            "Resolución": "Hasta 4K a 120fps, 8K HDR"
        },
        features: [
            "12 teraflops de potencia de procesamiento gráfico",
            "Carga ultrarrápida con SSD personalizado",
            "Quick Resume para múltiples juegos",
            "Auto HDR para juegos heredados",
            "Xbox Game Pass Ultimate incluido por 3 meses",
            "Compatibilidad completa con generaciones anteriores"
        ]
    },
    {
        id: 3,
        name: "Nintendo Switch OLED",
        price: 399990,
        category: "Consolas",
        description: "Nintendo Switch - Modelo OLED con pantalla OLED de 7 pulgadas, altavoces mejorados, soporte ajustable, base con puerto LAN por cable, 64 GB de almacenamiento interno.",
        image: "../../assets/img/nintendo-switch-oled.jpg",
        images: [
            "../../assets/img/nintendo-switch-oled.jpg",
            "../../assets/img/nintendo-switch-oled-2.jpg"
        ],
        stock: 12,
        specs: {
            "Procesador": "NVIDIA Custom Tegra X1",
            "Pantalla": "7 pulgadas OLED, 1280x720",
            "Memoria": "4 GB RAM",
            "Almacenamiento": "64 GB interno, expandible",
            "Batería": "4.5 - 9 horas dependiendo del juego"
        },
        features: [
            "Pantalla OLED de 7 pulgadas con colores vibrantes",
            "64 GB de almacenamiento interno",
            "Altavoces mejorados para mejor audio",
            "Soporte ajustable incorporado",
            "Base con puerto LAN por cable",
            "Juega en casa o en movimiento"
        ]
    },
    {
        id: 4,
        name: "The Legend of Zelda: Tears of the Kingdom",
        price: 69990,
        category: "Juegos",
        description: "En esta secuela de The Legend of Zelda: Breath of the Wild, decidirás tu propio camino a través de los extensos paisajes de Hyrule y las islas misteriosas que flotan en los vastos cielos.",
        image: "../../assets/img/zelda-totk.jpg",
        images: [
            "../../assets/img/zelda-totk.jpg",
            "../../assets/img/zelda-totk-2.jpg"
        ],
        stock: 25,
        specs: {
            "Plataforma": "Nintendo Switch",
            "Género": "Acción, Aventura",
            "Clasificación": "E10+ (Everyone 10+)",
            "Desarrollador": "Nintendo EPD",
            "Idiomas": "Español, Inglés, Francés, más"
        },
        features: [
            "Mundo abierto expansivo con nuevas áreas",
            "Nuevas habilidades: Fusionar, Ultraman, Reverso",
            "Construcción creativa de objetos y vehículos",
            "Historia épica con Link y Zelda",
            "Explora los cielos de Hyrule",
            "Compatible con amiibo"
        ]
    },
    {
        id: 5,
        name: "Auriculares Gaming Razer BlackShark V2",
        price: 129990,
        category: "Accesorios",
        description: "Auriculares gaming profesionales con drivers de 50mm, micrófono desmontable, y tecnología de cancelación de ruido pasiva para una experiencia de gaming inmersiva.",
        image: "../../assets/img/razer-blackshark.jpg",
        images: [
            "../../assets/img/razer-blackshark.jpg",
            "../../assets/img/razer-blackshark-2.jpg"
        ],
        stock: 18,
        specs: {
            "Drivers": "50mm TriForce Titanium",
            "Frecuencia": "12 Hz - 28 kHz",
            "Impedancia": "32 Ω",
            "Micrófono": "Desmontable HyperClear",
            "Conectividad": "3.5mm, USB-C"
        },
        features: [
            "Drivers TriForce Titanium de 50mm",
            "Micrófono HyperClear desmontable",
            "Almohadillas FlowKnit de memory foam",
            "Cancelación de ruido pasiva avanzada",
            "Compatible con PC, PS4, PS5, Xbox, Switch",
            "Control de volumen en línea"
        ]
    }
];

// ====================================
// INICIALIZACIÓN
// ====================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🎮 Detalle producto cargado');
    initProductDetail();
});

// ====================================
// FUNCIONES PRINCIPALES
// ====================================

function initProductDetail() {
    // Obtener ID del producto de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    
    if (!productId) {
        showError();
        return;
    }
    
    // Simular carga
    setTimeout(() => {
        loadProductData(productId);
    }, 800);
    
    // Inicializar eventos
    initEvents();
}

function loadProductData(productId) {
    // Buscar producto en los datos
    currentProduct = productsData.find(product => product.id === productId);
    
    if (!currentProduct) {
        showError();
        return;
    }
    
    // Cargar productos relacionados
    relatedProducts = productsData
        .filter(product => product.id !== productId && product.category === currentProduct.category)
        .slice(0, 3);
    
    // Mostrar producto
    renderProduct();
    renderRelatedProducts();
    
    // Ocultar loading y mostrar contenido
    document.getElementById('product-loading').style.display = 'none';
    document.getElementById('product-detail').style.display = 'block';
}

function renderProduct() {
    const product = currentProduct;
    
    // Información básica
    document.getElementById('product-title').textContent = product.name;
    document.getElementById('product-price').textContent = formatPrice(product.price);
    document.getElementById('product-description').textContent = product.description;
    document.getElementById('product-category').textContent = product.category;
    
    // Imagen principal
    const mainImage = document.getElementById('product-image');
    mainImage.src = product.image;
    mainImage.alt = product.name;
    
    // Precio con descuento
    if (product.originalPrice && product.originalPrice > product.price) {
        const discountEl = document.getElementById('product-discount');
        const originalPriceEl = document.getElementById('original-price');
        const discountPercentageEl = document.getElementById('discount-percentage');
        
        originalPriceEl.textContent = formatPrice(product.originalPrice);
        const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
        discountPercentageEl.textContent = `-${discountPercent}%`;
        discountEl.style.display = 'block';
    }
    
    // Stock
    const stockInfo = document.getElementById('stock-info');
    if (product.stock > 10) {
        stockInfo.textContent = 'En stock';
        stockInfo.style.color = 'var(--color-verde-neon)';
    } else if (product.stock > 0) {
        stockInfo.textContent = `Solo quedan ${product.stock} unidades`;
        stockInfo.style.color = '#ffaa00';
    } else {
        stockInfo.textContent = 'Agotado';
        stockInfo.style.color = '#ff4444';
        document.getElementById('add-to-cart-btn').disabled = true;
        document.getElementById('buy-now-btn').disabled = true;
    }
    
    // Especificaciones
    renderSpecs();
    
    // Características
    renderFeatures();
    
    // Imágenes adicionales
    renderThumbnails();
}

function renderSpecs() {
    const specsContainer = document.getElementById('product-specs');
    const specs = currentProduct.specs;
    
    specsContainer.innerHTML = '';
    
    for (const [key, value] of Object.entries(specs)) {
        const specRow = document.createElement('div');
        specRow.style.cssText = 'display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid rgba(255,255,255,0.1);';
        specRow.innerHTML = `
            <span style="font-weight: 600; color: var(--color-azul-electrico);">${key}:</span>
            <span class="text-secondary">${value}</span>
        `;
        specsContainer.appendChild(specRow);
    }
}

function renderFeatures() {
    const featuresContainer = document.getElementById('product-features');
    const features = currentProduct.features;
    
    featuresContainer.innerHTML = '';
    
    features.forEach(feature => {
        const li = document.createElement('li');
        li.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${feature}</span>
        `;
        featuresContainer.appendChild(li);
    });
}

function renderThumbnails() {
    const thumbnailsContainer = document.querySelector('.product-thumbnails');
    const images = currentProduct.images || [currentProduct.image];
    
    thumbnailsContainer.innerHTML = '';
    
    images.forEach((image, index) => {
        const img = document.createElement('img');
        img.src = image;
        img.alt = `${currentProduct.name} ${index + 1}`;
        img.className = index === 0 ? 'active' : '';
        
        img.addEventListener('click', () => {
            document.getElementById('product-image').src = image;
            thumbnailsContainer.querySelectorAll('img').forEach(thumb => thumb.classList.remove('active'));
            img.classList.add('active');
        });
        
        thumbnailsContainer.appendChild(img);
    });
}

function renderRelatedProducts() {
    const container = document.getElementById('related-products');
    container.innerHTML = '';
    
    relatedProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card fade-in-up';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" style="width: 100%; height: 200px; object-fit: cover;">
            <div style="padding: 1.5rem;">
                <div class="category-badge" style="margin-bottom: 1rem;">${product.category}</div>
                <h3 style="margin-bottom: 1rem; color: var(--color-blanco);">${product.name}</h3>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span class="price-tag">${formatPrice(product.price)}</span>
                    <button onclick="window.location.href='detalle-producto.html?id=${product.id}'" class="btn-secondary" style="padding: 0.5rem 1rem;">Ver Detalle</button>
                </div>
            </div>
        `;
        container.appendChild(productCard);
    });
}

// ====================================
// EVENTOS
// ====================================

function initEvents() {
    // Control de cantidad
    const decreaseBtn = document.getElementById('decrease-qty');
    const increaseBtn = document.getElementById('increase-qty');
    const quantityInput = document.getElementById('quantity');
    
    decreaseBtn.addEventListener('click', () => {
        const currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) {
            quantityInput.value = currentValue - 1;
        }
    });
    
    increaseBtn.addEventListener('click', () => {
        const currentValue = parseInt(quantityInput.value);
        const maxStock = currentProduct ? currentProduct.stock : 10;
        if (currentValue < maxStock) {
            quantityInput.value = currentValue + 1;
        }
    });
    
    quantityInput.addEventListener('change', (e) => {
        const value = parseInt(e.target.value);
        const maxStock = currentProduct ? currentProduct.stock : 10;
        
        if (value < 1) {
            e.target.value = 1;
        } else if (value > maxStock) {
            e.target.value = maxStock;
            showMessage(`Stock máximo disponible: ${maxStock}`, 'error');
        }
    });
    
    // Agregar al carrito
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    addToCartBtn.addEventListener('click', handleAddToCart);
    
    // Comprar ahora
    const buyNowBtn = document.getElementById('buy-now-btn');
    buyNowBtn.addEventListener('click', handleBuyNow);
}

function handleAddToCart() {
    if (!currentProduct) return;
    
    const quantity = parseInt(document.getElementById('quantity').value);
    
    // Agregar al carrito usando la función del script principal
    for (let i = 0; i < quantity; i++) {
        addToCart(currentProduct.id, currentProduct.name, currentProduct.price);
    }
    
    // Mostrar mensaje personalizado para cantidad
    if (quantity > 1) {
        showMessage(`${quantity} unidades de ${currentProduct.name} agregadas al carrito`, 'success');
    }
}

function handleBuyNow() {
    if (!currentProduct) return;
    
    const quantity = parseInt(document.getElementById('quantity').value);
    
    // Simular compra directa
    showMessage('Redirigiendo a la pasarela de pago...', 'info');
    
    setTimeout(() => {
        showMessage('Función de compra directa próximamente disponible', 'info');
    }, 2000);
}

// ====================================
// FUNCIONES DE ERROR
// ====================================

function showError() {
    document.getElementById('product-loading').style.display = 'none';
    document.getElementById('product-error').style.display = 'block';
}

// ====================================
// UTILIDADES
// ====================================

function formatPrice(price) {
    return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
        minimumFractionDigits: 0
    }).format(price);
}