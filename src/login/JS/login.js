// Ejecutar fadeInBody al cargar la página
window.addEventListener('load', fadeInBody);
// 🔄 Transiciones visuales
function fadeInBody() {
  document.body.classList.remove("opacity-0");
  document.body.classList.add("opacity-100");
}

function fadeOutAndRedirect(url) {
  document.body.classList.remove("opacity-100");
  document.body.classList.add("opacity-0");
  setTimeout(() => {
    window.location.href = url;
  }, 600);
}

function irConFade(url) {
  fadeOutAndRedirect(url);
}

// ⚠️ Mensaje de error visual
function mostrarError(texto) {
  const err = document.createElement("div");
  err.textContent = texto;
  err.className = "fixed top-20 left-1/2 transform -translate-x-1/2 bg-red-700 text-white px-6 py-3 rounded-lg shadow-lg z-50";
  document.body.appendChild(err);
  setTimeout(() => err.remove(), 3000);
}

// 🔐 Credenciales de administrador
const ADMIN_USER = "admin";
const ADMIN_PASS = "levelup2024";

// 🚪 Lógica de inicio de sesión
function iniciarSesion() {
  const u = document.getElementById("loginUsuario").value.trim();
  const p = document.getElementById("loginPassword").value.trim();
  const msg = document.getElementById("loginMsg");

  msg.className = "hidden transition-opacity duration-300";
  msg.innerHTML = "";

  const iconError = `<span class="text-red-500 text-lg">❌</span>`;
  const iconSuccess = `<span class="text-[#39FF14] text-lg">✅</span>`;

  if (!u || !p) {
    msg.innerHTML = `${iconError}<span class="text-red-500">Completa todos los campos</span>`;
    msg.className = "flex items-center justify-center gap-2 text-sm mt-2 mb-4 transition-opacity duration-300";
    return;
  }

  // 🛡️ Validación de administrador
  if (u === ADMIN_USER && p === ADMIN_PASS) {
    msg.innerHTML = `${iconSuccess}<span class="text-[#39FF14]">Bienvenido Admin</span>`;
    msg.className = "flex items-center justify-center gap-2 text-sm mt-2 mb-4 transition-opacity duration-300";
    localStorage.setItem("loginExitoso", "Bienvenido Admin");
    localStorage.setItem("logueado", "true");
    localStorage.setItem("rol", "admin");

    // ✅ Redirección actualizada al panel correcto
    setTimeout(() => fadeOutAndRedirect("../admin/home.html"), 1500);


    return;
  }

  // 👤 Validación de usuario normal
  const us = JSON.parse(localStorage.getItem("usuarios")) || [];
  const usuarioValido = us.find(x => x.email === u && x.password === p);

  if (usuarioValido) {
    msg.innerHTML = `${iconSuccess}<span class=\"text-[#39FF14]\">Bienvenido ${u}</span>`;
    msg.className = "flex items-center justify-center gap-2 text-sm mt-2 mb-4 transition-opacity duration-300";
    localStorage.setItem("logueado", "true");
    localStorage.setItem("rol", "usuario");
    localStorage.setItem("loginExitoso", `Bienvenido ${u}`);
    setTimeout(() => fadeOutAndRedirect("../../../index.html"), 1500);
  } else {
    msg.innerHTML = `${iconError}<span class=\"text-red-500\">Credenciales incorrectas</span>`;
    msg.className = "flex items-center justify-center gap-2 text-sm mt-2 mb-4 transition-opacity duration-300";
  }
}
