// 🧨 Fade-in al cargar
window.addEventListener("load", () => {
  document.body.classList.add("opacity-100");
  document.body.classList.remove("opacity-0");
});

// 🔁 Redirección con fade
function irConFade(url) {
  document.body.classList.remove("opacity-100");
  document.body.classList.add("opacity-0");
  setTimeout(() => {
    window.location.href = url;
  }, 600);
}

// 🛒 Obtener productos desde localStorage
const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// 🧾 Renderizar productos en el checkout
function renderizarCheckout() {
  const contenedor = document.getElementById("checkout-items");
  const totalSpan = document.getElementById("checkout-total");
  contenedor.innerHTML = "";
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  let total = 0;

  carrito.forEach((producto, idx) => {
    const item = document.createElement("div");
    item.className = "flex justify-between items-center bg-[#1c2e4a] p-4 rounded-lg shadow-md";

    const precioFinal = producto.precio * producto.cantidad;
    total += precioFinal;

    item.innerHTML = `
      <div>
        <p class="font-bold text-lg font-main">${producto.nombre}</p>
        <div class="flex items-center gap-2 mt-1">
          <button class="btn-secondary px-2 py-1 text-sm" data-action="restar" data-idx="${idx}">-</button>
          <span class="px-3 py-1 bg-gray-700 rounded">${producto.cantidad}</span>
          <button class="btn-secondary px-2 py-1 text-sm" data-action="sumar" data-idx="${idx}">+</button>
          <button class="text-red-400 hover:text-red-300 ml-2" data-action="eliminar" data-idx="${idx}">🗑️</button>
        </div>
      </div>
      <p class="text-[#39FF14] font-bold text-lg">$${precioFinal.toLocaleString("es-CL")}</p>
    `;
    contenedor.appendChild(item);
  });

  totalSpan.textContent = `$${total.toLocaleString("es-CL")}`;

  // Delegación de eventos para botones
  contenedor.querySelectorAll('button[data-action]').forEach(btn => {
    btn.addEventListener('click', function() {
      let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
      const idx = parseInt(this.getAttribute('data-idx'));
      if (this.getAttribute('data-action') === 'eliminar') {
        carrito.splice(idx, 1);
      } else if (this.getAttribute('data-action') === 'sumar') {
        carrito[idx].cantidad += 1;
      } else if (this.getAttribute('data-action') === 'restar') {
        carrito[idx].cantidad -= 1;
        if (carrito[idx].cantidad <= 0) carrito.splice(idx, 1);
      }
      localStorage.setItem("carrito", JSON.stringify(carrito));
      renderizarCheckout();
    });
  });
}

// 💳 Capturar método de pago
document.getElementById("payment-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const metodo = document.querySelector('input[name="metodoPago"]:checked');

  if (!metodo) {
    alert("Selecciona un método de pago.");
    return;
  }

  const seleccion = metodo.value;

  switch (seleccion) {
    case "bancoestado":
      alert("Redirigiendo a instrucciones de transferencia BancoEstado...");
      break;
    case "transbank":
      alert("Redirigiendo a Webpay Transbank...");
      break;
    case "deposito":
      alert("Mostrando datos para depósito directo...");
      break;
    default:
      alert("Método de pago no reconocido.");
  }

  // Aquí podrías guardar el método en localStorage si lo necesitas
  localStorage.setItem("metodoPagoSeleccionado", seleccion);
});

// 🚀 Ejecutar al cargar
renderizarCheckout();
