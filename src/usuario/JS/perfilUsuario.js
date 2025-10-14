document.addEventListener('DOMContentLoaded', function() {
  try {
    const usuarioLogeado = localStorage.getItem('usuarioLogeado');
    if (usuarioLogeado) {
      const linkRegistro = document.getElementById('linkRegistro');
      const linkLogin = document.getElementById('linkLogin');
      if (linkRegistro) linkRegistro.style.display = 'none';
      if (linkLogin) linkLogin.style.display = 'none';
    }
  } catch(e) {}
});
// Navbar dinámica según login y rol
// Fade y navegación reutilizable
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

// Utilidad para calcular edad
function calcularEdad(fechaNacimiento) {
  if (!fechaNacimiento) return "-";
  const nacimiento = new Date(fechaNacimiento);
  const hoy = new Date();
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const m = hoy.getMonth() - nacimiento.getMonth();
  if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }
  return edad;
}

// Cargar datos de usuario logueado
// Solo mostrar si hay usuario logueado, si no, redirigir a login

document.addEventListener("DOMContentLoaded", () => {
  // Simulación de sesión: buscar usuario logueado en localStorage
  let usuarioLogeado = JSON.parse(localStorage.getItem("usuarioLogeado"));
  if (!usuarioLogeado) {
    // Si no hay sesión, redirigir al login
    irConFade("../login/login.html");
    return;
  }

  // Mostrar botón logout (navbar y perfil)
  const btnLogout = document.getElementById("btnLogout");
  const btnLogoutPerfil = document.getElementById("btnLogoutPerfil");
  [btnLogout, btnLogoutPerfil].forEach(btn => {
    if (btn) {
      btn.classList.remove("hidden");
      btn.addEventListener("click", () => {
        // Animación y mensaje igual que en index
        const div = document.createElement("div");
        div.textContent = "Hasta pronto, gamer 👋";
        div.className = "fixed top-20 left-1/2 transform -translate-x-1/2 bg-red-700 text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-opacity duration-500";
        document.body.appendChild(div);
        setTimeout(() => {
          div.style.opacity = "0";
          document.body.style.opacity = "0";
          setTimeout(() => {
            localStorage.removeItem("usuarioLogeado");
            window.location.href = "../../index.html";
          }, 600);
        }, 2000);
      });
    }
  });

  // Mostrar datos en el perfil
  const contenedor = document.getElementById("perfilUsuarioDatos");
  if (!contenedor) return;

  // Buscar datos completos del usuario en la lista de usuarios y sincronizar cambios
  function getUsuarioActual() {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const actualizado = usuarios.find(u => u.email === usuarioLogeado.email);
    return actualizado || usuarioLogeado;
  }

  // Calcular edad
  function getEdad() {
    const user = getUsuarioActual();
    return calcularEdad(user.fechaNacimiento);
  }

  function renderDatos(editable = false) {
    const usuario = getUsuarioActual();
    const edad = getEdad();
    contenedor.innerHTML = `
      <form id="formEditarPerfil" class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
        <div>
          <label class="font-bold text-[#39FF14]">Nombre:</label>
          ${editable ? `<input type="text" id="editNombre" value="${usuario.nombre}" class="p-2 mt-1 rounded bg-[#0f1e3a] border border-[#39FF14] w-full">` : `<div class='mt-1'>${usuario.nombre}</div>`}
        </div>
        <div>
          <label class="font-bold text-[#39FF14]">Comuna:</label>
          ${editable ? `<input type="text" id="editComuna" value="${usuario.comuna}" class="p-2 mt-1 rounded bg-[#0f1e3a] border border-[#39FF14] w-full">` : `<div class='mt-1'>${usuario.comuna}</div>`}
        </div>
        <div>
          <label class="font-bold text-[#39FF14]">Región:</label>
          ${editable ? `<input type="text" id="editRegion" value="${usuario.region}" class="p-2 mt-1 rounded bg-[#0f1e3a] border border-[#39FF14] w-full">` : `<div class='mt-1'>${usuario.region}</div>`}
        </div>
        <div>
          <label class="font-bold text-[#39FF14]">Correo:</label>
          ${editable ? `<input type="email" id="editEmail" value="${usuario.email}" class="p-2 mt-1 rounded bg-[#0f1e3a] border border-[#39FF14] w-full">` : `<div class='mt-1'>${usuario.email}</div>`}
        </div>
        <div>
          <label class="font-bold text-[#39FF14]">Teléfono:</label>
          ${editable ? `<input type="text" id="editTelefono" value="${usuario.telefono || ''}" class="p-2 mt-1 rounded bg-[#0f1e3a] border border-[#39FF14] w-full">` : `<div class='mt-1'>${usuario.telefono || "-"}</div>`}
        </div>
        <div>
          <label class="font-bold text-[#39FF14]">Edad:</label>
          <div class='mt-1'>${edad} años</div>
        </div>
        <div>
          <label class="font-bold text-[#39FF14]">RUT:</label>
          <div class='mt-1'>${usuario.rut}</div>
        </div>
        <div>
          <label class="font-bold text-[#39FF14]">Descuento Duoc:</label>
          <div class='mt-1'>${usuario.descuentoDuoc ? "Sí" : "No"}</div>
        </div>
        <div>
          <label class="font-bold text-[#39FF14]">Código de referido propio:</label>
          <div class='mt-1 select-all'>${usuario.codigoPropio || "-"}</div>
        </div>
        <div>
          <label class="font-bold text-[#39FF14]">Referido por:</label>
          <div class='mt-1'>${usuario.referidoPor || "-"}</div>
        </div>
        <div>
          <label class="font-bold text-[#39FF14]">Puntos:</label>
          <div class='mt-1'>${usuario.puntos ?? 0}</div>
        </div>
        <div>
          <label class="font-bold text-[#39FF14]">Nivel:</label>
          <div class='mt-1'>${usuario.nivel ?? 1}</div>
        </div>
        ${editable ? `<div class='col-span-2 flex gap-3 pt-2 justify-center'><button type='submit' class='bg-[#39FF14] hover:bg-green-700 text-black font-bold px-4 py-2 rounded'>Guardar</button><button type='button' id='btnCancelarEdit' class='bg-gray-600 hover:bg-gray-700 text-white font-bold px-4 py-2 rounded'>Cancelar</button></div>` : ''}
      </form>
    `;
    // Actualizar foto de usuario
    const foto = document.getElementById("fotoUsuario");
    if (foto) {
      if (usuario.fotoPerfil) {
        foto.src = usuario.fotoPerfil;
      } else {
        foto.src = "../assets/img/imagen_ejemplo.png";
      }
    }
  }

  // Render inicial
  renderDatos(false);

  // Foto de usuario: cargar y guardar en base64
  const inputFoto = document.getElementById("inputFotoUsuario");
  const foto = document.getElementById("fotoUsuario");
  if (inputFoto && foto) {
    inputFoto.addEventListener("change", function(ev) {
      const file = ev.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = function(e) {
        usuario.fotoPerfil = e.target.result;
        foto.src = usuario.fotoPerfil;
        // Guardar en localStorage
        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        usuarios = usuarios.map(u => u.email === usuario.email ? usuario : u);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        localStorage.setItem("usuarioLogeado", JSON.stringify(usuario));
        mostrarToastPerfil("¡Foto actualizada!");
      };
      reader.readAsDataURL(file);
    });
    // Mostrar la foto guardada si existe
    if (usuario.fotoPerfil) {
      foto.src = usuario.fotoPerfil;
    }
  }

  // Delegación de eventos para editar y guardar datos
  document.body.addEventListener('click', function(e) {
    // Editar datos
    if (e.target && (e.target.id === 'btnEditarDatos' || e.target.closest('#btnEditarDatos'))) {
      renderDatos(true);
    }
    // Cancelar edición
    if (e.target && (e.target.id === 'btnCancelarEdit' || e.target.closest('#btnCancelarEdit'))) {
      renderDatos(false);
    }
  });
  // Guardar cambios del formulario
  document.body.addEventListener('submit', function(e) {
    if (e.target && e.target.id === 'formEditarPerfil') {
      e.preventDefault();
      const usuario = getUsuarioActual();
      // Validaciones simples
      const nuevoNombre = document.getElementById("editNombre").value.trim();
      const nuevoComuna = document.getElementById("editComuna").value.trim();
      const nuevoRegion = document.getElementById("editRegion").value.trim();
      const nuevoEmail = document.getElementById("editEmail").value.trim();
      const nuevoTelefono = document.getElementById("editTelefono").value.trim();
      if (!nuevoNombre || !nuevoComuna || !nuevoRegion || !nuevoEmail) {
        mostrarToastPerfil("Completa todos los campos obligatorios.");
        return;
      }
      // Validar email único si cambió
      if (nuevoEmail !== usuario.email) {
        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        if (usuarios.some(u => u.email === nuevoEmail)) {
          mostrarToastPerfil("Ese correo ya está registrado.");
          return;
        }
      }
      // Actualizar usuario
      usuario.nombre = nuevoNombre;
      usuario.comuna = nuevoComuna;
      usuario.region = nuevoRegion;
      usuario.email = nuevoEmail;
      usuario.telefono = nuevoTelefono;
      // Actualizar en localStorage
      let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
      usuarios = usuarios.map(u => u.email === usuarioLogeado.email ? usuario : u);
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
      localStorage.setItem("usuarioLogeado", JSON.stringify(usuario));
      mostrarToastPerfil("¡Datos actualizados correctamente!");
      setTimeout(() => renderDatos(false), 1200);
    }
  });

  // Toast para perfil
  function mostrarToastPerfil(msg) {
    const toast = document.getElementById("toastPerfil");
    const toastMsg = document.getElementById("toastPerfilMsg");
    if (!toast || !toastMsg) return;
    toastMsg.innerHTML = msg;
    toast.classList.remove("hidden");
    toast.classList.add("opacity-100");
    setTimeout(() => {
      toast.classList.add("hidden");
      toast.classList.remove("opacity-100");
    }, 1100);
  }
});
