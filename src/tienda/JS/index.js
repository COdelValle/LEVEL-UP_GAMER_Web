// 🔄 Transiciones visuales
function fadeInBody() {
  document.body.classList.remove("opacity-0");
  document.body.classList.add("opacity-100");
}

function irConFade(url) {
  document.body.classList.remove("opacity-100");
  document.body.classList.add("opacity-0");
  setTimeout(() => {
    window.location.href = url;
  }, 600);
}

// 🧭 Navegación entre secciones internas
function mostrarInicio() {
  ocultarTodo();
  mostrarSeccion("inicio");
}

function mostrarRegistro() {
  ocultarTodo();
  mostrarSeccion("registro");
}

function mostrarSeccion(id) {
  const el = document.getElementById(id);
  if (el) {
    el.classList.remove("hidden", "fade-out");
    el.classList.add("fade-in");
  }
}

function ocultarTodo() {
  const secciones = ["inicio", "registro", "catalogoExtra", "adminPanel"];
  secciones.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.classList.add("fade-out");
      el.classList.remove("fade-in");
      setTimeout(() => el.classList.add("hidden"), 500);
    }
  });
}

// 🛒 Menú desplegable catálogo
const btnCatalogo = document.getElementById("btnCatalogo");
const menuCatalogo = document.getElementById("menuCatalogo");

btnCatalogo.addEventListener("click", () => {
  menuCatalogo.classList.toggle("hidden");
});

document.addEventListener("click", (e) => {
  if (!btnCatalogo.contains(e.target) && !menuCatalogo.contains(e.target)) {
    menuCatalogo.classList.add("hidden");
  }
});

// 🧠 Carrusel de productos destacados
const carruselTrack = document.querySelector(".snap-x");
const carruselItems = document.querySelectorAll(".snap-center");
let carruselIndex = 0;

function avanzarCarrusel() {
  carruselIndex = (carruselIndex + 1) % carruselItems.length;
  carruselTrack.scrollTo({
    left: carruselItems[carruselIndex].offsetLeft,
    behavior: "smooth"
  });
}

setInterval(avanzarCarrusel, 5000); // cada 5 segundos

// 🔐 Registro de usuario
function registrarUsuario() {
  const usuario = document.getElementById("regUsuario").value.trim();
  const password = document.getElementById("regPassword").value.trim();

  if (!usuario || !password) {
    alert("Completa todos los campos");
    return;
  }

  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const existe = usuarios.find(u => u.email === usuario);

  if (existe) {
    alert("Este usuario ya existe");
    return;
  }

  usuarios.push({ email: usuario, password });
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  alert("Cuenta creada con éxito");
  mostrarInicio();
}

// 🔐 Verificación de login

function verificarLogin() {
  const logueado = localStorage.getItem("logueado");
  const rol = localStorage.getItem("rol");

  // Botones
  const btnLogin = document.querySelector(".inicio-btn2 i.fa-sign-in-alt")?.parentElement;
  const btnRegistro = document.querySelector(".inicio-btn2 i.fa-user-plus")?.parentElement;
  const btnBlog = document.querySelector(".inicio-btn2 i.fa-newspaper")?.parentElement;
  const btnCatalogo = document.querySelector(".inicio-btn2 i.fa-gamepad")?.parentElement;
  const btnOfertas = document.getElementById("btnOfertas");
  const btnEditar = document.getElementById("btnEditarCatalogo");
  const btnLogout = document.getElementById("btnLogout");

  // Mostrar todos por defecto
  [btnLogin, btnRegistro, btnBlog, btnCatalogo, btnOfertas, btnEditar, btnLogout].forEach(btn => {
    if (btn) btn.classList.remove("hidden");
  });

  if (logueado === "true") {
    // Ocultar login y registro
    if (btnLogin) btnLogin.classList.add("hidden");
    if (btnRegistro) btnRegistro.classList.add("hidden");
    // Mostrar logout
    if (btnLogout) btnLogout.classList.remove("hidden");
    // Mostrar solo editar catálogo si es admin
    if (rol === "admin") {
      if (btnEditar) btnEditar.classList.remove("hidden");
    } else {
      if (btnEditar) btnEditar.classList.add("hidden");
    }
  } else {
    // Si no está logueado, ocultar logout y editar catálogo
    if (btnLogout) btnLogout.classList.add("hidden");
    if (btnEditar) btnEditar.classList.add("hidden");
  }
}
  // 🔐 Actualizar botones de sesión al cargar la página

  document.addEventListener("DOMContentLoaded", function() {
    verificarLogin();
    if (typeof actualizarBotonesSesionIndex === "function") {
      actualizarBotonesSesionIndex();
    }
    // Lógica robusta para mostrar solo el botón de perfil correcto
    const btnPerfil = document.getElementById("btnVerPerfil");
    const btnPanelAdmin = document.getElementById("btnPanelAdmin");
    const logueado = localStorage.getItem("logueado");
    const rol = localStorage.getItem("rol");
    if (btnPerfil) btnPerfil.classList.add("hidden");
    if (btnPanelAdmin) btnPanelAdmin.classList.add("hidden");
    if (logueado === "true" && rol === "usuario") {
      if (btnPerfil) {
        btnPerfil.classList.remove("hidden");
        btnPerfil.setAttribute("href", "src/usuario/perfilUsuario.html");
      }
    } else if (logueado === "true" && rol === "admin") {
      if (btnPanelAdmin) {
        btnPanelAdmin.classList.remove("hidden");
        btnPanelAdmin.setAttribute("href", "src/admin/home.html");
      }
    }
  });

document.addEventListener("DOMContentLoaded", verificarLogin);

// 🔓 Logout

document.getElementById("btnLogout").addEventListener("click", () => {
  // Mensaje visual de logout
  let msg = document.createElement('div');
  msg.className = 'logout-message';
  msg.textContent = 'Sesión cerrada correctamente. ¡Hasta pronto!';
  document.body.appendChild(msg);
  setTimeout(() => msg.classList.add('show'), 50);

  // Fade out body y logout tras 2s
  setTimeout(() => {
    document.body.classList.remove("opacity-100");
    document.body.classList.add("opacity-0");
    setTimeout(() => {
      localStorage.clear();
      location.reload();
    }, 600);
  }, 2000);
});
