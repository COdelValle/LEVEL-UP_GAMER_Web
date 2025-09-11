    function fadeInBody() {
      document.body.style.opacity = 0;
      document.body.style.transition = "opacity 0.6s ease";
      requestAnimationFrame(() => {
        document.body.style.opacity = 1;
      });
    }


    function goToRegistro() {
      document.body.style.opacity = 0;
      setTimeout(() => {
        window.location.href = "registro.html";
      }, 600);
    }
    const ADMIN_USER="admin",ADMIN_PASS="1234";


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


    if (u === ADMIN_USER && p === ADMIN_PASS) {
      msg.innerHTML = `${iconSuccess}<span class="text-[#39FF14]">Bienvenido Admin</span>`;
      msg.className = "flex items-center justify-center gap-2 text-sm mt-2 mb-4 transition-opacity duration-300";
      localStorage.setItem("loginExitoso", "Bienvenido Admin");
      localStorage.setItem("logueado", "true");
      localStorage.setItem("rol", "admin");
      setTimeout(() => fadeOutAndRedirect("../../src/admin/admin.html"), 1500);
      return;
    }

    const us = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuarioValido = us.find(x => x.usuario === u && x.password === p);

    if (usuarioValido) {
      msg.innerHTML = `${iconSuccess}<span class="text-[#39FF14]">Bienvenido ${u}</span>`;
      msg.className = "flex items-center justify-center gap-2 text-sm mt-2 mb-4 transition-opacity duration-300";
      localStorage.setItem("logueado", "true");
      localStorage.setItem("rol", "usuario");
      localStorage.setItem("loginExitoso", `Bienvenido ${u}`);

      setTimeout(() => {
        fadeOutAndRedirect("index.html");
      }, 1500);
    } else {
      msg.innerHTML = `${iconError}<span class="text-red-500">Credenciales incorrectas</span>`;
      msg.className = "flex items-center justify-center gap-2 text-sm mt-2 mb-4 transition-opacity duration-300";
    }
  }

  function fadeOutAndRedirect(url) {
    document.body.style.opacity = "0";
    setTimeout(() => {
      window.location.href = url;
    }, 600);
  }

  document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");

  form?.addEventListener("submit", (e) => {
    e.preventDefault();

    const usuario = document.getElementById("usuario").value;
    const clave = document.getElementById("clave").value;

    if (usuario === "admin" && clave === "1234") {
      localStorage.setItem("logueado", "true");
      localStorage.setItem("rol", "admin");
      fadeOutAndRedirect("admin.html");
    } else if (usuario === "cliente" && clave === "1234") {
      localStorage.setItem("logueado", "true");
      localStorage.setItem("rol", "usuario");
      fadeOutAndRedirect("index.html");
    } else {
      mostrarError("Credenciales incorrectas");
    }
  });
});

function fadeOutAndRedirect(url) {
  document.body.style.opacity = "0";
  setTimeout(() => window.location.href = url, 600);
}

function mostrarError(texto) {
  const err = document.createElement("div");
  err.textContent = texto;
  err.className = "fixed top-20 left-1/2 transform -translate-x-1/2 bg-red-700 text-white px-6 py-3 rounded-lg shadow-lg z-50";
  document.body.appendChild(err);
  setTimeout(() => err.remove(), 3000);
}
