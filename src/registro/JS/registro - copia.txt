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

    function validarFormulario() {
      const nombre = document.getElementById("nombre").value.trim();
      const rut = document.getElementById("rut").value.trim();
      const email = document.getElementById("email").value.trim();
      const direccion = document.getElementById("direccion").value.trim();

      // Limpiar errores previos
      document.getElementById("errorNombre").classList.add("hidden");
      document.getElementById("errorRut").classList.add("hidden");
      document.getElementById("errorEmail").classList.add("hidden");
      document.getElementById("errorDireccion").classList.add("hidden");

      let valido = true;

      // Validación nombre
      if (!nombre) {
        mostrarError("errorNombre", "El nombre es obligatorio.");
        valido = false;
      } else if (!/^[a-zA-Z\s]+$/.test(nombre)) {
        mostrarError("errorNombre", "El nombre solo debe contener letras.");
        valido = false;
      } else if (nombre.length < 7) {
        mostrarError("errorNombre", "El nombre debe tener al menos 7 caracteres.");
        valido = false;
      }

      // Validación RUT
      const rutRegex = /^\d{1,2}\.?\d{3}\.?\d{3}-[\dkK]$/;
      if (!rut) {
        mostrarError("errorRut", "El RUT es obligatorio.");
        valido = false;
      } else if (!rutRegex.test(rut)) {
        mostrarError("errorRut", "RUT inválido. Usa el formato 12.345.678-9.");
        valido = false;
      }

      // Validación email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email) {
        mostrarError("errorEmail", "El correo es obligatorio.");
        valido = false;
      } else if (!emailRegex.test(email)) {
        mostrarError("errorEmail", "Correo electrónico inválido.");
        valido = false;
      }

      // Validación dirección
      if (!direccion) {
        mostrarError("errorDireccion", "La dirección es obligatoria.");
        valido = false;
      } else if (direccion.length < 5) {
        mostrarError("errorDireccion", "La dirección debe tener al menos 5 caracteres.");
        valido = false;
      }

      return valido;
    }

    function mostrarError(id, mensaje) {
      const elemento = document.getElementById(id);
      elemento.textContent = mensaje;
      elemento.classList.remove("hidden");

      const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
      usuarios.push({ nombre, rut, email, direccion });
      localStorage.setItem("usuarios", JSON.stringify(usuarios));

      alert("¡Registro exitoso! 🎉");
      irConFade("index.html");
      return false;
    }

    document.addEventListener("DOMContentLoaded", () => {
      const form = document.getElementById("formRegistro");

      // Detectar cambios en tiempo real
      ["nombre", "rut", "email", "direccion"].forEach(id => {
        document.getElementById(id).addEventListener("input", () => {
          validarCampo(id);
        });
      });

      // Bloquear Enter si hay errores
      form.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          if (validarFormulario()) {
            // Si todo está bien, puedes permitir envío manual si lo deseas
            // form.submit();
          }
        }
      });

      // Validación al enviar
      form.addEventListener("submit", (e) => {
        if (!validarFormulario()) {
          e.preventDefault(); // 🚫 Bloquea el envío si hay errores
        }
      });
    });

    function validarFormulario() {
      const campos = ["nombre", "rut", "email", "direccion"];
      let valido = true;

      campos.forEach(id => {
        if (!validarCampo(id)) {
          valido = false;
        }
      });

      return valido;
    }

    function validarCampo(id) {
      const valor = document.getElementById(id).value.trim();
      const error = document.getElementById("error" + capitalize(id));
      error.classList.add("hidden");

      switch (id) {
        case "nombre":
          if (!valor) {
            return mostrarError(error, "El nombre es obligatorio.");
          }
          if (!/^[a-zA-Z\s]+$/.test(valor)) {
            return mostrarError(error, "El nombre solo debe contener letras.");
          }
          if (valor.length < 7) {
            return mostrarError(error, "Debe tener al menos 7 caracteres.");
          }
          break;

        case "rut":
          if (!valor) {
            return mostrarError(error, "El RUT es obligatorio.");
          }
          if (!/^\d{1,2}\.?\d{3}\.?\d{3}-[\dkK]$/.test(valor)) {
            return mostrarError(error, "Formato inválido. Ej: 12.345.678-9.");
          }
          break;

        case "email":
          if (!valor) {
            return mostrarError(error, "El correo es obligatorio.");
          }
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) {
            return mostrarError(error, "Correo electrónico inválido.");
          }
          break;

        case "direccion":
          if (!valor) {
            return mostrarError(error, "La dirección es obligatoria.");
          }
          if (valor.length < 5) {
            return mostrarError(error, "Debe tener al menos 5 caracteres.");
          }
          break;
      }

      return true;
    }

    function mostrarError(elemento, mensaje) {
      elemento.textContent = mensaje;
      elemento.classList.remove("hidden");
      return false;
    }

    function capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }