function fadeInBody() {
  document.body.style.opacity = 0;
  document.body.style.transition = "opacity 0.6s ease";
  requestAnimationFrame(() => {
    document.body.style.opacity = 1;
  });
}

function verificarAccesoAdmin() {
  const rol = localStorage.getItem("rol");
  if (rol !== "admin") {
    alert("Acceso denegado. Solo administradores.");
    window.location.href = "../../index.html";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const btnMostrar = document.getElementById("btnMostrarCatalogo");
  const catalogo = document.getElementById("catalogoAdmin");
  const btnCategorias = document.getElementById("btnCategorias");
  const menuCategorias = document.getElementById("menuCategorias");
  const btnLogout = document.getElementById("btnLogout");

  btnMostrar?.addEventListener("click", () => {
    catalogo.classList.toggle("hidden");
    renderCatalogo();
  });

  btnCategorias?.addEventListener("click", () => {
    menuCategorias.classList.toggle("hidden");
  });

  btnLogout?.addEventListener("click", () => {
    const div = document.createElement("div");
    div.textContent = "Hasta pronto, administrador 👋";
    div.className = "fixed top-20 left-1/2 transform -translate-x-1/2 bg-red-700 text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-opacity duration-500";
    document.body.appendChild(div);

    setTimeout(() => {
      div.style.opacity = "0";
      document.body.style.opacity = "0";
      setTimeout(() => {
        localStorage.clear();
        window.location.href = "../../index.html";
      }, 600);
    }, 2000);
  });
});

function renderCatalogo() {
  const catalogo = document.getElementById("catalogoAdmin");
  catalogo.innerHTML = "";

  const productos = [
    { nombre: "Silla Gamer Pro", precio: 149990 },
    { nombre: "Mando Xbox Elite", precio: 89990 },
    { nombre: "Videojuego Cyberpunk", precio: 39990 },
    { nombre: "Mouse Logitech G502", precio: 49990 }
  ];

  productos.forEach((producto, index) => {
    const div = document.createElement("div");
    div.className = "bg-[#0a192e] p-4 rounded-lg shadow-lg flex justify-between items-center";

    div.innerHTML = `
      <span class="font-bold">${producto.nombre}</span>
      <input type="number" value="${producto.precio}" class="bg-black text-white px-3 py-1 rounded-lg w-32 text-right border border-[#39FF14]" id="precio-${index}">
      <button onclick="guardarPrecio(${index})" class="ml-4 px-4 py-2 bg-[#39FF14] text-black rounded-lg hover:bg-green-700">Guardar</button>
    `;

    catalogo.appendChild(div);
  });
}

function guardarPrecio(index) {
  const input = document.getElementById(`precio-${index}`);
  const nuevoPrecio = input.value;
  alert(`Precio actualizado a $${nuevoPrecio}`);
}


