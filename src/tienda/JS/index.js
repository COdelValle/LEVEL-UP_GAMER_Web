  function fadeInBody() {
    setTimeout(() => {
      document.body.style.opacity = "1";
    }, 50);
  }


  function irConFade(url) {
      document.body.style.transition = "opacity 0.6s ease";
      document.body.style.opacity = 0;
      setTimeout(() => {
        window.location.href = url;
      }, 600);
    }
    // Fade helpers using .fading and .hidden classes
    function fadeOut(section, callback) {
      section.classList.remove("fade-in");
      section.classList.add("fade-out");
      setTimeout(() => {
        if (callback) callback();
      }, 600); // espera a que termine la transición
    }

    function fadeIn(section) {
      section.classList.remove("fade-out");
      section.classList.add("fade-in");
    }

    // Show Inicio and Catálogo together, or Registro alone
    function mostrarSeccion(id) {
      const inicio = document.getElementById("inicio");
      const catalogo = document.getElementById("catalogo");
      const registro = document.getElementById("registro");

      if (id === "inicio") {
        if (!registro.classList.contains("hidden")) {
          fadeOut(registro, () => {
            fadeIn(inicio);
            fadeIn(catalogo);
          });
        } else {
          fadeIn(inicio);
          fadeIn(catalogo);
        }
      } else if (id === "registro") {
        let toHide = [];
        if (!inicio.classList.contains("hidden")) toHide.push(inicio);
        if (!catalogo.classList.contains("hidden")) toHide.push(catalogo);

        if (toHide.length > 0) {
          let count = 0;
          toHide.forEach(sec => {
            fadeOut(sec, () => {
              count++;
              if (count === toHide.length) fadeIn(registro);
            });
          });
        } else {
          fadeIn(registro);
        }
      }
    }

    function mostrarInicio() { mostrarSeccion("inicio"); }
    function mostrarRegistro() { mostrarSeccion("registro"); }

    function registrarUsuario() {
      let u = document.getElementById("regUsuario").value,
          p = document.getElementById("regPassword").value;
      if (!u || !p) return alert("Completa todos los campos");
      let us = JSON.parse(localStorage.getItem("usuarios")) || [];
      if (us.find(x => x.usuario === u)) return alert("Usuario ya existe");
      us.push({ usuario: u, password: p });
      localStorage.setItem("usuarios", JSON.stringify(us));
      alert("Cuenta creada 🎉");
    }

    const loginMsg = localStorage.getItem("loginExitoso");
      if (loginMsg) {
        const div = document.createElement("div");
        div.textContent = loginMsg;
        div.className = "fixed top-20 left-1/2 transform -translate-x-1/2 bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg z-50";
        document.body.appendChild(div);
        setTimeout(() => {
          div.style.opacity = "0";
          setTimeout(() => div.remove(), 600);
        }, 3000);
        localStorage.removeItem("loginExitoso");
      }

    // Initial state

window.addEventListener("DOMContentLoaded", () => {
  // Fade y navegación
  fadeInBody();

    const logueado = localStorage.getItem("logueado") === "true";
    const rol = localStorage.getItem("rol");

    const btnLogin = document.getElementById("btnLogin");
    const btnRegistro = document.getElementById("btnRegistro");
    const btnEditarCatalogo = document.getElementById("btnEditarCatalogo");
    const btnLogout = document.getElementById("btnLogout");
    const catalogoExtra = document.getElementById("catalogoExtra");
    const adminPanel = document.getElementById("adminPanel");
    const loginLink = document.getElementById("loginLink");
    const btnCatalogo = document.getElementById("btnCatalogo");
    const menuCatalogo = document.getElementById("menuCatalogo");

    // Navbar dinámico
    if (logueado) {
        btnLogin?.classList.add("hidden");
        btnRegistro?.classList.add("hidden");
        
        btnLogout?.classList.remove("hidden");
        catalogoExtra?.classList.remove("hidden");
        if (rol === "admin") adminPanel?.classList.remove("hidden");
        btnEditarCatalogo?.classList.remove("hidden");
        loginLink.textContent = "Mi cuenta";
        loginLink.href = rol === "admin" ? "administrador.html" : "#";
        loginLink.classList.add("font-bold", "text-[#39FF14]");
    }

    // Logout
    btnLogout?.addEventListener("click", () => {
        document.body.style.opacity = "0";
        setTimeout(() => {
        localStorage.clear();
        window.location.href = "index.html";
        }, 600);
    });

    // Catálogo desplegable
    btnCatalogo?.addEventListener("click", () => {
        menuCatalogo?.classList.toggle("hidden");
    });

    // Cierre del menú al hacer clic fuera
    document.addEventListener("click", (e) => {
        if (!menuCatalogo.contains(e.target) && !btnCatalogo.contains(e.target)) {
        menuCatalogo.classList.add("hidden");
        }
    });

    // Renderizado de productos (si aplica)

});
