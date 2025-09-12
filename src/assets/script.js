// ====================================
// LEVEL-UP GAMER - JAVASCRIPT GENERAL
// ====================================

// Esperar a que cargue el DOM
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎮 Level-Up Gamer cargado correctamente');
    
    // Inicializar todas las funciones
    initNavbar();
    initSmoothScroll();
    initFormValidations();
    initAnimations();
});

// ====================================
// FUNCIONES DE NAVEGACIÓN
// ====================================

function initNavbar() {
    const navbar = document.querySelector('.navbar-deepblue');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    // Efecto de scroll en navbar
    window.addEventListener('scroll', function() {
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });
    
    // Menu móvil (hamburguesa)
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
    
    // Marcar enlace activo
    markActiveNavLink();
}

function markActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// ====================================
// SCROLL SUAVE
// ====================================

function initSmoothScroll() {
    // Scroll suave para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ====================================
// VALIDACIONES DE FORMULARIOS
// ====================================

function initFormValidations() {
    // Validación de newsletter
    const newsletterForm = document.querySelector('#newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
    
    // Validación de contacto
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
}

function handleNewsletterSubmit(e) {
    e.preventDefault();
    const emailInput = e.target.querySelector('input[type="email"]');
    const email = emailInput.value.trim();
    
    if (validateEmail(email)) {
        showMessage('¡Gracias por suscribirte! Pronto recibirás nuestras noticias gaming.', 'success');
        emailInput.value = '';
    } else {
        showMessage('Por favor ingresa un correo electrónico válido.', 'error');
    }
}

function handleContactSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const nombre = formData.get('nombre');
    const email = formData.get('email');
    const mensaje = formData.get('mensaje');
    
    if (!nombre || !email || !mensaje) {
        showMessage('Por favor completa todos los campos.', 'error');
        return;
    }
    
    if (!validateEmail(email)) {
        showMessage('Por favor ingresa un correo electrónico válido.', 'error');
        return;
    }
    
    // Simular envío
    showMessage('¡Mensaje enviado correctamente! Te responderemos pronto.', 'success');
    e.target.reset();
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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
        max-width: 300px;
    `;
    
    // Colores según tipo
    switch(type) {
        case 'success':
            messageEl.style.background = 'linear-gradient(135deg, #39FF14, #1E90FF)';
            break;
        case 'error':
            messageEl.style.background = 'linear-gradient(135deg, #ff4444, #cc0000)';
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
    
    // Remover después de 3 segundos
    setTimeout(() => {
        messageEl.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(messageEl);
        }, 300);
    }, 3000);
}

// ====================================
// ANIMACIONES
// ====================================

function initAnimations() {
    // Animación de aparición al hacer scroll
    const observeElements = document.querySelectorAll('.card, .blog-card, .product-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    observeElements.forEach(el => observer.observe(el));
    
    // Efecto parallax simple en hero
    window.addEventListener('scroll', function() {
        const hero = document.querySelector('.hero');
        if (hero) {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            hero.style.transform = `translateY(${parallax}px)`;
        }
    });
}

// ====================================
// UTILIDADES GENERALES
// ====================================

// Formatear precios
function formatPrice(price) {
    return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
        minimumFractionDigits: 0
    }).format(price);
}

// Debounce para optimizar eventos
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Loading spinner
function showLoading() {
    const loader = document.createElement('div');
    loader.id = 'loading';
    loader.innerHTML = `
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
        ">
            <div style="
                width: 50px;
                height: 50px;
                border: 3px solid #1E90FF;
                border-top: 3px solid #39FF14;
                border-radius: 50%;
                animation: spin 1s linear infinite;
            "></div>
        </div>
        <style>
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        </style>
    `;
    document.body.appendChild(loader);
}

function hideLoading() {
    const loader = document.getElementById('loading');
    if (loader) {
        document.body.removeChild(loader);
    }
}

// ====================================
// FUNCIONES PARA PRODUCTOS
// ====================================

// Función para cargar productos (simulada)
function loadProducts(category = 'all') {
    showLoading();
    
    setTimeout(() => {
        // Simular carga de productos
        console.log(`Cargando productos de categoría: ${category}`);
        hideLoading();
    }, 1000);
}

// Función para agregar al carrito
function addToCart(productId, productName, price) {
    // Obtener carrito actual del localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Buscar si el producto ya existe
    const existingProduct = cart.find(item => item.id === productId);
    
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: price,
            quantity: 1
        });
    }
    
    // Guardar en localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Mostrar mensaje
    showMessage(`${productName} agregado al carrito`, 'success');
    
    // Actualizar contador del carrito
    updateCartCounter();
}

// Actualizar contador del carrito
function updateCartCounter() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const counter = document.querySelector('.cart-counter');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    if (counter) {
        counter.textContent = totalItems;
        counter.style.display = totalItems > 0 ? 'block' : 'none';
    }
}

// ====================================
// INICIALIZAR CONTADOR DEL CARRITO
// ====================================

// Actualizar contador al cargar la página
updateCartCounter();