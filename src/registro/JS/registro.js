function fadeInBody() {
  document.body.style.opacity = 0;
  requestAnimationFrame(() => {
    document.body.style.opacity = 1;
  });
}

function irConFade(url) {
  document.body.classList.add("fade-out");
  setTimeout(() => {
    window.location.href = url;
  }, 600);
}

function capitalizar(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function validarFormulario() {
  const campos = {
    nombre: "Nombre",
    apellidoPaterno: "Apellido paterno",
    apellidoMaterno: "Apellido materno",
    email: "Correo electrónico",
    password: "Contraseña",
    confirmPassword: "Confirmar contraseña",
    telefono: "Teléfono",
    region: "Región",
    comuna: "Comuna"
  };

  let valido = true;

  for (const id in campos) {
    const input = document.getElementById(id);
    const error = document.getElementById("error" + capitalizar(id));
    const valor = input?.value.trim();
    const nombreCampo = campos[id];

    error.classList.add("hidden");
    error.textContent = "";

    if (["nombre", "apellidoPaterno", "apellidoMaterno"].includes(id)) {
      if (!valor || valor.length < 3 || !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(valor)) {
        error.textContent = `${nombreCampo} debe tener al menos 3 letras y solo contener texto.`;
        error.classList.remove("hidden");
        valido = false;
      }
    }

    if (id === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!valor || !emailRegex.test(valor)) {
        error.textContent = "Correo electrónico inválido.";
        error.classList.remove("hidden");
        valido = false;
      }
    }

    if (id === "password") {
      if (!valor || valor.length < 7) {
        error.textContent = "La contraseña debe tener al menos 7 caracteres.";
        error.classList.remove("hidden");
        valido = false;
      }
    }

    if (id === "confirmPassword") {
      const pass = document.getElementById("password").value;
      if (valor !== pass) {
        error.textContent = "Las contraseñas no coinciden.";
        error.classList.remove("hidden");
        valido = false;
      }
    }

    if (id === "telefono" && valor && !/^\+?\d{7,15}$/.test(valor)) {
      error.textContent = "Teléfono inválido.";
      error.classList.remove("hidden");
      valido = false;
    }

    if (id === "region" && (!valor || valor === "Seleccione")) {
      error.textContent = "Selecciona una región válida.";
      error.classList.remove("hidden");
      valido = false;
    }

    if (id === "comuna" && (!valor || valor === "Seleccione")) {
      error.textContent = "Selecciona una comuna válida.";
      error.classList.remove("hidden");
      valido = false;
    }
  }

  return valido;
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formRegistro");

  if (!form) {
    console.error("Formulario no encontrado");
    return;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!validarFormulario()) return;

    const email = document.getElementById("email").value.trim();
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const existe = usuarios.some(u => u.email === email);
    if (existe) {
      alert("Este correo ya está registrado. Intenta con otro.");
      return;
    }

    const nuevoUsuario = {
      nombre: document.getElementById("nombre").value.trim(),
      apellidoPaterno: document.getElementById("apellidoPaterno").value.trim(),
      apellidoMaterno: document.getElementById("apellidoMaterno").value.trim(),
      email: email,
      password: document.getElementById("password").value,
      telefono: document.getElementById("telefono").value.trim(),
      region: document.getElementById("region").value,
      comuna: document.getElementById("comuna").value
    };

    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("¡Cuenta creada exitosamente! 🎉 Serás redirigido al login.");
    irConFade("../login/login.html");
  });
});
