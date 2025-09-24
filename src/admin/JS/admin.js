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
  const btnMostrarUsuarios = document.getElementById("btnMostrarUsuarios");
  const usuariosAdmin = document.getElementById("usuariosAdmin");

  btnMostrar?.addEventListener("click", () => {
    catalogo.classList.toggle("hidden");
    usuariosAdmin.classList.add("hidden");
    renderCatalogo();
  });

  btnMostrarUsuarios?.addEventListener("click", () => {
    usuariosAdmin.classList.toggle("hidden");
    catalogo.classList.add("hidden");
    renderUsuarios();
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

function renderUsuarios() {
  const usuariosAdmin = document.getElementById("usuariosAdmin");
  let usuarios = [];
  try {
    usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  } catch (e) { usuarios = []; }
  if (!usuarios.length) {
    usuariosAdmin.innerHTML = `<div class='text-gray-400 text-lg'>No hay usuarios registrados.</div>`;
    return;
  }
  let tabla = `<div class='overflow-x-auto'><table class='min-w-full bg-[#0a192e] rounded-lg'><thead><tr class='text-[#39FF14] text-left'>
    <th class='py-2 px-3'>Nombre</th>
    <th class='py-2 px-3'>Correo</th>
    <th class='py-2 px-3'>RUT</th>
    <th class='py-2 px-3'>Región</th>
    <th class='py-2 px-3'>Comuna</th>
    <th class='py-2 px-3'>Teléfono</th>
    <th class='py-2 px-3'>Duoc</th>
    <th class='py-2 px-3'>Referido</th>
    <th class='py-2 px-3'>Puntos</th>
    <th class='py-2 px-3'>Nivel</th>
  </tr></thead><tbody>`;
  usuarios.forEach(u => {
    tabla += `<tr class='border-b border-gray-700 hover:bg-[#12203a]'>
      <td class='py-2 px-3'>${u.nombre} ${u.apellidoPaterno} ${u.apellidoMaterno}</td>
      <td class='py-2 px-3'>${u.email}</td>
      <td class='py-2 px-3'>${u.rut}</td>
      <td class='py-2 px-3'>${u.region}</td>
      <td class='py-2 px-3'>${u.comuna}</td>
      <td class='py-2 px-3'>${u.telefono || '-'}</td>
      <td class='py-2 px-3'>${u.descuentoDuoc ? 'Sí' : 'No'}</td>
      <td class='py-2 px-3'>${u.referidoPor || '-'}</td>
      <td class='py-2 px-3'>${u.puntos ?? 0}</td>
      <td class='py-2 px-3'>${u.nivel ?? 1}</td>
    </tr>`;
  });
  tabla += `</tbody></table></div>`;
  usuariosAdmin.innerHTML = tabla;
}

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


