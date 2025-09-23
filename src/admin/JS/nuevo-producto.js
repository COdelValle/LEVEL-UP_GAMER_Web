// ====================================
// NUEVO PRODUCTO - LEVEL-UP GAMER ADMIN
// ====================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('📝 Formulario Nuevo Producto cargado');
    
    // Verificar autenticación
    checkAdminAuth();
    
    // Inicializar formulario
    initForm();
    
    // Configurar eventos
    setupFormEvents();
    
    // Agregar especificaciones iniciales
    addInitialSpecs();
    
    // Configurar manejo de imágenes
    setupImageHandling();
});

// ====================================
// AUTENTICACIÓN
// ====================================

function checkAdminAuth() {
    const adminSession = JSON.parse(localStorage.getItem('adminSession'));
    
    if (!adminSession || !adminSession.isAuthenticated) {
        window.location.href = '../login/login.html';
        return;
    }
    
    // Verificar si la sesión ha expirado
    const now = new Date().getTime();
    if (now > adminSession.expiresAt) {
        localStorage.removeItem('adminSession');
        showMessage('Sesión expirada. Por favor inicia sesión nuevamente.', 'error');
        setTimeout(() => {
            window.location.href = '../login/login.html';
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
// INICIALIZACIÓN DEL FORMULARIO
// ====================================

function initForm() {
    // Limpiar formulario al cargar
    resetForm();
    
    // Configurar contador de caracteres
    const descriptionInput = document.getElementById('product-description');
    const charCount = document.getElementById('char-count');
    
    if (descriptionInput && charCount) {
        descriptionInput.addEventListener('input', function() {
            const count = this.value.length;
            charCount.textContent = count;
            
            if (count > 180) {
                charCount.classList.add('text-red-400');
            } else {
                charCount.classList.remove('text-red-400');
            }
        });
    }
}

function setupFormEvents() {
    // Eventos para actualizar vista previa
    const formInputs = [
        'product-name',
        'product-category',
        'product-description',
        'product-price',
        'product-original-price',
        'product-stock',
        'product-featured',
        'product-new'
    ];
    
    formInputs.forEach(inputId => {
        const element = document.getElementById(inputId);
        if (element) {
            element.addEventListener('input', updatePreview);
            element.addEventListener('change', updatePreview);
        }
    });
    
    // Generar SKU automáticamente
    const nameInput = document.getElementById('product-name');
    const categoryInput = document.getElementById('product-category');
    const skuInput = document.getElementById('product-sku');
    
    if (nameInput && categoryInput && skuInput) {
        const generateSKU = () => {
            const name = nameInput.value.trim();
            const category = categoryInput.value;
            
            if (name && category) {
                const categoryCode = getCategoryCode(category);
                const nameCode = name.substring(0, 3).toUpperCase().replace(/[^A-Z]/g, '');
                const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
                
                skuInput.value = `LUG-${categoryCode}-${nameCode}-${randomNum}`;
                updatePreview();
            }
        };
        
        nameInput.addEventListener('blur', generateSKU);
        categoryInput.addEventListener('change', generateSKU);
    }
}

function getCategoryCode(category) {
    const codes = {
        'pc-gamers': 'PC',
        'perifericos': 'PER',
        'consolas': 'CON',
        'sillas': 'SIL',
        'accesorios': 'ACC'
    };
    return codes[category] || 'GEN';
}

// ====================================
// ESPECIFICACIONES
// ====================================

let specCount = 0;

function addInitialSpecs() {
    // Agregar algunas especificaciones comunes
    const commonSpecs = [
        { name: 'Marca', value: '' },
        { name: 'Modelo', value: '' },
        { name: 'Garantía', value: '12 meses' }
    ];
    
    commonSpecs.forEach(spec => {
        addSpec(spec.name, spec.value);
    });
}

function addSpec(specName = '', specValue = '') {
    specCount++;
    const specsContainer = document.getElementById('specs-container');
    
    const specDiv = document.createElement('div');
    specDiv.className = 'flex gap-3 items-center';
    specDiv.innerHTML = `
        <input 
            type="text" 
            placeholder="Nombre especificación (ej: Procesador)" 
            class="form-input flex-1" 
            value="${specName}"
            onchange="updatePreview()"
        >
        <input 
            type="text" 
            placeholder="Valor (ej: Intel i7-13700K)" 
            class="form-input flex-1"
            value="${specValue}"
            onchange="updatePreview()"
        >
        <button 
            type="button" 
            onclick="removeSpec(this)" 
            class="btn-secondary px-3 py-2 text-red-400 border-red-400 hover:bg-red-400 hover:text-white"
        >
            ✕
        </button>
    `;
    
    specsContainer.appendChild(specDiv);
    updatePreview();
}

function removeSpec(button) {
    const specDiv = button.parentElement;
    specDiv.remove();
    updatePreview();
}

// ====================================
// MANEJO DE IMÁGENES
// ====================================

function setupImageHandling() {
    const imageInput = document.getElementById('image-input');
    const uploadArea = document.getElementById('image-upload-area');
    
    // Drag and drop
    uploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.classList.add('border-green-400', 'bg-green-400', 'bg-opacity-10');
    });
    
    uploadArea.addEventListener('dragleave', function(e) {
        e.preventDefault();
        this.classList.remove('border-green-400', 'bg-green-400', 'bg-opacity-10');
    });
    
    uploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        this.classList.remove('border-green-400', 'bg-green-400', 'bg-opacity-10');
        
        const files = e.dataTransfer.files;
        handleImageFiles(files);
    });
    
    // Click upload
    uploadArea.addEventListener('click', function() {
        imageInput.click();
    });
    
    imageInput.addEventListener('change', function(e) {
        handleImageFiles(e.target.files);
    });
}

function handleImageFiles(files) {
    const previewContainer = document.getElementById('image-preview');
    
    Array.from(files).forEach((file, index) => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                createImagePreview(e.target.result, file.name, index === 0);
            };
            reader.readAsDataURL(file);
        } else {
            showMessage(`${file.name} no es una imagen válida`, 'error');
        }
    });
}

function createImagePreview(imageSrc, fileName, isMain = false) {
    const previewContainer = document.getElementById('image-preview');
    
    const imageDiv = document.createElement('div');
    imageDiv.className = `relative group ${isMain ? 'border-2 border-green-400' : ''}`;
    imageDiv.innerHTML = `
        <img 
            src="${imageSrc}" 
            alt="${fileName}" 
            class="w-full h-32 object-cover rounded-lg"
        >
        <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all rounded-lg flex items-center justify-center">
            <div class="opacity-0 group-hover:opacity-100 transition-opacity space-x-2">
                <button onclick="setMainImage(this)" class="btn-primary px-2 py-1 text-xs">
                    Principal
                </button>
                <button onclick="removeImage(this)" class="btn-secondary px-2 py-1 text-xs text-red-400 border-red-400">
                    Eliminar
                </button>
            </div>
        </div>
        ${isMain ? '<div class="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs">Principal</div>' : ''}
    `;
    
    previewContainer.appendChild(imageDiv);
    
    // Actualizar vista previa si es la imagen principal
    if (isMain) {
        updatePreviewImage(imageSrc);
    }
}

function setMainImage(button) {
    const allImages = document.querySelectorAll('#image-preview > div');
    const currentImage = button.closest('div');
    const img = currentImage.querySelector('img');
    
    // Remover marca principal de todas las imágenes
    allImages.forEach(div => {
        div.classList.remove('border-2', 'border-green-400');
        const badge = div.querySelector('.absolute.top-2.left-2');
        if (badge) badge.remove();
    });
    
    // Marcar como principal
    currentImage.classList.add('border-2', 'border-green-400');
    currentImage.innerHTML += '<div class="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs">Principal</div>';
    
    updatePreviewImage(img.src);
    showMessage('Imagen principal actualizada', 'success');
}

function removeImage(button) {
    const imageDiv = button.closest('div');
    const isMain = imageDiv.classList.contains('border-green-400');
    
    imageDiv.remove();
    
    if (isMain) {
        // Si removimos la imagen principal, marcar la primera como principal
        const firstImage = document.querySelector('#image-preview > div img');
        if (firstImage) {
            setMainImage(firstImage.nextElementSibling.querySelector('button'));
        } else {
            updatePreviewImage();
        }
    }
    
    showMessage('Imagen eliminada', 'info');
}

function updatePreviewImage(imageSrc = null) {
    const previewImage = document.getElementById('preview-image');
    
    if (imageSrc) {
        previewImage.innerHTML = `<img src="${imageSrc}" alt="Producto" class="w-full h-full object-cover">`;
    } else {
        previewImage.innerHTML = '<div class="text-6xl">🖼️</div>';
        previewImage.className = 'h-48 bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-6xl';
    }
}

// ====================================
// VISTA PREVIA
// ====================================

function updatePreview() {
    const name = document.getElementById('product-name').value || 'Nombre del producto';
    const category = document.getElementById('product-category').value || 'Categoría';
    const description = document.getElementById('product-description').value || 'Descripción del producto aparecerá aquí...';
    const price = parseInt(document.getElementById('product-price').value) || 0;
    const originalPrice = parseInt(document.getElementById('product-original-price').value) || 0;
    const stock = parseInt(document.getElementById('product-stock').value) || 0;
    const featured = document.getElementById('product-featured').checked;
    const isNew = document.getElementById('product-new').checked;
    
    // Actualizar elementos de vista previa
    document.getElementById('preview-name').textContent = name;
    document.getElementById('preview-category').textContent = getCategoryName(category);
    document.getElementById('preview-description').textContent = description;
    document.getElementById('preview-price').textContent = formatPrice(price);
    document.getElementById('preview-stock').textContent = `${stock} disponibles`;
    
    // Precio original y descuento
    const originalPriceEl = document.getElementById('preview-original-price');
    const discountEl = document.getElementById('preview-discount');
    
    if (originalPrice > 0 && originalPrice > price) {
        originalPriceEl.textContent = formatPrice(originalPrice);
        originalPriceEl.classList.remove('hidden');
        
        const discount = Math.round(((originalPrice - price) / originalPrice) * 100);
        discountEl.textContent = `¡Ahorra ${discount}%!`;
        discountEl.classList.remove('hidden');
    } else {
        originalPriceEl.classList.add('hidden');
        discountEl.classList.add('hidden');
    }
    
    // Badges
    const badgesContainer = document.getElementById('preview-badges');
    badgesContainer.innerHTML = '';
    
    if (isNew) {
        badgesContainer.innerHTML += '<span class="px-2 py-1 bg-green-500 text-white text-xs rounded font-semibold">NUEVO</span>';
    }
    
    if (featured) {
        badgesContainer.innerHTML += '<span class="px-2 py-1 bg-yellow-500 text-black text-xs rounded font-semibold">DESTACADO</span>';
    }
    
    // Especificaciones
    updatePreviewSpecs();
}

function updatePreviewSpecs() {
    const specsContainer = document.getElementById('specs-container');
    const previewSpecs = document.getElementById('preview-specs');
    const previewSpecsList = document.getElementById('preview-specs-list');
    
    const specInputs = specsContainer.querySelectorAll('div');
    previewSpecsList.innerHTML = '';
    
    let hasSpecs = false;
    specInputs.forEach(specDiv => {
        const nameInput = specDiv.querySelector('input:first-child');
        const valueInput = specDiv.querySelector('input:nth-child(2)');
        
        if (nameInput && valueInput && nameInput.value && valueInput.value) {
            const li = document.createElement('li');
            li.textContent = `${nameInput.value}: ${valueInput.value}`;
            previewSpecsList.appendChild(li);
            hasSpecs = true;
        }
    });
    
    if (hasSpecs) {
        previewSpecs.classList.remove('hidden');
    } else {
        previewSpecs.classList.add('hidden');
    }
}

function getCategoryName(category) {
    const categories = {
        'pc-gamers': 'PC Gamers',
        'perifericos': 'Periféricos',
        'consolas': 'Consolas',
        'sillas': 'Sillas Gaming',
        'accesorios': 'Accesorios'
    };
    return categories[category] || 'Categoría';
}

// ====================================
// GUARDADO DE PRODUCTOS
// ====================================

function saveProduct() {
    const productData = collectProductData();
    
    if (!validateProduct(productData)) {
        return;
    }
    
    showMessage('Guardando producto...', 'info');
    
    // Simular guardado
    setTimeout(() => {
        // Guardar en localStorage para demo
        const products = JSON.parse(localStorage.getItem('products') || '[]');
        productData.id = Date.now();
        productData.createdAt = new Date().toISOString();
        productData.status = 'active';
        
        products.push(productData);
        localStorage.setItem('products', JSON.stringify(products));
        
        showMessage('¡Producto guardado exitosamente!', 'success');
        
        // Preguntar si desea crear otro producto
        setTimeout(() => {
            if (confirm('¿Deseas crear otro producto?')) {
                resetForm();
            } else {
                window.location.href = 'home.html';
            }
        }, 2000);
    }, 2000);
}

function saveAsDraft() {
    const productData = collectProductData();
    productData.status = 'draft';
    
    showMessage('Guardando borrador...', 'info');
    
    // Simular guardado
    setTimeout(() => {
        const drafts = JSON.parse(localStorage.getItem('productDrafts') || '[]');
        productData.id = Date.now();
        productData.createdAt = new Date().toISOString();
        
        drafts.push(productData);
        localStorage.setItem('productDrafts', JSON.stringify(drafts));
        
        showMessage('Borrador guardado correctamente', 'success');
    }, 1000);
}

function collectProductData() {
    // Recopilar datos básicos
    const productData = {
        name: document.getElementById('product-name').value,
        category: document.getElementById('product-category').value,
        description: document.getElementById('product-description').value,
        longDescription: document.getElementById('product-long-description').value,
        price: parseInt(document.getElementById('product-price').value) || 0,
        originalPrice: parseInt(document.getElementById('product-original-price').value) || 0,
        stock: parseInt(document.getElementById('product-stock').value) || 0,
        sku: document.getElementById('product-sku').value,
        featured: document.getElementById('product-featured').checked,
        isNew: document.getElementById('product-new').checked,
        status: document.getElementById('product-status').value
    };
    
    // Recopilar especificaciones
    productData.specs = [];
    const specInputs = document.querySelectorAll('#specs-container > div');
    specInputs.forEach(specDiv => {
        const nameInput = specDiv.querySelector('input:first-child');
        const valueInput = specDiv.querySelector('input:nth-child(2)');
        
        if (nameInput && valueInput && nameInput.value && valueInput.value) {
            productData.specs.push({
                name: nameInput.value,
                value: valueInput.value
            });
        }
    });
    
    // Recopilar imágenes (en una implementación real, estas se subirían al servidor)
    productData.images = [];
    const imageElements = document.querySelectorAll('#image-preview img');
    imageElements.forEach((img, index) => {
        productData.images.push({
            src: img.src,
            alt: img.alt,
            isMain: img.closest('div').classList.contains('border-green-400'),
            order: index
        });
    });
    
    return productData;
}

function validateProduct(productData) {
    const errors = [];
    
    // Validaciones obligatorias
    if (!productData.name.trim()) {
        errors.push('El nombre del producto es obligatorio');
    }
    
    if (!productData.category) {
        errors.push('La categoría es obligatoria');
    }
    
    if (!productData.description.trim()) {
        errors.push('La descripción corta es obligatoria');
    }
    
    if (productData.price <= 0) {
        errors.push('El precio debe ser mayor a 0');
    }
    
    if (productData.stock < 0) {
        errors.push('El stock no puede ser negativo');
    }
    
    // Validar precio original vs precio de venta
    if (productData.originalPrice > 0 && productData.originalPrice <= productData.price) {
        errors.push('El precio original debe ser mayor al precio de venta');
    }
    
    // Validar imágenes
    if (productData.images.length === 0) {
        errors.push('Debe agregar al menos una imagen del producto');
    }
    
    // Mostrar errores
    if (errors.length > 0) {
        const errorMsg = 'Errores encontrados:\n• ' + errors.join('\n• ');
        showMessage(errorMsg, 'error');
        return false;
    }
    
    return true;
}

// ====================================
// UTILIDADES
// ====================================

function resetForm() {
    // Limpiar todos los campos
    document.getElementById('product-name').value = '';
    document.getElementById('product-category').value = '';
    document.getElementById('product-description').value = '';
    document.getElementById('product-long-description').value = '';
    document.getElementById('product-price').value = '';
    document.getElementById('product-original-price').value = '';
    document.getElementById('product-stock').value = '';
    document.getElementById('product-sku').value = '';
    document.getElementById('product-featured').checked = false;
    document.getElementById('product-new').checked = false;
    document.getElementById('product-status').value = 'active';
    
    // Limpiar contador de caracteres
    document.getElementById('char-count').textContent = '0';
    
    // Limpiar especificaciones
    document.getElementById('specs-container').innerHTML = '';
    specCount = 0;
    addInitialSpecs();
    
    // Limpiar imágenes
    document.getElementById('image-preview').innerHTML = '';
    updatePreviewImage();
    
    // Actualizar vista previa
    updatePreview();
    
    showMessage('Formulario reiniciado', 'info');
}

function formatPrice(price) {
    return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
        minimumFractionDigits: 0
    }).format(price);
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