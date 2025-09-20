// ====================================
// BLOGS.JS - Funcionalidad específica para la página de blogs
// ====================================

// Esperar a que cargue el DOM
document.addEventListener('DOMContentLoaded', function() {
    console.log('📝 Página de Blogs cargada');
    
    // Inicializar funciones específicas de blogs
    initBlogFilters();
    initLoadMorePosts();
    initSearchFunctionality();
});

// ====================================
// FILTROS DE CATEGORÍAS
// ====================================

function initBlogFilters() {
    const categoryBadges = document.querySelectorAll('.category-badge');
    const allPosts = document.querySelectorAll('#posts-grid .blog-card');
    
    // Agregar evento click a cada categoría
    categoryBadges.forEach(badge => {
        badge.addEventListener('click', function() {
            const category = this.textContent.trim().toLowerCase();
            filterPostsByCategory(category);
            
            // Marcar como activo
            categoryBadges.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function filterPostsByCategory(selectedCategory) {
    const posts = document.querySelectorAll('#posts-grid .blog-card');
    
    posts.forEach(post => {
        const postCategory = post.querySelector('.category-badge').textContent.trim().toLowerCase();
        
        if (selectedCategory === 'todas las categorías' || postCategory === selectedCategory) {
            post.style.display = 'block';
            post.classList.add('fade-in-up');
        } else {
            post.style.display = 'none';
        }
    });
    
    console.log(`Filtrando posts por categoría: ${selectedCategory}`);
}

// ====================================
// CARGAR MÁS POSTS
// ====================================

function initLoadMorePosts() {
    const loadMoreBtn = document.getElementById('load-more-btn');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMorePosts);
    }
}

function loadMorePosts() {
    const loadMoreBtn = document.getElementById('load-more-btn');
    const postsGrid = document.getElementById('posts-grid');
    
    // Cambiar texto del botón
    loadMoreBtn.textContent = 'Cargando...';
    loadMoreBtn.disabled = true;
    
    // Simular carga con setTimeout
    setTimeout(() => {
        const newPosts = createMorePosts();
        
        newPosts.forEach(post => {
            postsGrid.appendChild(post);
        });
        
        // Restaurar botón
        loadMoreBtn.textContent = 'Cargar Más Posts';
        loadMoreBtn.disabled = false;
        
        showMessage('¡Nuevos posts cargados!', 'success');
    }, 1500);
}

function createMorePosts() {
    // Datos de posts adicionales
    const morePosts = [
        {
            title: "Mejores Juegos 2025",
            category: "Reviews",
            date: "25 Dic",
            emoji: "🎯",
            description: "Los títulos más esperados del año que no te puedes perder."
        },
        {
            title: "Configurar Audio Gaming",
            category: "Guías", 
            date: "22 Dic",
            emoji: "🎧",
            description: "Guía completa para optimizar el audio en tus juegos."
        },
        {
            title: "Streaming en Chile",
            category: "Noticias",
            date: "20 Dic", 
            emoji: "📺",
            description: "El crecimiento del streaming gaming en nuestro país."
        }
    ];
    
    const newPostElements = [];
    
    morePosts.forEach(postData => {
        const postElement = createPostElement(postData);
        newPostElements.push(postElement);
    });
    
    return newPostElements;
}

function createPostElement(postData) {
    const article = document.createElement('article');
    article.className = 'blog-card fade-in-up';
    
    article.innerHTML = `
        <div class="h-48 bg-gradient-to-br from-blue-600 to-green-600 relative rounded-t-lg">
            <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-t-lg">
                <span class="text-4xl">${postData.emoji}</span>
            </div>
        </div>
        <div class="p-6">
            <div class="flex items-center justify-between mb-3">
                <span class="category-badge">${postData.category}</span>
                <span class="text-secondary text-sm">${postData.date}</span>
            </div>
            <h3 class="text-xl font-bold mb-3">${postData.title}</h3>
            <p class="text-secondary text-sm mb-4">${postData.description}</p>
            <a href="#" class="text-blue-400 hover:text-green-400 transition-colors font-semibold">
                Leer Más →
            </a>
        </div>
    `;
    
    return article;
}

// ====================================
// FUNCIONALIDAD DE BÚSQUEDA
// ====================================

function initSearchFunctionality() {
    // Crear barra de búsqueda
    createSearchBar();
}

function createSearchBar() {
    const heroSection = document.querySelector('.hero .container');
    
    // Crear elemento de búsqueda
    const searchContainer = document.createElement('div');
    searchContainer.className = 'max-w-md mx-auto mt-8';
    searchContainer.innerHTML = `
        <div class="relative">
            <input 
                type="text" 
                id="blog-search" 
                placeholder="Buscar en el blog..." 
                class="form-input pr-10"
            >
            <div class="absolute right-3 top-1/2 transform -translate-y-1/2">
                <span class="text-gray-400">🔍</span>
            </div>
        </div>
    `;
    
    // Insertar después de las categorías
    const categories = heroSection.querySelector('.flex.flex-wrap');
    categories.parentNode.insertBefore(searchContainer, categories.nextSibling);
    
    // Agregar funcionalidad de búsqueda
    const searchInput = document.getElementById('blog-search');
    searchInput.addEventListener('input', debounce(handleSearch, 300));
}

function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    const posts = document.querySelectorAll('#posts-grid .blog-card');
    
    posts.forEach(post => {
        const title = post.querySelector('h3').textContent.toLowerCase();
        const description = post.querySelector('p').textContent.toLowerCase();
        const category = post.querySelector('.category-badge').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || 
            description.includes(searchTerm) || 
            category.includes(searchTerm) ||
            searchTerm === '') {
            post.style.display = 'block';
        } else {
            post.style.display = 'none';
        }
    });
    
    console.log(`Buscando: ${searchTerm}`);
}

// ====================================
// FUNCIONES DE INTERACCIÓN CON POSTS
// ====================================

// Marcar posts como leídos
function markPostAsRead(postElement) {
    postElement.classList.add('read');
    
    // Guardar en localStorage
    const readPosts = JSON.parse(localStorage.getItem('readPosts')) || [];
    const postTitle = postElement.querySelector('h3').textContent;
    
    if (!readPosts.includes(postTitle)) {
        readPosts.push(postTitle);
        localStorage.setItem('readPosts', JSON.stringify(readPosts));
    }
}

// Compartir post en redes sociales
function sharePost(title, url) {
    const shareData = {
        title: `${title} - Level-Up Gamer`,
        text: 'Revisa este artículo genial sobre gaming',
        url: url || window.location.href
    };
    
    if (navigator.share) {
        navigator.share(shareData);
    } else {
        // Fallback para navegadores que no soportan Web Share API
        const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareData.text)}&url=${encodeURIComponent(shareData.url)}`;
        window.open(shareUrl, '_blank');
    }
}

// ====================================
// SISTEMA DE LIKES/FAVORITOS
// ====================================

function initLikeSystem() {
    // Agregar botones de like a cada post
    const posts = document.querySelectorAll('.blog-card');
    
    posts.forEach(post => {
        addLikeButton(post);
    });
}

function addLikeButton(postElement) {
    const likesContainer = document.createElement('div');
    likesContainer.className = 'flex items-center justify-between mt-4 pt-4 border-t border-gray-700';
    
    const postTitle = postElement.querySelector('h3').textContent;
    const likes = getLikesCount(postTitle);
    const isLiked = isPostLiked(postTitle);
    
    likesContainer.innerHTML = `
        <button class="like-btn flex items-center space-x-2 ${isLiked ? 'liked' : ''}" 
                data-post-title="${postTitle}">
            <span class="text-xl">${isLiked ? '❤️' : '🤍'}</span>
            <span class="text-sm">Me gusta</span>
        </button>
        <span class="text-secondary text-sm likes-count">${likes} likes</span>
    `;
    
    // Agregar al post
    const postContent = postElement.querySelector('.p-6');
    postContent.appendChild(likesContainer);
    
    // Agregar event listener
    const likeBtn = likesContainer.querySelector('.like-btn');
    likeBtn.addEventListener('click', handleLikeClick);
}

function handleLikeClick(event) {
    const button = event.currentTarget;
    const postTitle = button.dataset.postTitle;
    const likesCountElement = button.parentElement.querySelector('.likes-count');
    const heartIcon = button.querySelector('span');
    
    let currentLikes = parseInt(likesCountElement.textContent);
    
    if (button.classList.contains('liked')) {
        // Quitar like
        button.classList.remove('liked');
        heartIcon.textContent = '🤍';
        currentLikes -= 1;
        removeLike(postTitle);
    } else {
        // Agregar like
        button.classList.add('liked');
        heartIcon.textContent = '❤️';
        currentLikes += 1;
        addLike(postTitle);
    }
    
    likesCountElement.textContent = `${currentLikes} likes`;
}

// Funciones de localStorage para likes
function getLikesCount(postTitle) {
    const likes = JSON.parse(localStorage.getItem('postLikes')) || {};
    return likes[postTitle] || 0;
}

function isPostLiked(postTitle) {
    const likedPosts = JSON.parse(localStorage.getItem('likedPosts')) || [];
    return likedPosts.includes(postTitle);
}

function addLike(postTitle) {
    // Agregar a posts likeados
    const likedPosts = JSON.parse(localStorage.getItem('likedPosts')) || [];
    if (!likedPosts.includes(postTitle)) {
        likedPosts.push(postTitle);
        localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
    }
    
    // Incrementar contador
    const likes = JSON.parse(localStorage.getItem('postLikes')) || {};
    likes[postTitle] = (likes[postTitle] || 0) + 1;
    localStorage.setItem('postLikes', JSON.stringify(likes));
}

function removeLike(postTitle) {
    // Quitar de posts likeados
    const likedPosts = JSON.parse(localStorage.getItem('likedPosts')) || [];
    const index = likedPosts.indexOf(postTitle);
    if (index > -1) {
        likedPosts.splice(index, 1);
        localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
    }
    
    // Decrementar contador
    const likes = JSON.parse(localStorage.getItem('postLikes')) || {};
    if (likes[postTitle] && likes[postTitle] > 0) {
        likes[postTitle] -= 1;
        localStorage.setItem('postLikes', JSON.stringify(likes));
    }
}

// Inicializar sistema de likes cuando cargue la página
setTimeout(() => {
    initLikeSystem();
}, 1000);