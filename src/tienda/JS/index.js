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

  const btnEditar = document.getElementById("btnEditarCatalogo");
  const btnLogout = document.getElementById("btnLogout");

  if (logueado === "true") {
    btnLogout.classList.remove("hidden");
    if (rol === "admin") {
      btnEditar.classList.remove("hidden");
    }
  }
}

document.addEventListener("DOMContentLoaded", verificarLogin);

// 🔓 Logout
document.getElementById("btnLogout").addEventListener("click", () => {
  localStorage.clear();
  location.reload();
});
