function fadeInBody() {
  document.body.classList.remove("opacity-0");
  document.body.classList.add("opacity-100");
}

function irConFade(url) {
  document.body.classList.add("opacity-0");
  setTimeout(() => {
    window.location.href = url;
  }, 600);
}

function capitalizar(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function validarRut(rut) {
  rut = rut.replace(/\./g, "").replace(/-/g, "").toUpperCase();

  if (!/^\d{7,8}[0-9K]$/.test(rut)) return false;

  const cuerpo = rut.slice(0, -1);
  const dv = rut.slice(-1);

  let suma = 0;
  let multiplo = 2;

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo[i]) * multiplo;
    multiplo = multiplo < 7 ? multiplo + 1 : 2;
  }

  const dvEsperado = 11 - (suma % 11);
  const dvFinal = dvEsperado === 11 ? "0" : dvEsperado === 10 ? "K" : dvEsperado.toString();

  return dv === dvFinal;
}

function validarFormulario() {
  let valido = true;
  const campos = {
    nombre: "Nombre",
    apellidoPaterno: "Apellido paterno",
    apellidoMaterno: "Apellido materno",
    fechaNacimiento: "Fecha de nacimiento",
    rut: "RUT",
    email: "Correo electrónico",
    password: "Contraseña",
    confirmPassword: "Confirmar contraseña",
    telefono: "Teléfono",
    region: "Región",
    comuna: "Comuna"
  };
  // Validar edad mínima 18 años
  const fechaNacimientoInput = document.getElementById("fechaNacimiento");
  const errorFechaNacimiento = document.getElementById("errorFechaNacimiento");
  if (fechaNacimientoInput) {
    errorFechaNacimiento.classList.add("hidden");
    errorFechaNacimiento.textContent = "";
    const fechaNacimiento = fechaNacimientoInput.value;
    if (!fechaNacimiento) {
      errorFechaNacimiento.textContent = "Debes ingresar tu fecha de nacimiento.";
      errorFechaNacimiento.classList.remove("hidden");
      valido = false;
    } else {
      const hoy = new Date();
      const nacimiento = new Date(fechaNacimiento);
      let edad = hoy.getFullYear() - nacimiento.getFullYear();
      const m = hoy.getMonth() - nacimiento.getMonth();
      if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--;
      }
      if (edad < 18) {
        errorFechaNacimiento.textContent = "Debes ser mayor de 18 años para registrarte.";
        errorFechaNacimiento.classList.remove("hidden");
        valido = false;
      }
    }
  }

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

    if (id === "rut") {
      if (!valor || !validarRut(valor)) {
        error.textContent = "RUT inválido. Debe tener formato 12.345.678-9 y ser válido.";
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

    // Descuento Duoc
    let descuentoDuoc = false;
    if (email.endsWith("@duocuc.cl")) {
      descuentoDuoc = true;
    }

    // Código de referido
    const codigoReferido = document.getElementById("codigoReferido").value.trim();
    let referidoPor = null;
    if (codigoReferido) {
      // Buscar si existe algún usuario con ese código de referido
      const usuarioReferente = usuarios.find(u => u.codigoPropio === codigoReferido);
      if (!usuarioReferente) {
        const errorCodigoReferido = document.getElementById("errorCodigoReferido");
        errorCodigoReferido.textContent = "El código de referido no es válido.";
        errorCodigoReferido.classList.remove("hidden");
        return;
      } else {
        referidoPor = usuarioReferente.email;
      }
    }

    // Generar código propio de referido único para el nuevo usuario
    function generarCodigoReferido() {
      const base = email.split('@')[0].slice(0, 4).toUpperCase();
      let codigo;
      do {
        codigo = base + Math.floor(1000 + Math.random() * 9000);
      } while (usuarios.some(u => u.codigoPropio === codigo));
      return codigo;
    }
    const codigoPropio = generarCodigoReferido();

    const nuevoUsuario = {
      nombre: document.getElementById("nombre").value.trim(),
      apellidoPaterno: document.getElementById("apellidoPaterno").value.trim(),
      apellidoMaterno: document.getElementById("apellidoMaterno").value.trim(),
      fechaNacimiento: document.getElementById("fechaNacimiento").value,
      rut: document.getElementById("rut").value.trim(),
      email: email,
      password: document.getElementById("password").value,
      telefono: document.getElementById("telefono").value.trim(),
      region: document.getElementById("region").value,
      comuna: document.getElementById("comuna").value,
      descuentoDuoc: descuentoDuoc,
      referidoPor: referidoPor,
      codigoPropio: codigoPropio,
      puntos: 0,
      nivel: 1
    };

    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    // Guardar usuario logeado para sesión inmediata
    localStorage.setItem("usuarioLogeado", JSON.stringify(nuevoUsuario));

    // Notificación elegante tipo toast
    mostrarToast("¡Cuenta creada exitosamente! 🎉<br>Tu código de referido es: <b>" + codigoPropio + "</b>");
    setTimeout(() => {
      irConFade("../../index.html");
    }, 2500);
// Toast elegante
function mostrarToast(mensaje) {
  const toast = document.getElementById("toastNotificacion");
  const toastMsg = document.getElementById("toastMensaje");
  if (!toast || !toastMsg) return;
  toastMsg.innerHTML = mensaje;
  toast.classList.remove("hidden");
  toast.classList.add("opacity-100");
  setTimeout(() => {
    toast.classList.add("hidden");
    toast.classList.remove("opacity-100");
  }, 2200);
}
  });
});
