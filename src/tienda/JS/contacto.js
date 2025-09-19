const form = document.getElementById('form_contacto');

form.addEventListener('submit', function(event) {
  event.preventDefault(); // Evita el envío automático

  // Capturamos los valores
  const nombre = document.getElementById('mensaje_nombre').value.trim();
  const correo = document.getElementById('mensaje_email').value.trim();
  const mensaje = document.getElementById('mensaje_texto').value.trim();

  // Validaciones
  let errores = [];

  // Nombre: requerido y max 100 caracteres
  if (!nombre) errores.push("El nombre es obligatorio.");
  if (nombre.length > 100) errores.push("El nombre no puede superar los 100 caracteres.");

  // Correo: max 100 y dominios permitidos
  const dominiosPermitidos = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];
  if (correo.length > 100) errores.push("El correo no puede superar los 100 caracteres.");
  if (!dominiosPermitidos.some(d => correo.endsWith(d))) errores.push("El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com.");

  // Comentario: requerido y max 500 caracteres
  if (!mensaje) errores.push("El mensaje es obligatorio.");
  if (mensaje.length > 500) errores.push("El mensaje no puede superar los 500 caracteres.");

  // Mostrar errores o enviar
  if (errores.length > 0) {
    alert(errores.join("\n")); // Puedes cambiar a mostrar en pantalla si quieres
  } else {
    alert("Formulario enviado correctamente! ✅");
    form.reset(); // Limpia el formulario
    // Aquí puedes hacer fetch o enviar a un backend
  }
});