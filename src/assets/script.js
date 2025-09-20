// Modal de carrito para index.html (estilo producto.html)
document.addEventListener('DOMContentLoaded', function() {
	const cartBtn = document.getElementById('cart-btn');
	if (!cartBtn) return;

	// Crear modal si no existe
	let modal = document.getElementById('cart-modal-index');
	if (!modal) {
		modal = document.createElement('div');
		modal.id = 'cart-modal-index';
		modal.className = 'fixed inset-0 bg-black bg-opacity-60 z-[9999] flex items-center justify-center';
		modal.style.display = 'none';
		modal.innerHTML = '<div id="cart-modal-content-index" class="bg-gray-900 rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto shadow-2xl"></div>';
		document.body.appendChild(modal);
		// Cerrar al hacer click fuera
		modal.addEventListener('click', function(e) {
			if (e.target === modal) modal.style.display = 'none';
		});
	}
	const modalContent = document.getElementById('cart-modal-content-index');

	function updateCartModalIndex() {
		const cart = JSON.parse(localStorage.getItem('cart')) || [];
		if (cart.length === 0) {
			modalContent.innerHTML = `
				<div class="p-6">
					<div class="flex justify-between items-center mb-6">
						<h2 class="text-2xl font-bold gradient-text">Carrito de Compras</h2>
						<button id="close-cart-modal-index" class="text-gray-400 hover:text-white text-2xl">&times;</button>
					</div>
					<p class="text-center text-lg text-gray-300">Tu carrito está vacío.</p>
				</div>
			`;
		} else {
			let total = 0;
			let itemsHtml = cart.map(item => {
				total += item.price * item.quantity;
				return `
					<div class="flex items-center justify-between p-4 bg-gray-800 rounded mb-4">
						<div class="flex items-center space-x-4">
							<span class="text-2xl">${item.image || '🛒'}</span>
							<div>
								<h4 class="font-semibold">${item.name}</h4>
								<p class="text-secondary text-sm">$${item.price.toLocaleString('es-CL')} c/u</p>
							</div>
						</div>
						<div class="flex items-center space-x-2">
							<button onclick="window.updateCartQuantityIndex(${item.id}, -1)" class="btn-secondary px-2 py-1 text-sm">-</button>
							<span class="px-3 py-1 bg-gray-700 rounded">${item.quantity}</span>
							<button onclick="window.updateCartQuantityIndex(${item.id}, 1)" class="btn-secondary px-2 py-1 text-sm">+</button>
							<button onclick="window.removeFromCartIndex(${item.id})" class="text-red-400 hover:text-red-300 ml-2">🗑️</button>
						</div>
					</div>
				`;
			}).join('');
			modalContent.innerHTML = `
				<div class="p-6">
					<div class="flex justify-between items-center mb-6">
						<h2 class="text-2xl font-bold gradient-text">Carrito de Compras</h2>
						<button id="close-cart-modal-index" class="text-gray-400 hover:text-white text-2xl">&times;</button>
					</div>
					<div class="space-y-4 mb-6 max-h-60 overflow-y-auto">${itemsHtml}</div>
					<div class="border-t border-gray-700 pt-4">
						<div class="flex justify-between items-center text-xl font-bold mb-6">
							<span>Total:</span>
							<span class="gradient-text">$${total.toLocaleString('es-CL')}</span>
						</div>
						<div class="flex gap-4">
							<button id="close-cart-modal-index2" class="btn-secondary flex-1">Seguir Comprando</button>
						</div>
					</div>
				</div>
			`;
		}
		// Cerrar modal
		setTimeout(() => {
			const closeBtn = document.getElementById('close-cart-modal-index');
			if (closeBtn) closeBtn.onclick = () => { modal.style.display = 'none'; };
			const closeBtn2 = document.getElementById('close-cart-modal-index2');
			if (closeBtn2) closeBtn2.onclick = () => { modal.style.display = 'none'; };
		}, 50);
	}

	// Exponer funciones globales para los botones del modal
	window.updateCartQuantityIndex = function(productId, change) {
		let cart = JSON.parse(localStorage.getItem('cart')) || [];
		const item = cart.find(item => item.id === productId);
		if (item) {
			const newQuantity = item.quantity + change;
			if (newQuantity <= 0) {
				window.removeFromCartIndex(productId);
				return;
			}
			if (!item.maxStock || newQuantity <= item.maxStock) {
				item.quantity = newQuantity;
				localStorage.setItem('cart', JSON.stringify(cart));
				updateCartModalIndex();
				// Actualizar contador
				const counter = document.getElementById('cart-counter');
				if (counter) {
					const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
					counter.textContent = totalItems;
					counter.style.display = totalItems > 0 ? 'flex' : 'none';
				}
			}
		}
	};
	window.removeFromCartIndex = function(productId) {
		let cart = JSON.parse(localStorage.getItem('cart')) || [];
		cart = cart.filter(item => item.id !== productId);
		localStorage.setItem('cart', JSON.stringify(cart));
		updateCartModalIndex();
		// Actualizar contador
		const counter = document.getElementById('cart-counter');
		if (counter) {
			const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
			counter.textContent = totalItems;
			counter.style.display = totalItems > 0 ? 'flex' : 'none';
		}
		if (cart.length === 0) {
			setTimeout(() => { modal.style.display = 'none'; }, 400);
		}
	};

	cartBtn.addEventListener('click', function(e) {
		e.preventDefault();
		updateCartModalIndex();
		modal.style.display = 'flex';
	});
});
// Sincronizar contador del carrito con localStorage al cargar la página
document.addEventListener('DOMContentLoaded', function() {
	const counter = document.getElementById('cart-counter');
	if (!counter) return;
	function updateCartCounterIndex() {
		const cart = JSON.parse(localStorage.getItem('cart')) || [];
		const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
		counter.textContent = totalItems;
		counter.style.display = totalItems > 0 ? 'flex' : 'none';
	}
	updateCartCounterIndex();
	window.addEventListener('storage', updateCartCounterIndex);
});
// Acción para el link de perfil
document.addEventListener('DOMContentLoaded', function() {
	const perfilLink = document.getElementById('perfilLink');
	if (perfilLink) {
		perfilLink.addEventListener('click', function(e) {
			e.preventDefault();
			alert('Funcionalidad de perfil próximamente.');
		});
	}
});
// Navbar dinámica según login
document.addEventListener('DOMContentLoaded', function() {
	// Navbar principal
	const nav = document.querySelector('nav.navbar-deepblue');
	if (!nav) return;
	// Links
	const registroLink = Array.from(nav.querySelectorAll('a')).find(a => a.textContent.trim() === 'Registro');
	const loginLink = nav.querySelector('#loginLink');
	let perfilLink = nav.querySelector('#perfilLink');
	// Si no existe el link de perfil, lo creamos
	if (!perfilLink) {
		perfilLink = document.createElement('a');
		perfilLink.href = '#';
		perfilLink.id = 'perfilLink';
		perfilLink.className = 'hover:text-[#39FF14]';
		perfilLink.textContent = 'Ver perfil';
		// Insertar antes de logout o al final
		if (loginLink && loginLink.nextSibling) {
			nav.querySelector('.flex.items-center.space-x-6').insertBefore(perfilLink, loginLink.nextSibling);
		} else {
			nav.querySelector('.flex.items-center.space-x-6').appendChild(perfilLink);
		}
		perfilLink.style.display = 'none';
	}
	function actualizarNavbarUsuario() {
		const logueado = localStorage.getItem('logueado');
		const rol = localStorage.getItem('rol');
		if (logueado === 'true' && rol === 'usuario') {
			if (registroLink) registroLink.style.display = 'none';
			if (loginLink) loginLink.style.display = 'none';
			if (perfilLink) perfilLink.style.display = '';
		} else {
			if (registroLink) registroLink.style.display = '';
			if (loginLink) loginLink.style.display = '';
			if (perfilLink) perfilLink.style.display = 'none';
		}
	}
	actualizarNavbarUsuario();
	window.addEventListener('storage', actualizarNavbarUsuario);
});
// Scroll suave a la sección de ofertas al pulsar el botón correspondiente en el hero
document.addEventListener('DOMContentLoaded', function() {
	var btnOfertas = document.getElementById('btnOfertas');
	var ofertasSection = document.getElementById('ofertas');
	if (btnOfertas && ofertasSection) {
		btnOfertas.addEventListener('click', function(e) {
			e.preventDefault();
			ofertasSection.scrollIntoView({ behavior: 'smooth' });
		});
	}
});
